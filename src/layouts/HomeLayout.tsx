import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useEffect, useState } from "react";

type Props = {
  children: React.ReactNode;
};

const HomeLayout = ({ children }: Props) => {
  const [scrolled, setScrolled] = useState(false);
  const [hideHeader, setHideHeader] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 50); // background color when scrolled > 50px
      setHideHeader(y > 300); // hide header when scrolled > 300px
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div className="flex flex-col min-h-screen">
      <header
        className={`w-full py-6 fixed text-white  h-[15rem] max-md:h-[5rem] max-md:bg-transparent top-0 left-0 z-50  transition-all duration-500  ${
          scrolled
            ? "bg-[#99775C]/50 shadow-md backdrop-blur-md"
            : "bg-transparent"
        } ${hideHeader ? "opacity-0 pointer-events-none" : "opacity-100"}`}
      >
        <Header />
      </header>

      <div className="flex-1 py-10">{children}</div>
      <Footer />
    </div>
  );
};

export default HomeLayout;
