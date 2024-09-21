import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IoIosLogOut } from "react-icons/io";
// Added import for useNavigate hook
import { useNavigate } from "react-router-dom";

export default function Header() {
  // Updated user from string to object with more properties
  const user = {
    name: "Full Name",
    avatar: "https://github.com/shadcn.png",
    initials: "FN"
  };
  // Added useNavigate hook for navigation
  const navigate = useNavigate();

  // Added new function to handle avatar click
  const handleAvatarClick = () => {
    navigate("/dashboard/profile");
  };

  return (
    <div className="bg-primary px-8 py-4 w-full flex justify-between items-center">
      <div>
        <p className="text-3xl">PVX</p>
      </div>
      <div className="flex justify-center items-center">
        {/* Added onClick handler and cursor-pointer class to Avatar */}
        <Avatar onClick={handleAvatarClick} className="cursor-pointer">
          {/* Updated src and alt attributes to use user object properties */}
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback>{user.initials}</AvatarFallback>
        </Avatar>
        {/* Updated to use user.name */}
        <p className="ml-4">{user.name}</p>
        <div className="flex justify-center items-center gap-2 ml-8">
          <IoIosLogOut size={"30px"} />
        </div>
      </div>
    </div>
  );
}