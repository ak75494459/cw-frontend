import { Link } from "react-router-dom";
import MobileNav from "./MobileNav";
import MainNav from "./MainNav";

const Header = () => {
  return (
    <div className="max-w-screen-xl mx-auto px-4 flex justify-between items-center">
      <Link
        to="/products"
        className="font-serif text-3xl font-bold  relative hover:scale-105 transform transition-all duration-300 ease-in-out before:content-[''] before:absolute before:w-0 hover:before:w-[50%] before:h-[2px] before:bottom-0 before:left-[50%] before:bg-white before:origin-center before:transition-all before:duration-700 after:content-[''] after:absolute after:w-0 hover:after:w-[50%] after:h-[2px] after:bottom-0 after:right-[50%] after:bg-white after:origin-center after:transition-all after:duration-700"
      >
        isharae
      </Link>
      <div></div>
      {/* Mobile Menu */}
      <div className="md:hidden">
        <MobileNav />
      </div>

      {/* Desktop Nav */}
      <div className="hidden md:block">
        <MainNav />
      </div>
    </div>
  );
};

export default Header;
