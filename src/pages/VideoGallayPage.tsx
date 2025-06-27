import VideoGallery from "@/components/VideoGallery";

const VideoGallayPage = () => {
  const videos = [
    {
      id: "1",
      src: "https://res.cloudinary.com/dmv8kh0yx/video/upload/v1751004720/modalVideo2_b8horx.mp4",
      link: "https://example.com/page1",
    },
    {
      id: "2",
      src: "https://res.cloudinary.com/dmv8kh0yx/video/upload/v1751004720/modalVideo2_b8horx.mp4",
      link: "https://example.com/page2",
    },
    {
      id: "3",
      src: "https://res.cloudinary.com/dmv8kh0yx/video/upload/v1751004717/modalVideo3_gkvw5h.mp4",
      link: "https://example.com/page3",
    },
    {
      id: "4",
      src: "https://res.cloudinary.com/dmv8kh0yx/video/upload/v1751004719/modalVideo_j3jzob.mp4",
      link: "https://example.com/page3",
    },
    {
      id: "5",
      src: "https://res.cloudinary.com/dmv8kh0yx/video/upload/v1751004719/modalVideo_j3jzob.mp4",
      link: "https://example.com/page3",
    },
    {
      id: "6",
      src: "https://res.cloudinary.com/dmv8kh0yx/video/upload/v1751004719/modalVideo_j3jzob.mp4",
      link: "https://example.com/page3",
    },
  ];
  return <VideoGallery videos={videos} />;
};

export default VideoGallayPage;
