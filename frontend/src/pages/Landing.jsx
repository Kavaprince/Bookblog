import { useState } from "react";
import { CreateUser } from "../components/createUser";
import { Login } from "../components/Login";
import { Button } from "@/components/ui/button";

export function Landing() {
  //view = 0 --> login
  //view = 1 --> Create account
  const [view, setView] = useState(0);
  return (
    <div className="flex justify-center items-center w-screen h-screen ">
      <div className="bg-white p-8 rounded-lg shadow-lg w-100 my-5 hover:cursor-pointer">
        <div className="flex flex-col w-96 ">
          <img src="/logo/logo.webp" alt="Logo" className="mb-4" />
          {!view ? (
            <div className="flex flex-col w-96">
              <Login />
              <Button onClick={() => setView(!view)}>Create new account</Button>
            </div>
          ) : (
            <div className="flex flex-col w-96">
              <CreateUser />
              <Button onClick={() => setView(!view)}>
                Login existing account
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
