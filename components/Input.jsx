import React from 'react';
import { useContext } from 'react';
import { NFTContext } from '@/context/NFTContext';

const Input = ({ inputType, title, placeholder, handleClick }) => {
    const { nftCurrency } = useContext(NFTContext);
    return (
    <div className="mt-10 w-full">
        <p className='font-poppins dark:text-white text-nft-black-1 font-semibold text-xl'>{title}</p>
        
        {inputType === 'number' ? (
            <div className="dark:bg-nft-black-1 bg-white border dark:border-nft-black-1 border-nft-gray-2 rounded-lg w-full outline-none font-poppins dark:text-white text-nft-gray-2 text-base mt-4 px-4 py-3 flexBetween flex-row">
                <input
                    type="number"
                    className="flex w-full dark:bg-nft-black-1 bg-white outline-none font-poppins dark:text-white text-nft-gray-2 text-base"
                    placeholder={placeholder}
                    onChange={handleClick}
                />
                <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xl">{nftCurrency}</p>
            </div>
        ) : inputType === 'textarea' ? (
            <div>
                <textarea 
                    placeholder={placeholder}
                    onClick={handleClick}
                    className="w-full p-3 text-base text-nft-black dark:bg-nft-black-1 bg-white border border-dashed dark:border-white border-nft-black-1 rounded-lg outline-none font-poppins dark:text-white text-nft-gray-2 mt-4"
                    rows="4"
                />
            </div>
        ) : (
            <input 
                type={inputType}
                placeholder={placeholder}
                onClick={handleClick}
                className='dark:bg-nft-black-1 bg-white border dark:border-nft-black-1 border-nft-gray-2 rounded-lg w-full outline-none font-poppins dark:text-white text-nft-gray-2 text-base mt-4 px-4 py-3'
            />
        )}
    </div>
);
}

export default Input;
