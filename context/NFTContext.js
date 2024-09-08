import React, { useState, useEffect } from 'react';
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';
import axios from 'axios';
import { MarketAdress, MarketAdressABI } from './constants';
import { Network, Alchemy } from 'alchemy-sdk';

const settings = {
  apiKey: "80Jhn5InLlJZhGwwLDq1eV-XXJHM06T0", // Replace with your Alchemy API Key.
  network: Network.ETH_MAINNET, // Replace with your network.
};
const alchemy = new Alchemy(settings);

const PINATA_JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIzZjczN2U2MC1iMWNlLTRiYjAtYWNhMS04ZjNkNDRhMmE2NjYiLCJlbWFpbCI6ImtyYXRvc2dvZG9md2FyYmxhZGU5OUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiMjRjNjMyOTIxNGM0MDMxYTk5MDkiLCJzY29wZWRLZXlTZWNyZXQiOiIzYzU3NWRlNWViNTcwMTAwMDQzZDMxZDlkODhiMjc5Mzk3MDhlZTkyZWMwMWVkYjMyOTM5ZmYwNzFhNTcxZmVlIiwiaWF0IjoxNzI0MzE2NTY3fQ.ig16iWuNashygLC4byPMQr_pbVNhuyJs2mFJuyd-aX8';

// Alchemy provider setup
const provider = new ethers.providers.JsonRpcProvider('https://eth-mainnet.g.alchemy.com/v2/80Jhn5InLlJZhGwwLDq1eV-XXJHM06T0');

const fetchContract = (signerOrProvider) => new ethers.Contract(MarketAdress, MarketAdressABI, signerOrProvider);

export const NFTContext = React.createContext();

export const NFTProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState('');
  const nftCurrency = 'ETH';

  // Check if wallet is connected
  const checkIfWalletIsConnected = async () => {
    if (!window.ethereum) return alert('Please install MetaMask');

    const accounts = await window.ethereum.request({ method: 'eth_accounts' });

    if (accounts.length) {
      setCurrentAccount(accounts[0]);
    } else {
      console.log('No accounts found');
    }
    console.log({ accounts });
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  // Connect wallet function
  const connectWallet = async () => {
    if (!window.ethereum) return alert('Please install MetaMask');

    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

    setCurrentAccount(accounts[0]);

    window.location.reload();
  };

  // Upload file to Pinata
  const uploadToPinata = async (file) => {
    const url = 'https://api.pinata.cloud/pinning/pinFileToIPFS';

    let data = new FormData();
    data.append('file', file);

    const metadata = JSON.stringify({
      name: 'NFT Asset',
      keyvalues: {
        description: 'An asset uploaded to IPFS via Pinata',
      },
    });
    data.append('pinataMetadata', metadata);

    const pinataOptions = JSON.stringify({
      cidVersion: 0,
    });
    data.append('pinataOptions', pinataOptions);

    const response = await axios.post(url, data, {
      maxBodyLength: 'Infinity',
      headers: {
        'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
        'Authorization': `Bearer ${PINATA_JWT}`,
      },
    });

    console.log('Pinata response:', response.data);
    const ipfsUrl = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
    return ipfsUrl;
  };

  // Create sale function
  const createSale = async (url, formInputPrice, isReselling, id) => {
    console.log('createSale function triggered');

    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const priceInWei = ethers.utils.parseUnits(formInputPrice, 'ether');
    console.log('Price in Wei:', priceInWei.toString());

    const contract = fetchContract(signer);
    const listingPrice = await contract.getListingPrice();
    console.log('Listing Price:', listingPrice.toString());

    // Estimate gas fees
    const gasEstimate = await contract.estimateGas.createToken(url, priceInWei, { value: listingPrice.toString() });
    const gasPrice = await provider.getGasPrice();
    const estimatedGasFee = gasEstimate.mul(gasPrice);
    console.log('Estimated Gas Fee:', ethers.utils.formatEther(estimatedGasFee.toString()), 'ETH');

    // Inform the user about gas and marketplace fees
    alert(`Estimated Gas Fee: ${ethers.utils.formatEther(estimatedGasFee.toString())} ETH\nMarketplace Listing Fee: ${ethers.utils.formatEther(listingPrice.toString())} ETH`);

    // Proceed with the transaction
    const transaction = !isReselling
      ? await contract.createToken(url, priceInWei, { value: listingPrice.toString() })
      : await contract.resellToken(id, priceInWei, { value: listingPrice.toString() });

    console.log('Creating sale on blockchain...');
    await transaction.wait();
    console.log('Sale created on blockchain!');
  };

  // Create NFT function
  const createNFT = async (formInput, fileUrl, router) => {
    console.log('createNFT function triggered');
    const { name, description, price } = formInput;

    console.log('Name:', name);
    console.log('Description:', description);
    console.log('Price:', price);
    console.log('File URL:', fileUrl);

    if (!name, !description, !price, !fileUrl) {
      console.log('Missing form input');
      return;
    }

    const data = JSON.stringify({ name, description, image: fileUrl });

    console.log('Uploading file to Pinata...');
    const ipfsUrl = await uploadToPinata(new Blob([data], { type: 'application/json' }));
    console.log('File uploaded to Pinata! URL:', ipfsUrl);

    await createSale(ipfsUrl, price, false, null);
    console.log('Sale created on blockchain!');

    router.push('/');
  };

  // Fetch NFTs function using Alchemy
  const fetchNFTs = async () => {
    console.log('Fetching NFTs...');
    const contract = fetchContract(provider); // Using the Alchemy provider here
    console.log('Contract instance:', contract);

    // Ensure the contract method exists and call fetchMarketItems()
    try {
      const data = await contract.fetchMarketItems();
      console.log('Raw data from contract:', data);

      // Process data if fetched successfully
      const items = await Promise.all(
        data.map(async ({ tokenId, seller, owner, price: unformattedPrice }) => {
          const tokenURI = await contract.tokenURI(tokenId);
          console.log(`Token URI for tokenId ${tokenId}:`, tokenURI);

          const { data: { image, name, description } } = await axios.get(tokenURI);
          console.log(`Fetched metadata for tokenId ${tokenId}:`, { image, name, description });

          const price = ethers.utils.formatUnits(unformattedPrice.toString(), 'ether');
          return {
            price,
            tokenId: tokenId.toNumber(),
            seller,
            owner,
            image,
            name,
            description,
            tokenURI,
          };
        })
      );

      console.log('Final parsed items:', items);
      return items;
    } catch (error) {
      console.error('Error fetching NFTs:', error);
      if (error.code === "CALL_EXCEPTION") {
        console.error('Contract call failed, check ABI, contract address, and network.');
      }
    }
  };

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
      }}
    >
      {children}
    </NFTContext.Provider>
  );
};
