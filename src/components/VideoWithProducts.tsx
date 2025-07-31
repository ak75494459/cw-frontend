import React from "react";

const imageColumns = [
  [
    {
      src: "https://res.cloudinary.com/dmv8kh0yx/image/upload/v1753470200/mrccmwq26daploilb7zm.jpg",
      link: "https://isharae.com/products/6883d4f9879625f3928de5da",
    },
    {
      src: "https://res.cloudinary.com/dmv8kh0yx/image/upload/v1753659699/IMG_9361_zcl1fq.jpg",
      link: "https://isharae.com/products/6883dbd2879625f3928de629",
    },
  ],
  [
    {
      src: "https://res.cloudinary.com/dmv8kh0yx/image/upload/v1753471423/rtqmhwnmatx55lsoecdy.jpg",
      link: "https://isharae.com/products/6883d9c0879625f3928de602",
    },
    {
      src: "https://res.cloudinary.com/dmv8kh0yx/image/upload/v1753469779/rfqhrzhhmsgtdm1hvs6k.jpg",
      link: "https://isharae.com/products/6883d354879625f3928de5c3",
    },
  ],
];

const VideoWithGallery: React.FC = () => {
  return (
    <div className="flex flex-col lg:flex-row w-full p-3  overflow-hidden">
      <div className="w-full   lg:w-[50%] p-5 flex justify-center items-center  ">
        <video
          className="w-[90%] h-[90%] max-md:w-full max-md:h-full   rounded-lg  object-cover"
          src="https://res.cloudinary.com/dmv8kh0yx/video/upload/v1753034943/Green_and_Cream_Elegant_Saree_Fashion_Logo_20250720_232424_0001_nydoec.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
      </div>
      <div className="max-md:w-full w-[50%] mt-12 md:flex-col flex justify-center items-center h-full p-4 m-auto">
        <div className="grid  grid-cols-2 gap-8 w-full px-4  md:px-6 h-[85%]">
          {imageColumns.map((column, colIndex) => (
            <div
              className="flex flex-col gap-8 h-auto md:h-[90%] w-full"
              key={colIndex}
            >
              {column.map((item, imgIndex) => (
                <div
                  key={imgIndex}
                  className="flex-1 overflow-hidden   rounded-full shadow-md"
                >
                  <a href={item.link} rel="noopener noreferrer">
                    <img
                      src={item.src}
                      alt={`Gallery ${colIndex}-${imgIndex}`}
                      className="w-full h-full object-cover"
                    />
                  </a>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoWithGallery;
