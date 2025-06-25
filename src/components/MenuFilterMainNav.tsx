import { useAuth0 } from "@auth0/auth0-react";
import UserNameMenu from "./UserNameMenu";
import { ShoppingCart } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useNavigate } from "react-router-dom";
import { useGetMyCartData } from "@/api/MyCartApi";
import MenuSheet from "./MenuSheet";

const MenuFilterMainNav = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const navigate = useNavigate();
  const { cartData } = useGetMyCartData();
  console.log(cartData?.items.length);
  const itemLength = cartData?.items.length;
  return (
    <span className="flex space-x-2 items-center gap-1 border-none">
      {isAuthenticated ? (
        <>
          <UserNameMenu />
          <div
            className="flex font-bold text-lg justify-center cursor-pointer"
            onClick={() => navigate("/cart")}
          >
            <Tooltip>
              <TooltipTrigger asChild>
                <ShoppingCart color="#ffffff" className="cursor-pointer" />
              </TooltipTrigger>
              <TooltipContent>
                <p>View Cart</p>
              </TooltipContent>
            </Tooltip>
            {itemLength! > 0 ? <span>({itemLength})</span> : null}
          </div>
          <MenuSheet />
        </>
      ) : (
        <div
          className="font-bold text-white cursor-pointer group  transition-all ease-in-out before:transition-[width] before:ease-in-out before:duration-700 before:absolute before:bg-white before:origin-center before:h-[2px] before:w-0 hover:before:w-[50%] before:bottom-0 before:left-[50%] after:transition-[width] after:ease-in-out after:duration-700 after:absolute after:bg-white after:origin-center after:h-[2px] after:w-0 hover:after:w-[50%] after:bottom-0 after:right-[50%] relative"
          onClick={async () => await loginWithRedirect()}
        >
          Log In
        </div>
      )}
    </span>
  );
};

export default MenuFilterMainNav;
