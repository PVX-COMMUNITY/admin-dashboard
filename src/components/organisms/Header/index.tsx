import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IoIosLogOut } from "react-icons/io";

export default function Header() {
  const user = "Full Name";

  return (
    <div className="bg-primary px-8 py-4 w-full flex justify-between items-center">
      <div>
        <p className="text-3xl">PVX</p>
      </div>
      <div className="flex justify-center items-center">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>FN</AvatarFallback>
        </Avatar>
        <p className="ml-4">{user}</p>
        <div className="flex justify-center items-center gap-2 ml-8">
          <IoIosLogOut size={"30px"} />
        </div>
      </div>
    </div>
  );
}
