import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Banner, CreatorCard, NFTCard } from "@/components";
import images from "../assets";
import { makeId } from "@/utils/makeid";
import { useTheme } from "next-themes";

const Home = ({ isMenuOpen }) => {
  const scrollRef = useRef(null);
  const containerRef = useRef(null);
  const { theme } = useTheme();
  const [isClient, setIsClient] = useState(false);
  const [isScrollHidden, setIsScrollHidden] = useState(false);

  const handleScroll = (direction) => {
    const { current } = scrollRef;

    if (current) {
      const scrollAmount = 100; // Amount to scroll
      if (direction === "left") {
        current.scrollLeft -= scrollAmount;
      } else {
        current.scrollLeft += scrollAmount;
      }
    }
  };

  useEffect(() => {
    // Set client state to true after the component has mounted
    setIsClient(true);

    const handleScrollEvent = () => {
      if (containerRef.current) {
        const { top, bottom } = containerRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Check if "Best Creators" section is in view
        setIsScrollHidden(bottom < 0 || top > windowHeight);
      }
    };

    // Add event listener for scroll events
    window.addEventListener("scroll", handleScrollEvent);
    // Clean up event listener on unmount
    return () => window.removeEventListener("scroll", handleScrollEvent);
  }, []);

  // Render nothing on the server side or while loading
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
            {/* Hide scroll images when menu is open */}
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
          <div className="mt-3 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8  dark:text-white text-nft-black-1 ">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
              <NFTCard
                key={`nft-${i}`}
                nft={{
                  i,
                  name: `Nifty NFT${i}`,
                  price:(10-i*0.534.toFixed(2)),
                  seller: `0x${makeId(3)}...${makeId(4)}`,
                  owner: `0x${makeId(3)}...${makeId(4)}`,
                  description: 'Cool NFT on Sale',
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
