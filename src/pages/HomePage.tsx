import React from "react";
// import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Button from "../components/Buttons";
import useRedirectAuthenticated from "../hooks/useRedirectAuthenticated";
import logo from "../assets/jsh_logo.png";

const HomePage = () => {
  const navigate = useNavigate();

  // If user already has token, redirect to dashboard --> created custom hook
  useRedirectAuthenticated();

  return (
    <div className="p-10 space-y-4 max-w-full text-center">
      <div>
        <img
          src={logo}
          alt="Job Search Helper Logo"
          className="h-20 w-auto"
        />
      </div>
      <h1>
        Welcome to the Job Search Helper
      </h1>
      <h2>
        Compare roles. Discover your perfect fit!
      </h2>
      <div className="flex justify-center space-x-8">
        <Button onClick={() => navigate("/login")}>Login</Button>
        <Button onClick={() => navigate("/signup")}>Sign Up</Button>
      </div>
    </div>
  );
};

export default HomePage;
