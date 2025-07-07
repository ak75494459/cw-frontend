import { Link } from "react-router-dom";
import MobileNav from "./MobileNav";

import MenuFilterMainNav from "./MenuFilterMainNav";
import logo from "/logo3t.png";

const ProductsHeader = () => {
  return (
    <div className="max-w-screen-xl mx-auto px-4 flex justify-between items-center">
      <Link
        to="/"
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
      <div></div>
      {/* Mobile Menu */}
      <div className="md:hidden">
        <MobileNav />
      </div>

      {/* Desktop Nav */}
      <div className="hidden md:block">
        <MenuFilterMainNav />
      </div>
    </div>
  );
};

export default ProductsHeader;
