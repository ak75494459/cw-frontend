// import { CircleUserRound } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useGetMyUser } from "@/api/MyUserApi";

const UsernameMenu = () => {
  const { user, logout } = useAuth0();
  const { currentUser } = useGetMyUser();
  const targetId = import.meta.env.VITE_TARGET_ID;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex ml-10 items-center px-3 font-bold  gap-1 cursor-pointer  ">
        <Avatar className=" rounded-full overflow-hidden bg-white">
          <AvatarImage
            src={currentUser?.profileImageUrl}
            className="w-full h-full object-cover"
          />
          <AvatarFallback>
            {/* <CircleUserRound className="text-black w-full h-full" /> */}
            <img
              src="https://avatars.githubusercontent.com/u/124599?v=4"
              alt=""
            />
          </AvatarFallback>
        </Avatar>

        {user?.email}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Link
            to="/user-profile"
            className="font-bold text-[#99775C] hover:text-[#CC7351]"
          >
            User Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link
            to="/order"
            className="font-bold text-[#99775C] hover:text-[#CC7351]"
          >
            View Order
          </Link>
        </DropdownMenuItem>
        {currentUser?._id === targetId ? (
          <DropdownMenuItem>
            <Link
              to="/add-products"
              className="font-bold text-[#99775C] hover:text-[#CC7351]"
            >
              Add Products
            </Link>
          </DropdownMenuItem>
        ) : null}
        <Separator />
        <DropdownMenuItem>
          <Button
            onClick={() => logout()}
            className="flex flex-1 font-bold bg-[#99775C] hover:bg-[#CC7351]"
          >
            Log Out
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UsernameMenu;
