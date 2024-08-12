import React from 'react';

const Banner = ({ name, childStyles, parentStyles }) => (
    <div className={`relative w-full flex items-center justify-center z-0 overflow-hidden nft-gradient ${parentStyles}`}>
        <p className={`font-bold text-5xl md:text-4xl sm:text-3xl xs:text-2xl text-base leading-tight sm:leading-snug xs:leading-normal font-poppins ${childStyles} break-words text-center`}>
            {name}
        </p>
        <div className='absolute w-52 h-52 sm:w-40 sm:h-40 rounded-full white-bg -top-9 -left-20 -z-5' />
        <div className='absolute w-72 h-72 sm:w-50 sm:h-42 rounded-full white-bg -bottom-24 -right-14 -z-5' />
    </div>
);

export default Banner;
