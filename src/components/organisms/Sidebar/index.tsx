import { Routes } from "@/App";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Link, useLocation } from "react-router-dom";
import { ImCross } from "react-icons/im";
interface Props {
  routes: Routes[];
  toggleMenu: () => void;
}

export default function Sidebar(props: Props) {
  const { routes } = props;
  const location = useLocation();

  return (
    <div className="md:bg-secondary  py-12 px-3 ">
      <div className="flex justify-center  ">
      <ImCross className="md:hidden"   size={20} onClick={props.toggleMenu} />
      </div>
      <div className="h-12"></div>
      <NavigationMenu>
        <NavigationMenuList className="flex-col gap-4">
          {routes.map((route) => {
            return (
              <Link to={route.path} key={route.name} className="w-full" onClick={() => {
                props.toggleMenu();
              }}>
                <NavigationMenuItem
                  className={
                    "min-w-20 text-center p-2 rounded-xl w-full " +
                    (location.pathname === route.path ? "md:bg-indigo-950 bg-indigo-950/60" : "")
                  }
                >
                  <div className="flex items-center justify-center mb-2">
                    {route.icon}
                  </div>
                  <p>{route.name}</p>
                </NavigationMenuItem>
              </Link>
            );
          })}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
