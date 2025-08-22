import React from "react";
import logo from "../assets/jsh_logo.png";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="flex items-center pl-10 pb-10 select-none cursor-default">
      <Link to="/">
        <img src={logo} alt="Job Search Helper Logo" className="h-20 w-auto" />
      </Link>
    </header>
  );
}
