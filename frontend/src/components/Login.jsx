import { useState } from "react";
import { verifyUser } from "../api";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

//step 14
export function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  function handleChange(e) {
    //update setUser state with what the user inputs
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault(); //prevents to wipe out input from box after submitting
    let response = await verifyUser(user);
    if (response) {
      navigate("/home");
      //step 15
      sessionStorage.setItem("User", response);
      //step 16
      axios.defaults.headers.common["Authorization"] = `Bearer ${response}`;
    } else {
      alert("Login failed");
    }
    //console.log(response);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <Input
        placeholder={"Email"}
        onChange={handleChange}
        name="email"
        required
        maxLength={40}
        className="mb-4"
      />
      <Input
        placeholder={"Password"}
        onChange={handleChange}
        name="password"
        type="password"
        required
        maxLength={20}
        className="mb-4"
      />
      <Button type="submit" className="mb-4" color="primary">
        Login
      </Button>
    </form>
  );
}
