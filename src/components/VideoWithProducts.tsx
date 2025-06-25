import React from "react";
import video from "@/assets/video.mp4"; // Replace with correct path

const imageColumns = [
  [
    "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg",
    "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-1.jpg",
  ],
  [
    "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-2.jpg",
    "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-3.jpg",
  ],
];

const VideoWithGallery: React.FC = () => {
  return (
    <div className="flex flex-col lg:flex-row w-full p-3  overflow-hidden">
      <div className="w-full   lg:w-[50%] p-5 flex justify-center items-center  ">
        <video
          className="w-[90%] h-[90%] max-md:w-full max-md:h-full   rounded-lg  object-cover"
          src={video}
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
              {column.map((src, imgIndex) => (
                <div
                  key={imgIndex}
                  className="flex-1 overflow-hidden   rounded-full shadow-md"
                >
                  <img
                    src={src}
                    alt={`Gallery ${colIndex}-${imgIndex}`}
                    className="w-full h-full object-cover"
                  />
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
