//step 7
import { Link, useNavigate } from "react-router-dom"; // acts as  a button tht can be clicked to help navigate the front end routes to different pages
import { pageData } from "./pageData"; //import pageData.js
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";

import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";

//displays all the pages button to navbar
export function Navbar() {
  const navigate = useNavigate();
  //step 18
  function handleLogout() {
    sessionStorage.removeItem("User");
    navigate("/");
  }
  return (
    <NavigationMenu className="bg-primary fixed w-screen top-0 h-20 p-2">
      <NavigationMenuList>
        {pageData.map((page) => {
          return (
            <NavigationMenuItem>
              <Link to={page.path} key={page.path} className="mr-2">
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  {page.name}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
      <button onClick={handleLogout}>Log out</button>
    </NavigationMenu>
  );
}
