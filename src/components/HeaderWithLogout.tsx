import React from "react";
import logo from "../assets/jsh_logo.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Button from "./Buttons";
import { BASE_URL } from "../constants";
import axios from "axios";

export default function Header() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect Login Users to DashboardPage and else to HomePage
  const handleClick = () => {
    if (isAuthenticated) {
      navigate("/dashboard");
    } else {
      navigate("/");
    }
  };

  const logout = async () => {
    const token = localStorage.getItem("token");
    try {
      await axios.get(BASE_URL + "/logout/", {
        headers: {
          Authorization: "Token " + token,
        },
      });
    } catch (error) {
      console.error("Error logging out:", error);
    }
    console.log("logout");
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <header className="flex items-center justify-between pl-10 pb-10 select-none cursor-pointer">
      <div className="">
        <img
          src={logo}
          alt="Job Search Helper Logo"
          className="h-20 w-auto"
          onClick={handleClick}
        />
      </div>
      <div className="">
        <Button onClick={() => logout()}>Logout</Button>
      </div>
    </header>
  );
}
