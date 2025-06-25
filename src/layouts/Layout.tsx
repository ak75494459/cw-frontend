import Footer from "@/components/Footer";
import Header from "@/components/Header";

type Props = {
  children: React.ReactNode;
};
//  #DDD0C8
//  #99775C
//  #323232
//  #99775C
const Layout = ({ children }: Props) => {
  return (
    <div className="flex flex-col min-h-screen">
      <header
        className="w-full py-6 text-[white] top-0 left-0 z-50  transition-all bg-[#492822] shadow-md backdrop-blur-md 
          "
      >
        <Header />
      </header>

      <div className="flex-1 py-10 ">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
