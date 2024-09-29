import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FiMenu, FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import logo from "@/assets/images/pvx.png";

export default function Header({
  toggleMenu,
  isMenuOpen,
}: {
  toggleMenu: () => void;
  isMenuOpen: boolean;
}) {
  const user = {
    name: "Full Name",
    avatar: "https://github.com/shadcn.png",
    initials: "FN",
  };
  const navigate = useNavigate();

  const handleAvatarClick = () => {
    navigate("/dashboard/profile");
  };

  return (
    <div className="bg-primary sm:px-8 px-4 py-4 w-full flex justify-between items-center relative">
{!isMenuOpen && (
        <FiMenu
          className="block md:hidden cursor-pointer"
          size={30}
          onClick={toggleMenu} 
        />
      ) }
      <div>
        <img
          src={logo}
          className="w-16 sm:w-20 invert mix-blend-lighten"
          alt="logo"
        />
      </div>
      <div className="flex justify-center items-center">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex justify-center items-center">
            <Avatar className="cursor-pointer">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{user.initials}</AvatarFallback>
            </Avatar>
            <p className="ml-4 hidden sm:block">{user.name}</p>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="p-2 opacity-95 
          rounded-xl space-y-1 m-1 "
          >
            {/* <DropdownMenuLabel className="block sm:hidden">
              Hi {user.name} !
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="block sm:hidden" /> */}
            <DropdownMenuItem
              className="px-8 cursor-pointer  "
              onClick={handleAvatarClick}
            >
              View Profile
            </DropdownMenuItem>

            <DropdownMenuItem className="px-8 cursor-pointer">
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="px-8 cursor-pointer">
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
