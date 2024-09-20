import { Routes } from "@/App";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Link, useLocation } from "react-router-dom";

interface Props {
  routes: Routes[];
}

export default function Sidebar(props: Props) {
  const { routes } = props;
  const location = useLocation();

  return (
    <div className="bg-secondary py-12 px-3">
      <div className="h-12"></div>
      <NavigationMenu>
        <NavigationMenuList className="flex-col gap-4">
          {routes.map((route) => {
            return (
              <Link to={route.path} key={route.name} className="w-full">
                <NavigationMenuItem
                  className={
                    "min-w-20 text-center p-2 rounded w-full " +
                    (location.pathname === route.path ? "bg-indigo-950" : "")
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
