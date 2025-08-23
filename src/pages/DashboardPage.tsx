import React, { useState, useEffect, use } from "react";
import Header from "../components/Header";
import { useAuth } from "../hooks/useAuth";
import { Navigate, useNavigate } from "react-router-dom";

const DashboardPage = () => {
  const { user, isAuthenticated, ready } = useAuth();
  const navigate = useNavigate();

  // Only authenticated users can access this page
  useEffect(() => {
    if (ready && !isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate, ready ]);

  if (!ready || (isAuthenticated && user === null)) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="p-10 space-y-4 max-w-full text-center">
      <Header />
      <h1 className="text-primary text-4xl font-bold">Dashboard</h1>
      <p className="text-primary text-lg font-semibold">
        Hi, { user?.username }! View and manage your job research here.
      </p>
    </div>
  );
};

export default DashboardPage;
