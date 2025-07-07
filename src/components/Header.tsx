import { Link } from "react-router-dom";
import MobileNav from "./MobileNav";
import MainNav from "./MainNav";
import logo from "/logo3t.png";

const Header = () => {
  return (
    <div className="max-w-screen-xl mx-auto px-4 flex justify-between items-center ">
      <Link
        to="/products"
        className="relative group transition-all duration-300 ease-in-out"
      >
        <img
          src={logo}
          alt="Logo"
          className="
            w-24
            sm:w-24
            md:w-24
           lg:w-24
            xl:w-24
            max-w-full
            h-auto
            transition-all
            duration-300
            ease-in-out
            group-hover:scale-105
          "
        />
      </Link>

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
