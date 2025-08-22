import React, { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Button from "../components/Buttons";
// import axios from "axios";

const HomePage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="p-10 space-y-4 max-w-full text-center">
      <Header />
      <h1 className="text-primary text-4xl font-bold">
        Welcome to the Job Search Helper
      </h1>
      <p className="text-primary text-lg font-semibold">
        Compare roles. Discover your perfect fit!
      </p>
      <div className="flex justify-center space-x-8">
        <Button onClick={() => navigate("/login")}>Login</Button>
        <Button onClick={() => navigate("/signup")}>Sign Up</Button>
      </div>
    </div>
  );
};

export default HomePage;
