import React from "react";
import Header from "../components/Header";
import LoginForm from "../forms/LoginForm";
import useRedirectAuthenticated from "../hooks/useRedirectAuthenticated";

export default function LoginPage() {
  useRedirectAuthenticated();
  return (
    <div className="p-10 space-y-4 max-w-full text-center">
      <Header />
      <h1 className="text-primary text-4xl font-bold">Login Page</h1>
      <LoginForm />
    </div>
  );
}
