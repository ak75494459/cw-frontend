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

// video logo

// import { Link } from "react-router-dom";
// import MobileNav from "./MobileNav";

// import MenuFilterMainNav from "./MenuFilterMainNav";

// const ProductsHeader = () => {
//   return (
//     <div className="max-w-screen-xl mx-auto px-4 flex justify-between items-center">
//       <Link
//         to="/"
//         className="relative group transition-all duration-300 ease-in-out"
//       >
//         <video
//           autoPlay
//           loop
//           muted
//           playsInline
//           className="w-24 sm:w-24 md:w-34 lg:w-34 xl:w-34 max-w-full h-auto transition-all duration-300 ease-in-out group-hover:scale-105"
//         >
//           <source
//             src="https://res.cloudinary.com/dmv8kh0yx/video/upload/v1753228856/output_oblmom.webm"
//             type="video/webm"
//           />
//           Your browser does not support the video tag.
//         </video>
//       </Link>
//       <div></div>
//       {/* Mobile Menu */}
//       <div className="md:hidden">
//         <MobileNav />
//       </div>

//       {/* Desktop Nav */}
//       <div className="hidden md:block">
//         <MenuFilterMainNav />
//       </div>
//     </div>
//   );
// };

// export default ProductsHeader;
