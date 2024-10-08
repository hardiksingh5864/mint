import React from 'react';
import { useContext } from 'react';
import Image from 'next/image';
import images from '../assets';
import { NFTContext } from '@/context/NFTContext';

const CreatorCard = ({ rank, creatorImage, creatorName, creatorEths }) => {
  const {nftCurrency} = useContext(NFTContext);
  return (
   <div className='min-w-190 minlg:min-w-240 dark:bg-nft-black-3 bg-white border dark:border-nft-black-3 border-nft-gray-1 rounded-3xl flex flex-col p-4 m-4'>
     <div className='w-8 h-8 minlg:w-10 minlg:h-10 bg-nft-red-violet flexCenter'>
       <p className='font-poppins text-black dark:text-white font-semibold text-base minlg:text-lg'>{rank}</p>
     </div>
 
     <div className='my-2 flex justify-center'>
       <div className='relative w-20 h-20 minlg:w-28 minlg:h-28'>
         <div className='w-full h-full relative overflow-hidden rounded-full'>
           <Image
             src={creatorImage}
             layout="fill"
             objectFit="cover"
             alt={creatorName}
             className="rounded-full"
           />
         </div>
         <div className='absolute w-4 h-4 minlg:w-7 minlg:h-7 bottom-0 right-0'>
           <Image
             src={images.tick}
             layout="fill"
             objectFit="contain"
             alt="tick"
           />
         </div>
       </div>
     </div>
 
     <div className='text-center'>
       <p className='text-xl font-semibold text-black dark:text-white'>{creatorName}</p>
       <p className='text-sm text-gray-500 dark:text-gray-300'>{creatorEths.toFixed(2)}<span className='font-normal'>{nftCurrency}</span></p>
     </div>
   </div>
 );
}

export default CreatorCard;
