import { Button } from "./ui/button";
import { useAuth0 } from "@auth0/auth0-react";
import { LogOut } from "lucide-react";

const MobileNavLinks = () => {
  const { logout } = useAuth0();

  return (
    <div className="flex flex-col gap-y-4 text-base text-[#99775C] font-medium">
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
