import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IoIosLogOut } from "react-icons/io";
import { FiMenu } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function Header({ toggleMenu }: { toggleMenu: () => void }) {
  const user = {
    name: "Full Name",
    avatar: "https://github.com/shadcn.png",
    initials: "FN"
  };
  const navigate = useNavigate()

  const handleAvatarClick = () => {
    navigate("/dashboard/profile");
  };

  return (
    <div className="bg-primary sm:px-8 px-4 py-4 w-full flex justify-between items-center">
      <FiMenu
        className="block md:hidden cursor-pointer"
        size={30}
        onClick={toggleMenu}
      />
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