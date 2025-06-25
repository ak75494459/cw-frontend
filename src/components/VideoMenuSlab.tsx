import { useEffect, useState } from "react";
import video from "../assets/video.mp4";
import { Link } from "react-router-dom";

const VideoMenuSlab = () => {
  const [hideHeader, setHideHeader] = useState(false);
  const [showCollections, setShowCollections] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHideHeader(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const mainMenuLinks = [
    { name: "Products", to: "/products" },
    { name: "About", to: "/about" },
    { name: "Gallery", to: "/gallery" },
    { name: "Blog", to: "/blog" },
    { name: "Contact", to: "/contact" },
    { name: "FAQ", to: "/faq" },
    { name: "Support", to: "/support" },
  ];

  const collectionsLinks = [
    { name: "Winter", to: "products/collections/winter" },
    { name: "Summer", to: "products/collections/summer" },
    { name: "Festive", to: "products/collections/festive" },
  ];

  const middleLinks = [{ name: "Bestsellers", to: "/products/bestsellers" }];

  return (
    <div className="relative h-[600px] -mt-10 overflow-hidden w-full">
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        className="w-full h-full object-cover"
      >
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Main Top Menu */}
      {!hideHeader && (
        <div className="fixed top-[7.3rem] left-1/2 z-50 transform -translate-x-1/2 w-full flex justify-center gap-10 p-5 max-md:hidden">
          {mainMenuLinks.map((item, idx) => (
            <Link
              key={idx}
              to={item.to}
              className="text-white text-lg font-semibold hover:text-pink-400 transition duration-300 transform hover:scale-105"
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}

      {/* Dropdown Area with Middle Links */}
      {!hideHeader && (
        <div className="fixed top-[11rem] left-1/2 z-50 transform -translate-x-1/2 w-full flex justify-center gap-12 p-5 max-md:hidden">
          {/* Collections Dropdown */}
          <div
            className="relative text-white text-lg font-semibold cursor-pointer"
            onMouseEnter={() => setShowCollections(true)}
            onMouseLeave={() => setShowCollections(false)}
          >
            <div className="hover:text-pink-400 transition duration-300 transform hover:scale-105">
              Collections
            </div>
            {showCollections && (
              <div className="absolute top-full  bg-black/70 rounded-md px-4 py-3 text-white shadow-xl space-y-2 text-sm min-w-[140px]">
                {collectionsLinks.map((link, idx) => (
                  <Link
                    key={idx}
                    to={link.to}
                    className="block hover:text-pink-400 transition duration-200 whitespace-nowrap"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Middle Links */}
          {middleLinks.map((item, idx) => (
            <Link
              key={idx}
              to={item.to}
              className="text-white text-lg font-semibold hover:text-pink-400 transition duration-300 transform hover:scale-105"
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default VideoMenuSlab;
