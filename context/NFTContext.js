import React, { useState, useEffect } from 'react';
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';
import axios from 'axios';
import { MarketAdress, MarketAdressABI } from './constants';
import { Network, Alchemy } from 'alchemy-sdk';

const settings = {
  apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY, // Alchemy API Key.
  network: Network.ETH_MAINNET, // Ethereum Mainnet network.
};
const alchemy = new Alchemy(settings);

const PINATA_JWT = process.env.NEXT_PUBLIC_PINATA_JWT;

// Alchemy provider setup
const provider = new ethers.providers.JsonRpcProvider('https://eth-mainnet.g.alchemy.com/v2/' + process.env.NEXT_PUBLIC_ALCHEMY_API_KEY);

const fetchContract = (signerOrProvider) => new ethers.Contract(MarketAdress, MarketAdressABI, signerOrProvider);

export const NFTContext = React.createContext();

export const NFTProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState('');
  const [createdNFTs, setCreatedNFTs] = useState([]);
  const nftCurrency = 'ETH';

  const checkIfWalletIsConnected = async () => {
    if (!window.ethereum) return alert('Please install MetaMask');
    const accounts = await window.ethereum.request({ method: 'eth_accounts' });

    if (accounts.length) {
      setCurrentAccount(accounts[0]);
    } else {
      console.log('No accounts found');
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  const connectWallet = async () => {
    if (!window.ethereum) return alert('Please install MetaMask');
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    setCurrentAccount(accounts[0]);
  };

  const uploadToPinata = async (file) => {
    const url = 'https://api.pinata.cloud/pinning/pinFileToIPFS';

    let data = new FormData();
    data.append('file', file);

    const metadata = JSON.stringify({
      name: 'NFT Asset',
      keyvalues: { description: 'An asset uploaded to IPFS via Pinata' },
    });
    data.append('pinataMetadata', metadata);

    const pinataOptions = JSON.stringify({ cidVersion: 0 });
    data.append('pinataOptions', pinataOptions);

    const response = await axios.post(url, data, {
      maxBodyLength: 'Infinity',
      headers: {
        'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
        Authorization: `Bearer ${PINATA_JWT}`,
      },
    });

    return `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
  };

  const createSale = async (url, formInputPrice, isReselling, id) => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const priceInWei = ethers.utils.parseUnits(formInputPrice, 'ether');
    const contract = fetchContract(signer);
    const listingPrice = await contract.getListingPrice();

    const transaction = !isReselling
      ? await contract.createToken(url, priceInWei, { value: listingPrice.toString() })
      : await contract.resellToken(id, priceInWei, { value: listingPrice.toString() });

    await transaction.wait();
  };

  const createNFT = async (formInput, fileUrl, router) => {
    const { name, description, price } = formInput;

    if (!name || !description || !price || !fileUrl) return;

    const data = JSON.stringify({ name, description, image: fileUrl });

    try {
      const ipfsUrl = await uploadToPinata(new Blob([data], { type: 'application/json' }));
      await createSale(ipfsUrl, price, false, null);
      
      // Add the newly created NFT to the createdNFTs state
      const newNFT = {
        name,
        description,
        image: fileUrl,
        price,
        seller: currentAccount,
        owner: currentAccount,
        tokenId: Date.now().toString(), // Temporary ID, replace with actual tokenId when available
      };
      setCreatedNFTs(prevNFTs => [...prevNFTs, newNFT]);
      
      router.push('/');
    } catch (error) {
      console.error('Error creating NFT:', error);
    }
  };

  const fetchNFTs = useCallback(async () => {
    const contract = fetchContract(provider);

    try {
      const data = await contract.fetchMarketItems();
      const items = await Promise.all(
        data.map(async ({ tokenId, seller, owner, price: unformattedPrice }) => {
          const tokenURI = await contract.tokenURI(tokenId);
          const metadata = await axios.get(tokenURI);
          const price = ethers.utils.formatUnits(unformattedPrice.toString(), 'ether');

          return {
            price,
            tokenId: tokenId.toNumber(),
            seller,
            owner,
            image: metadata.data.image,
            name: metadata.data.name,
            description: metadata.data.description,
            tokenURI,
          };
        })
      );
      return items;
    } catch (error) {
      console.error('Error fetching NFTs:', error);
      return [];
    }
  }, []);

  const fetchCreatedNFTs = useCallback(async () => {
    const contract = fetchContract(provider);

    try {
      const data = await contract.fetchItemsCreated();
      const createdItems = await Promise.all(
        data.map(async ({ tokenId, seller, owner, price: unformattedPrice }) => {
          const tokenURI = await contract.tokenURI(tokenId);
          const metadata = await axios.get(tokenURI);
          const price = ethers.utils.formatUnits(unformattedPrice.toString(), 'ether');

          return {
            price,
            tokenId: tokenId.toNumber(),
            seller,
            owner,
            image: metadata.data.image,
            name: metadata.data.name,
            description: metadata.data.description,
            tokenURI,
          };
        })
      );
      setCreatedNFTs(createdItems);
      return createdItems;
    } catch (error) {
      console.error('Error fetching created NFTs:', error);
      return [];
    }
  }, []);

  useEffect(() => {
    fetchCreatedNFTs();
  }, [fetchCreatedNFTs]);

  return (
    <NFTContext.Provider
      value={{
        nftCurrency,
        currentAccount,
        connectWallet,
        uploadToPinata,
        createSale,
        createNFT,
        fetchNFTs,
        fetchCreatedNFTs,
        createdNFTs,
      }}
    >
      {children}
    </NFTContext.Provider>
  );
};