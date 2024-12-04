import React, { useState } from "react";
import {
  Menu,
  X,
  ChevronDown,
  Bell,
  User,
  Search,
  DollarSign,
} from "lucide-react";
import SignUp from "../pages/SignUp";
import SignIn from "../pages/SignIn";
import CashoutButton from "./ui/CashoutButton";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState("");
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);

  const navigation = {
    "Find Jobs": [
      { name: "Browse All Jobs", href: "#" },
      { name: "Remote Jobs", href: "#" },
      { name: "Featured Jobs", href: "#" },
      { name: "Tech Jobs", href: "#" },
      { name: "Marketing Jobs", href: "#" },
    ],
    "For Employers": [
      { name: "Post a Job", href: "#" },
      { name: "Browse Candidates", href: "#" },
      { name: "Pricing Plans", href: "#" },
      { name: "Recruitment Solutions", href: "#" },
    ],
    Resources: [
      { name: "Career Blog", href: "#" },
      { name: "Job Search Guide", href: "#" },
      { name: "Resume Templates", href: "#" },
      { name: "Career Advice", href: "#" },
    ],
  };

  const DropdownContent = ({ items }) => (
    <div className="absolute top-full left-0 w-56 mt-2 bg-white rounded-lg shadow-lg py-2">
      {items.map((item) => (
        <a
          key={item.name}
          href={item.href}
          className="block px-4 py-2 text-gray-700 hover:bg-gray-50">
          {item.name}
        </a>
      ))}
    </div>
  );

  const handleSignInClick = () => {
    setIsSignInOpen(true);
    setIsSignUpOpen(false);
  };

  const handleSignUpClick = () => {
    setIsSignUpOpen(true);
    setIsSignInOpen(false);
  };

  return (
    <>
      <header className="bg-white shadow-sm fixed w-full top-0 z-40">
        {/* Top Bar */}
        <div className="bg-blue-600">
          <div className="max-w-7xl mx-auto px-4 h-10 flex items-center justify-between text-white">
            <div className="flex items-center space-x-4 text-sm">
              <a href="#" className="hover:text-blue-100">
                Download App (coming soon)
              </a>
              <a href="#" className="hover:text-blue-100">
                Support
              </a>
            </div>
            <div className="flex items-center space-x-4 text-sm">
              <a href="#" className="hover:text-blue-100">
                For Employers
              </a>
              <span>|</span>
              <button
                onClick={handleSignInClick}
                className="hover:text-blue-100">
                Sign In
              </button>
              <span>|</span>
              <button
                onClick={handleSignUpClick}
                className="hover:text-blue-100">
                Sign Up
              </button>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <a href="#" className="text-2xl font-bold text-blue-600">
                My Remote Job
              </a>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {Object.entries(navigation).map(([category, items]) => (
                <div
                  key={category}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(category)}
                  onMouseLeave={() => setOpenDropdown("")}>
                  <button className="flex items-center space-x-1 text-gray-600 hover:text-blue-600">
                    <span>{category}</span>
                    <ChevronDown size={16} />
                  </button>
                  {openDropdown === category && (
                    <DropdownContent items={items} />
                  )}
                </div>
              ))}
            </nav>

            {/* Right Side Actions */}
            <div className="hidden md:flex items-center space-x-6">
              <button className="text-gray-600 hover:text-blue-600">
                <Bell size={20} />
              </button>
              <button className="text-gray-600 hover:text-blue-600">
                <User size={20} />
              </button>
              <CashoutButton />
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden text-gray-600"
              onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-4 py-2 space-y-1">
              {Object.entries(navigation).map(([category, items]) => (
                <div key={category} className="py-2">
                  <button
                    className="flex items-center justify-between w-full text-gray-600"
                    onClick={() =>
                      setOpenDropdown(openDropdown === category ? "" : category)
                    }>
                    <span>{category}</span>
                    <ChevronDown
                      size={16}
                      className={`transform transition-transform ${
                        openDropdown === category ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openDropdown === category && (
                    <div className="mt-2 pl-4 space-y-2">
                      {items.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className="block text-gray-500 hover:text-blue-600">
                          {item.name}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-4 border-t">
                <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Post a Job
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Sign Up and Sign In Modals */}
      <SignUp
        isOpen={isSignUpOpen}
        onClose={() => setIsSignUpOpen(false)}
        onSignInClick={handleSignInClick}
      />
      <SignIn
        isOpen={isSignInOpen}
        onClose={() => setIsSignInOpen(false)}
        onSignUpClick={handleSignUpClick}
      />
    </>
  );
};

export default Header;
