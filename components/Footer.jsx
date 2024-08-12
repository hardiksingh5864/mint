import React from 'react';
import Image from 'next/image';
import { useTheme } from 'next-themes';

import images from '../assets';
import { Button } from '.';

const FooterLinks = ({ heading, items }) => (
  <div className='flex flex-col items-start mb-6 sm:mb-0'>
    <h3 className='font-poppins dark:text-white text-nft-dark-800 font-semibold text-base'>{heading}</h3>
    {items.map((item, index) => (
      <p key={index} className='font-poppins dark:text-white text-nft-dark-800 font-semibold text-base'>{item}</p>
    ))}
  </div>
);

const Footer = () => {
  const { theme } = useTheme();

  return (
    <footer className='flex flex-col items-center border-t dark:border-nft-black-1 border-nft-gray-1 sm:py-8 py-16'>
      <div className='w-full minmd:w-4/5 flex flex-col items-start sm:px-4 px-16 py-4'>
        <div className='flex flex-col w-full mt-8'>
          <div className='flex flex-col sm:flex-row sm:space-x-8 space-y-6 sm:space-y-0 justify-between w-full'>
            <div className='flex flex-col items-start mb-6 sm:mb-0'>
              <div className='flex items-center cursor-pointer mb-2'>
                <Image src={images.logo02} width={25} height={25} alt='logo' />
                <p className='dark:text-white text-nft-black-1 ml-2'>MINT</p>
              </div>
              <p className='font-poppins dark:text-white text-nft-dark-800 font-semibold text-base'>
                Get the latest updates
              </p>
              <div className='flex w-full mt-6 dark:bg-nft-dark-950 bg-white border-nft-gray-2 rounded-md'>
                <input 
                  type="email" 
                  placeholder='Your Email' 
                  className='h-full flex-1 w-full dark:bg-nft-black-2 bg-nft-gray-1 px-4 py-2 rounded-l-md dark:text-white text-nft-black-1 minlg:text-lg outline-none dark:placeholder-gray-400 placeholder-gray-500' 
                />
                <div className='flex-initial'>
                  <Button 
                    btnName="Email me"
                    classStyles="rounded-r-md"
                  />
                </div>
              </div>
            </div>
            <FooterLinks heading="MINT" items={['Explore', 'How it Works', 'Contact Us','Join Us!']} />
            <FooterLinks heading="Support" items={['Help Center', 'Terms of Service', 'Legal', 'Privacy Policy']} />
          </div>
        </div>
      </div>
      <div className='w-full sm:px-4 px-16 py-4'>
        <div className='flex flex-col sm:flex-row justify-between items-center w-full minmd:w-4/5'>
          <p className='font-poppins dark:text-white text-nft-black-1 font-semibold text-base'>
            MINT, Inc. All Rights Reserved
          </p>
          <div className='flex flex-row space-x-4 mt-4 sm:mt-0'>
            {[images.instagram, images.twitter, images.telegram, images.discord].map((image, index) => (
              <div className='mx-2 cursor-pointer' key={index}>
                <Image 
                  src={image} 
                  objectFit='contain' 
                  width={24} 
                  height={24} 
                  alt={`social-${index}`}
                  className={theme === 'light' ? 'filter invert' : ''} 
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
