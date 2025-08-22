import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import LoginForm from "../forms/LoginForm";

export default function LoginPage() {
  return (
    <div className="p-10 space-y-4 max-w-full text-center">
      <Header />
      <h1 className="text-primary text-4xl font-bold">Login Page</h1>
      <LoginForm />
    </div>
  );
}
