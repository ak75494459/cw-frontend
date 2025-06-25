import React, { useRef, useState } from "react";

interface VideoGalleryProps {
  videos: {
    id: string;
    src: string;
    link: string;
  }[];
}

const VideoGallery: React.FC<VideoGalleryProps> = ({ videos }) => {
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});
  const [hoveredVideo, setHoveredVideo] = useState<string | null>(null);

  const handlePlay = (id: string) => {
    const video = videoRefs.current[id];
    if (video) {
      video.play().catch(() => {});
    }
    setHoveredVideo(id);
  };

  const handlePause = (id: string) => {
    const video = videoRefs.current[id];
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
    setHoveredVideo(null);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 rounded-2 gap-4   m-2">
      {videos.map(({ id, src, link }) => (
        <a
          key={id}
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="relative block group overflow-hidden"
          onMouseEnter={() => handlePlay(id)}
          onMouseLeave={() => handlePause(id)}
          onTouchStart={() => handlePlay(id)} // Mobile tap support
        >
          {/* Video */}
          <video
            ref={(el) => {
              videoRefs.current[id] = el;
            }}
            src={src}
            muted
            preload="metadata"
            className="w-full h-full object-cover"
            loop
            playsInline
            controls={false}
          />

          {/* Dark overlay (fades away on hover or tap) */}
          <div
            className={`absolute inset-0 bg-black transition-opacity duration-300 pointer-events-none ${
              hoveredVideo === id ? "opacity-0" : "opacity-30"
            }`}
          />

          {/* Play icon (hidden on hover or tap) */}
          <div
            className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 pointer-events-none ${
              hoveredVideo === id ? "opacity-0" : "opacity-100"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="#ffffff"
              stroke="#ffffff"
              strokeWidth="1.33"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-play"
            >
              <polygon points="6 3 20 12 6 21 6 3" />
            </svg>
          </div>
        </a>
      ))}
    </div>
  );
};

export default VideoGallery;
