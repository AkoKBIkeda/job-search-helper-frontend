import React from "react";
import logo from "../assets/jsh_logo.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

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

  return (
    <header className="flex items-center pl-10 pb-10 select-none cursor-default">
      <img
        src={logo}
        alt="Job Search Helper Logo"
        className="h-20 w-auto"
        onClick={handleClick}
      />
    </header>
  );
}
