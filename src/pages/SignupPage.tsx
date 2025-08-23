import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import useRedirectAuthenticated from "../hooks/useRedirectAuthenticated";
import SignupForm from "../forms/SignupForm";

export default function SignupPage() {
  useRedirectAuthenticated();
  return (
    <div className="p-10 space-y-4 max-w-full text-center">
      <Header />
      <h1 className="text-primary text-4xl font-bold">Sign Up Page</h1>
      <p className="text-primary text-lg font-semibold">
        Create an account to get started!
      </p>
      <SignupForm />
    </div>
  );
}
