import { Menu } from "lucide-react";
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
import MobileNavLink from "./MobileNavLink";
import { useAuth0 } from "@auth0/auth0-react";

const MobileNav = () => {
  const { isAuthenticated, user, loginWithRedirect } = useAuth0();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Menu className="text-white cursor-pointer" />
      </SheetTrigger>
      <SheetContent
        side="right"
        className="sm:max-w-sm bg-white text-black px-6 shadow-xl"
      >
        <SheetHeader>
          <SheetTitle className="font-bold text-[#99775C] mt-10">
            {isAuthenticated ? (
              <span>{user?.email}</span>
            ) : (
              <span>Welcome to LovelyRent.com</span>
            )}
          </SheetTitle>
        </SheetHeader>
        <Separator />
        <SheetDescription className="flex flex-col ">
          {isAuthenticated ? (
            <MobileNavLink />
          ) : (
            <Button
              onClick={async () => await loginWithRedirect()}
              className="bg-[#99775C] text-white hover:bg-[#805c43]"
            >
              Log In
            </Button>
          )}
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
