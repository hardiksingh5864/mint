import React, { useState,useEffect,useContext } from 'react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';

import { NFTContext } from '@/context/NFTContext';

import images from '../assets';
import { Button } from './';
import { useRouter } from 'next/router';

const MenuItems = ({ isMobile, active, setActive }) => {
    const generateLink = (i) => {
        switch(i) {
            case 0:
                return '/';
            case 1:
                return '/create-nft'; // Updated path
            case 2:
                return '/my-nfts';
            default:
                return '/';
        }
    };

    return (
        <ul className={`list-none flex ${isMobile ? 'flex-col h-full items-center justify-center' : 'flex-row'}`}>
            {['Explore NFTs', 'Listed NFTs', 'My NFTs'].map((item, i) => (
                <li
                    key={i}
                    onClick={() => setActive(item)}
                    className={`flex items-center font-poppins font-semibold text-base dark:hover:text-white hover:text-nft-dark-800 mx-3 ${
                        active === item ? 'dark:text-white text-nft-black-1' : 'dark:text-nft-gray-2 text-nft-gray-2'
                    }`}
                >
                    <Link href={generateLink(i)}>{item}</Link>
                </li>
            ))}
        </ul>
    );
};

const ButtonGroup = ({ setActive, router, isMobile }) => {
    const {connectWallet , currentAccount } = useContext(NFTContext);
    
    
    const hasConnected = true;  

    if (!isMobile && currentAccount) {
        return (
            <Button 
                btnName="Create" 
                classStyles="mx-2 rounded-xl" 
                handleClick={() => {
                    setActive('');
                    router.push('/create-nft'); // Updated path
                }} 
            />
        );
    }

    return currentAccount ? (
        <Button 
            btnName="Create" 
            classStyles="mx-2 rounded-xl" 
            handleClick={() => {
                setActive('');
                router.push('/create-nft'); // Updated path
            }} 
        />
    ) : (
        <Button 
            btnName="Connect" 
            classStyles="mx-2 rounded-xl" 
            handleClick={connectWallet}
        />
    );
};

const Navbar = () => {
    const { theme, setTheme } = useTheme();
    const router = useRouter();
    const [active, setActive] = useState('Explore NFTs');
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className={`flex w-full fixed z-10 p-4 border-b ${theme === 'dark' ? 'bg-nft-dark border-nft-black-1' : 'bg-white border-nft-gray-1'}`}>
            <div className="flex items-center flex-1">
                <Link href="/">
                    <div className="flex items-center cursor-pointer">
                        <Image src={images.logo02} objectFit="contain" width={32} height={32} alt="logo" />
                        <p className={`font-semibold text-lg ml-1 hidden md:block ${theme === 'dark' ? 'text-white' : 'text-nft-dark-800'}`}>MINT</p>
                    </div>
                </Link>
            </div>
            <div className="flex items-center space-x-4">
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        className="hidden"
                        id="checkbox"
                        checked={theme === 'dark'}
                        onChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    />
                    <label htmlFor="checkbox" className="flex items-center justify-between w-14 h-8 bg-black rounded-2xl p-1 relative cursor-pointer">
                        <i className='fas fa-sun text-yellow-500 text-lg' />
                        <i className='fas fa-moon text-pink-500 text-lg' />
                        <div className={`w-6 h-6 absolute bg-white rounded-full transition-transform duration-300 ease-in-out ${theme === 'dark' ? 'translate-x-8' : 'translate-x-0'}`} />
                    </label>
                </div>
                <div className="hidden md:flex">
                    <MenuItems isMobile={false} active={active} setActive={setActive} />
                </div>
                <div className='ml-4 hidden md:flex'>
                    <ButtonGroup setActive={setActive} router={router} isMobile={false} />
                </div>
            </div>
            <div className='md:hidden flex items-center ml-2 space-x-6'>
                {isOpen ? (
                    <Image 
                        src={images.cross} 
                        objectFit='contain' 
                        width={25} 
                        height={25} 
                        alt='cross'
                        className={theme === 'light' ? 'filter invert' : ''}
                        onClick={() => setIsOpen(false)}
                    />
                ) : (
                    <Image 
                        src={images.menu}
                        objectFit='contain'
                        width={25}
                        height={25}
                        alt='menu'
                        onClick={() => setIsOpen(true)}
                        className={theme === 'light' ? 'filter invert' : ''}
                    />
                )}

                {isOpen && (
                    <div className={`fixed inset-0 top-16 ${theme === 'dark' ? 'bg-nft-dark' : 'bg-white'} z-10 flex flex-col items-center`}>
                        <div className='flex-1 w-full flex flex-col justify-center items-center'>
                            <MenuItems isMobile={true} active={active} setActive={setActive} />
                        </div>
                        <div className='p-4 border-t dark:border-nft-black-1 border-nft-gray-1 w-full flex justify-start'>
                            <ButtonGroup setActive={setActive} router={router} isMobile={true} />
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
