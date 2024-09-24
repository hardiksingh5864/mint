import React, { useState, useEffect, useRef, useContext } from "react";
import Image from "next/image";
import { Banner, CreatorCard, NFTCard } from "@/components";
import { NFTContext } from "@/context/NFTContext";
import images from "../assets";
import { makeId } from "@/utils/makeid";
import { useTheme } from "next-themes";

const Home = ({ isMenuOpen }) => {
  const { fetchNFTs, createdNFTs } = useContext(NFTContext); // Added createdNFTs to context
  const scrollRef = useRef(null);
  const containerRef = useRef(null);
  const [nfts, setNfts] = useState([]);
  const { theme } = useTheme();
  const [isClient, setIsClient] = useState(false);
  const [isScrollHidden, setIsScrollHidden] = useState(false);

  // Prices starting from 9.47, decreasing as specified
  const prices = [9.47, 8.93, 8.4, 7.86, 7.33, 6.79, 6.26, 5.72, 5.19, 4.65];

  // Simplified dynamic creation of prebuilt Hot Bids using map
  const prebuiltHotBids = Array.from({ length: 10 }, (_, i) => ({
    tokenId: (i + 1).toString(),
    name: `Exclusive NFT ${i + 1}`,
    price: prices[i].toFixed(2),  // Price with fixed 2 decimal places
    seller: `0x${makeId(3)}...${makeId(4)}`,
    image: images[`nft${i + 1}`],  // Access the image dynamically
  }));

  useEffect(() => {
    fetchNFTs()
      .then((items) => {
        setNfts(items || []);
      })
      .catch((error) => console.error("Error fetching NFTs:", error));
  }, []);

  const handleScroll = (direction) => {
    const { current } = scrollRef;

    if (current) {
      const scrollAmount = 100;
      if (direction === "left") {
        current.scrollLeft -= scrollAmount;
      } else {
        current.scrollLeft += scrollAmount;
      }
    }
  };

  useEffect(() => {
    setIsClient(true);

    const handleScrollEvent = () => {
      if (containerRef.current) {
        const { top, bottom } = containerRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        setIsScrollHidden(bottom < 0 || top > windowHeight);
      }
    };

    window.addEventListener("scroll", handleScrollEvent);
    return () => window.removeEventListener("scroll", handleScrollEvent);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div className="flex justify-center sm:px-4 p-12 relative">
      <div className="w-full minmd:w-4/5">
        <Banner
          name="Discover, Collect, and Sell Extraordinary NFTs"
          childStyles="text-left"
          parentStyles="justify-start mb-6 h-72 sm:h-60 p-12 xs:p-4 xs:h-44 rounded-3xl"
        />
        <div>
          <h1 ref={containerRef} className="font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-semibold ml-4 xs:ml-0">
            Best Creators
          </h1>
          <div className="relative overflow-hidden w-full">
            {!isScrollHidden && !isMenuOpen && (
              <>
                <div
                  onClick={() => handleScroll("left")}
                  className="absolute top-1/2 left-0 transform -translate-y-1/2 w-8 h-8 minlg:w-12 minlg:h-12 cursor-pointer z-50 mdx:hidden"
                >
                  <Image
                    src={images.left}
                    layout="fill"
                    objectFit="contain"
                    alt="left_arrow"
                    className={theme === "light" ? "filter invert" : ""}
                  />
                </div>
                <div
                  onClick={() => handleScroll("right")}
                  className="absolute top-1/2 right-0 transform -translate-y-1/2 w-8 h-8 minlg:w-12 minlg:h-12 cursor-pointer z-50 mdx:hidden"
                >
                  <Image
                    src={images.right}
                    layout="fill"
                    objectFit="contain"
                    alt="right_arrow"
                    className={theme === "light" ? "filter invert" : ""}
                  />
                </div>
              </>
            )}
            <div
              className="relative flex-1 max-w-full mt-3 overflow-x-auto no-scrollbar"
              ref={scrollRef}
            >
              <div className="flex flex-row gap-4">
                {[6, 7, 8, 9, 10].map((i) => (
                  <CreatorCard
                    key={`creator-${i}`}
                    rank={i}
                    creatorImage={images[`creator${i}`]}
                    creatorName={`0x${makeId(3)}...${makeId(4)}`}
                    creatorEths={10 - i * 0.5}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10">
          <div className="flex flex-col sm:flex-row justify-between items-center mx-4 xs:mx-0 minlg:mx-8 space-y-4 sm:space-y-0">
            <h1 className="text-start dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-semibold">
              Hot Bid
            </h1>
            <div className="text-right w-full sm:w-auto">
              {/* Replace with your SearchBar component */}
              SearchBar
            </div>
          </div>
          <div className="mt-3 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 dark:text-white text-nft-black-1">
            {/* Render Prebuilt Hot Bids using map */}
            {prebuiltHotBids.map((nft) => (
              <NFTCard key={nft.tokenId} nft={nft} />
            ))}
            {/* Render Created NFTs */}
            {createdNFTs.map((nft) => (
              <NFTCard key={nft.tokenId} nft={nft} />
            ))}
            {/* Fallback message */}
            {nfts.length === 0 && createdNFTs.length === 0 && <p>No NFTs available.</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
