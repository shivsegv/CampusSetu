import React from "react";
import { Link } from "react-router-dom";
import Button from "./Button";

const Navbar = ({ userRole }) => {
  return (
    <nav className="container mx-auto px-6 py-6 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white font-bold">
          C
        </div>
        <span className="font-semibold text-lg">campus</span>
      </Link>
      <div className="flex items-center gap-4">
        <Link to="/features" className="text-muted hidden md:inline">
          Features
        </Link>
        <Link to="/approach" className="text-muted hidden md:inline">
          Our Approach
        </Link>
        {userRole && (
          <Link to={`/${userRole}`} className="hidden md:inline text-muted">
            Dashboard
          </Link>
        )}
        <Button variant="ghost" className="ml-2 hidden md:inline">
          Try Beta
        </Button>
        <Link to="/auth">
          <Button variant="primary" className="ml-2">
            Get Started
          </Button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
