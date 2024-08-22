import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useContext } from 'react';
import images from '../assets';
import { NFTContext } from '@/context/NFTContext';

const NFTCard = ({ nft }) => {
  const {nftCurrency} = useContext(NFTContext);
  return (
  <Link href={{ pathname: '/nft-details', query:  nft  }}>
    <div className="flex-1 min-w-[180px] max-w-[220px] sm:min-w-[180px] sm:max-w-[220px] md:min-w-[200px] md:max-w-[240px] lg:min-w-[220px] lg:max-w-[260px] xl:min-w-[240px] xl:max-w-[280px] dark:bg-nft-black-3 bg-white rounded-2xl p-4 cursor-pointer shadow-md">
      <div className="w-full h-[180px] sm:h-[160px] md:h-[200px] lg:h-[220px] xl:h-[240px] relative ">
        <Image 
          src={nft.image || images[`nft${nft.i}`]} 
          layout="fill" 
          objectFit="cover" 
          className="rounded-t-2xl"
          alt={`nft${nft.i}`}
        />
      </div>
      <div className="mt-3 flex flex-col">
        <p className='font-poppins dark:text-white text-nft-black-1 font-semibold text-sm minlg:text-xl '>{nft.name}</p>
       <div className='flexBetween mt-3 minlg:mt-3 flex-row xs:flex-col xs:items-start xs:mt-3'>
         <p className='font-poppins dark:text-white text-nft-black-1 font-semibold text-xs minlg:text-lg'>{nft.price} <span className='normal'>{nftCurrency}</span></p>
         <p className='font-poppins dark:text-white text-nft-black-1 font-semibold text-xs minlg:text-lg'>{nft.seller}</p>
        </div>
      </div>
    </div>
  </Link>
);
}

export default NFTCard;
