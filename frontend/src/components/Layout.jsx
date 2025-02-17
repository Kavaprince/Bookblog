//Step 7
import { useEffect } from "react";
import { Navbar } from "./Navbar"; //import Navbar
import { Outlet, useNavigate } from "react-router-dom"; // used to render child routes in parent routes

export function Layout() {
  //step 17
  //checks if the user is logged in by looking for user data in session storage. If the user isn't logged in (no data found), they are redirected to the landing page ("/"). If the user is logged in, they stay on the current page.
  let user = sessionStorage.getItem("User");
  const navigate = useNavigate();
  //step17
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user]);

  return (
    <>
      <Navbar />
      <main className="flex w-screen justify-center mt-24">
        <Outlet />
      </main>
    </>
  );
}
