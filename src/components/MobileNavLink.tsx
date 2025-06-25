import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useAuth0 } from "@auth0/auth0-react";
import { useGetMyUser } from "@/api/MyUserApi";
import {
  ShoppingCart,
  User,
  MessageSquareText,
  PlusCircle,
  LogOut,
} from "lucide-react";

const MobileNavLinks = () => {
  const { logout } = useAuth0();
  const { currentUser } = useGetMyUser();
  const targetId = import.meta.env.VITE_TARGET_ID;

  return (
    <div className="flex flex-col gap-y-4 text-base text-[#99775C] font-medium">
      <Link
        to="/user-profile"
        className="flex items-center gap-2 hover:text-[#582C12]"
      >
        <User size={18} />
        User Profile
      </Link>

      <Link to="/cart" className="flex items-center gap-2 hover:text-[#582C12]">
        <ShoppingCart size={18} />
        View Cart
      </Link>

      <Link to="/chat" className="flex items-center gap-2 hover:text-[#582C12]">
        <MessageSquareText size={18} />
        Contact Us
      </Link>

      {currentUser?._id === targetId && (
        <Link
          to="/add-products"
          className="flex items-center gap-2 hover:text-[#582C12]"
        >
          <PlusCircle size={18} />
          Add Products
        </Link>
      )}

      <Button
        onClick={() => logout()}
        className="flex items-center gap-2 mt-4 font-bold bg-[#99775C] hover:bg-[#582C12]"
      >
        <LogOut size={18} />
        Log Out
      </Button>
    </div>
  );
};

export default MobileNavLinks;
