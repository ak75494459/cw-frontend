import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import {
  AlignLeft,
  Info,
  Image,
  BookOpen,
  Phone,
  HelpCircle,
  LifeBuoy,
  Snowflake,
  Sun,
  Sparkles,
  Flame,
  Shirt,
} from "lucide-react";
import { Link } from "react-router-dom";

const MenuSheet = () => {
  const mainMenuLinks = [
    {
      name: "Products",
      to: "/products",
      icon: <Shirt className="w-4 h-4" />,
    },
    { name: "About", to: "/about", icon: <Info className="w-4 h-4" /> },
    { name: "Gallery", to: "/gallery", icon: <Image className="w-4 h-4" /> },
    { name: "Blog", to: "/blog", icon: <BookOpen className="w-4 h-4" /> },
    { name: "Contact", to: "/contact", icon: <Phone className="w-4 h-4" /> },
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

  const middleLinks = [
    {
      name: "Bestsellers",
      to: "/products/bestsellers",
      icon: <Flame className="w-4 h-4" />,
    },
  ];

  return (
    <Sheet>
      <SheetTrigger asChild>
        <AlignLeft className="text-white ml-2 cursor-pointer w-6 h-6" />
      </SheetTrigger>

      <SheetContent side="right" className="w-[280px] px-5 py-6">
        <SheetHeader>
          <SheetTitle className="text-lg font-bold text-zinc-800">
            Menu
          </SheetTitle>
          <SheetDescription className="text-sm text-zinc-500">
            Navigate through categories and features.
          </SheetDescription>
        </SheetHeader>

        <nav className="mt-6 space-y-6 text-base font-medium text-zinc-800">
          {/* Main Menu */}
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

          <Separator className="my-3" />

          {/* Collections */}
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

          <Separator className="my-3" />

          {/* Highlights */}
          <div>
            <h3 className="text-sm font-semibold uppercase text-[#CC7351] mb-3">
              Highlights
            </h3>
            <div className="space-y-2">
              {middleLinks.map((item) => (
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
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MenuSheet;
