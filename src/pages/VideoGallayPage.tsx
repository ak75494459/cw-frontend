import VideoGallery from "@/components/VideoGallery";
import modalVideo from "@/assets/modalVideo.mp4";
import modalVideo2 from "@/assets/modalVideo2.mp4";
import modalVideo3 from "@/assets/modalVideo3.mp4";

const VideoGallayPage = () => {
  const videos = [
    {
      id: "1",
      src: modalVideo,
      link: "https://example.com/page1",
    },
    {
      id: "2",
      src: modalVideo,
      link: "https://example.com/page2",
    },
    {
      id: "3",
      src: modalVideo,
      link: "https://example.com/page3",
    },
    {
      id: "4",
      src: modalVideo,
      link: "https://example.com/page3",
    },
    {
      id: "5",
      src: modalVideo2,
      link: "https://example.com/page3",
    },
    {
      id: "6",
      src: modalVideo3,
      link: "https://example.com/page3",
    },
  ];
  return <VideoGallery videos={videos} />;
};

export default VideoGallayPage;
