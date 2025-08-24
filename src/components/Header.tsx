import React from "react";
import logo from "../assets/jsh_logo.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Button from "../components/Buttons";
import { BASE_URL } from "../constants";
import axios from "axios";

export default function Header() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect Users to HomePage
  const handleClick = () => {
    navigate("/");
  };

  return (
    <header className="flex items-center pl-10 pb-10 select-none cursor-pointer">
      <img
        src={logo}
        alt="Job Search Helper Logo"
        className="h-20 w-auto"
        onClick={handleClick}
      />
    </header>
  );
}
