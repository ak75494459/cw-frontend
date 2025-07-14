import {
  Menu,
  Package,
  Info,
  Image,
  BookOpen,
  HelpCircle,
  LifeBuoy,
  Snowflake,
  Sun,
  Sparkles,
  Flame,
  ShoppingCart,
  PlusCircle,
  User,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetDescription,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import MobileNavLinks from "./MobileNavLink";
import { useGetMyUser } from "@/api/MyUserApi";

const MobileNav = () => {
  const { isAuthenticated, user, loginWithRedirect } = useAuth0();
  const { currentUser } = useGetMyUser();
  const targetId = import.meta.env.VITE_TARGET_ID;

  // These links come from your MenuSheet (minus Contact)
  const mainMenuLinks = [
    {
      name: "Products",
      to: "/products",
      icon: <Package className="w-4 h-4" />,
    },
    { name: "About", to: "/about", icon: <Info className="w-4 h-4" /> },
    { name: "Gallery", to: "/gallery", icon: <Image className="w-4 h-4" /> },
    { name: "Blog", to: "/blog", icon: <BookOpen className="w-4 h-4" /> },
    { name: "FAQ", to: "/faq", icon: <HelpCircle className="w-4 h-4" /> },
    { name: "Support", to: "/support", icon: <LifeBuoy className="w-4 h-4" /> },
  ];

  const collectionsLinks = [
    {
      name: "Winter",
      to: "/products/collections/winter",
      icon: <Snowflake className="w-4 h-4" />,
    },
    {
      name: "Summer",
      to: "/products/collections/summer",
      icon: <Sun className="w-4 h-4" />,
    },
    {
      name: "Festive",
      to: "/products/collections/festive",
      icon: <Sparkles className="w-4 h-4" />,
    },
  ];

  const highlightsLinks = [
    {
      name: "Bestsellers",
      to: "/products/bestsellers",
      icon: <Flame className="w-4 h-4" />,
    },
  ];

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Menu className="text-white cursor-pointer w-6 h-6" />
      </SheetTrigger>

      <SheetContent
        side="right"
        className="sm:max-w-sm bg-white text-black px-6 py-8 shadow-xl"
      >
        <SheetHeader>
          <SheetTitle className="font-bold text-[#99775C] mt-4">
            {isAuthenticated ? (
              <span>{user?.email}</span>
            ) : (
              <span>Welcome to LovelyRent.com</span>
            )}
          </SheetTitle>
          {!isAuthenticated && (
            <Button
              onClick={() => loginWithRedirect()}
              className="mt-2 bg-[#99775C] text-white hover:bg-[#805c43] w-full"
            >
              Log In
            </Button>
          )}
        </SheetHeader>

        {/* View Cart & Add Product - Always visible below email */}
        {isAuthenticated ? (
          <>
            <Separator className="my-4" />
            <div className="flex flex-col gap-4 mb-6">
              <Link
                to="/user-profile"
                className="flex items-center gap-2 text-[#99775C] hover:text-[#582C12] transition"
              >
                <User className="w-4 h-4" />
                User Profile
              </Link>
              <Link
                to="/cart"
                className="flex items-center gap-2 text-[#99775C] hover:text-[#582C12] transition"
              >
                <ShoppingCart className="w-4 h-4" />
                View Cart
              </Link>
              <Link
                to="/order"
                className="flex items-center gap-2 text-[#99775C] hover:text-[#582C12] transition"
              >
                <ShoppingCart className="w-4 h-4" />
                View Order
              </Link>

              {currentUser?._id === targetId && (
                <Link
                  to="/add-products"
                  className="flex items-center gap-2 text-[#99775C] hover:text-[#582C12] transition"
                >
                  <PlusCircle className="w-4 h-4" />
                  Add Products
                </Link>
              )}
            </div>
          </>
        ) : null}

        <Separator className="my-2" />

        <SheetDescription asChild>
          <nav className="flex flex-col gap-6 overflow-y-auto pb-6">
            {/* Always show MenuSheet Links */}
            <div>
              <h3 className="text-sm font-semibold uppercase text-[#CC7351] mb-3">
                Main
              </h3>
              <div className="space-y-2">
                {mainMenuLinks.map((item) => (
                  <Link
                    key={item.name}
                    to={item.to}
                    className="flex items-center gap-2 hover:text-[#99775C] transition"
                  >
                    {item.icon}
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            <Separator className="my-2" />

            <div>
              <h3 className="text-sm font-semibold uppercase text-[#CC7351] mb-3">
                Collections
              </h3>
              <div className="space-y-2">
                {collectionsLinks.map((item) => (
                  <Link
                    key={item.name}
                    to={item.to}
                    className="flex items-center gap-2 hover:text-[#99775C] transition"
                  >
                    {item.icon}
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            <Separator className="my-2" />

            <div>
              <h3 className="text-sm font-semibold uppercase text-[#CC7351] mb-3">
                Highlights
              </h3>
              <div className="space-y-2">
                {highlightsLinks.map((item) => (
                  <Link
                    key={item.name}
                    to={item.to}
                    className="flex items-center gap-2 hover:text-[#99775C] transition"
                  >
                    {item.icon}
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            {isAuthenticated && (
              <>
                <Separator className="my-4" />
                <MobileNavLinks />
              </>
            )}
          </nav>
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
