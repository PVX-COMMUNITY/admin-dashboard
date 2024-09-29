import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { ReactNode, useState } from "react";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import { MdOutlineCurrencyRupee, MdGroup, MdDashboard } from "react-icons/md";
import { FaUser } from "react-icons/fa6";
import { FiX } from "react-icons/fi";


import ProfilePage from "./components/pages/ProfilePage";
import Header from "@/components/organisms/Header";
import Sidebar from "@/components/organisms/Sidebar";
import LoginPage from "@/components/pages/LoginPage";
import GroupsPage from "@/components/pages/GroupsPage";
import MembersPage from "@/components/pages/MembersPage";
import BirthdaysPage from "@/components/pages/BirthdaysPage";
import DonationsPage from "@/components/pages/DonationsPage";
import DashboardPage from "./components/pages/DashboardPage";
import NotFoundPage from "./components/pages/NotFoundPage";

export interface Routes {
  name: string;
  path: string;
  element: JSX.Element;
  icon?: ReactNode;
  showInSidebar?: boolean;
}

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const routes: Routes[] = [
    {
      name: "Dashboard",
      path: "/dashboard",
      element: <DashboardPage />,
      icon: <MdDashboard size={"30px"} />,
      showInSidebar: true,
    },
    {
      name: "Members",
      path: "/dashboard/members",
      element: <MembersPage />,
      icon: <FaUser size={"22px"} />,
      showInSidebar: true,
    },
    {
      name: "Groups",
      path: "/dashboard/groups",
      element: <GroupsPage />,
      icon: <MdGroup size={"30px"} />,
      showInSidebar: true,
    },
    {
      name: "Birthdays",
      path: "/dashboard/birthdays",
      element: <BirthdaysPage />,
      icon: <LiaBirthdayCakeSolid size={"30px"} />,
      showInSidebar: true,
    },
    {
      name: "Donations",
      path: "/dashboard/donations",
      element: <DonationsPage />,
      icon: <MdOutlineCurrencyRupee size={"30px"} />,
      showInSidebar: true,
    },
    {
      name: "Not Found",
      path: "*",
      element: <NotFoundPage />,
      showInSidebar: false,
    },
    {
      name: "Profile",
      path: "/dashboard/profile",
      element: <ProfilePage />,
      icon: <FaUser size={"22px"} />,
      showInSidebar:true
    },
  ];

  function Layout() {
    return (
      <>
      <div className="flex min-h-screen">
        <div
          className={`block inset-0 bg-black transition-opacity duration-300 ease-in-out ${
            isMenuOpen ? 'opacity-50 z-40' : 'opacity-0 -z-10'
          } md:hidden`}
          onClick={toggleMenu}
        ></div>

        <div
          className={`fixed top-0 left-0 h-screen bg-secondary z-50 transition-all duration-300 ease-in-out transform ${
            isMenuOpen ? 'translate-x-0 shadow-lg' : '-translate-x-full'
          } md:relative md:translate-x-0 md:shadow-none`}
          style={{ width: '135px' }}
        >
          <div className="flex justify-between items-center p-4 md:hidden">
            <FiX
              className="cursor-pointer transition-transform duration-300 ease-in-out"
              style={{marginLeft:"80px"}}
              size={24}
              onClick={toggleMenu}
            />
          </div>
          <Sidebar routes={routes.filter((route) => route.showInSidebar)} />
        </div>

        <div className="flex flex-col w-full transition-all duration-300 ease-in-out">
          <Header toggleMenu={toggleMenu} isMenuOpen = {isMenuOpen} />
          <div className="sm:p-8 p-4 bg-primary h-full">
            <Outlet />
          </div>
        </div>
      </div>
      </>
    );
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <LoginPage />,
    },
    {
      element: <Layout />,
      children: routes.map((route) => {
        return { path: route.path, element: route.element };
      }),
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
