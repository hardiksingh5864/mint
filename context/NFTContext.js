import React, { useState, useEffect } from 'react';
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';
import { NFTStorage, File } from 'nft.storage';

import { MarketAdress, MarketAdressABI } from './constants';

// Replace with your new NFT.Storage API key
const NFT_STORAGE_API_KEY = '5b2fcd34.90d2184660684f5fbd2d760655762036'; // Ensure this is correct

export const NFTContext = React.createContext();

export const NFTProvider = ({ children }) => {
    const [currentAccount, setCurrentAccount] = useState('');
    const nftCurrency = 'ETH';

    // Initialize NFT.Storage client with the API key
    const client = new NFTStorage({ token: NFT_STORAGE_API_KEY });

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

    const connectWallet = async () => {
        if (!window.ethereum) return alert('Please install MetaMask');

        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

        setCurrentAccount(accounts[0]);

        window.location.reload();
    };

    const uploadToNFTStorage = async (file) => {
        try {
            const metadata = await client.store({
                name: 'NFT Asset',
                description: 'An asset uploaded to IPFS via NFT.Storage',
                image: new File([file], file.name, { type: file.type }),
            });
            
            const url = metadata.url; // This is the IPFS URL
            console.log('NFT.Storage URL:', url);
            return url;
        } catch (error) {
            console.error('Error uploading file to NFT.Storage:', error);
            throw new Error('Failed to upload file to NFT.Storage');
        }
    };

    return (
        <NFTContext.Provider value={{ nftCurrency, connectWallet, currentAccount, uploadToNFTStorage }}>
            {children}
        </NFTContext.Provider>
    );
};
