'use client'; 
import { useState } from 'react';
import { Sun, Moon } from 'lucide-react'; // Import Lucide icons
import Link from 'next/link';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <nav className={`p-2 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-50 text-black'}`}>
      <div className="max-w-screen-xl mx-auto flex items-center justify-between">
        <div className="text-2xl font-bold">
          <a href="#">Build<span className='text-blue-600'>ify</span></a>
        </div>
        {/* Desktop Navigation Links */}
        <div className="hidden md:flex space-x-4">
          <Link href="/agency" className="hover:bg-gray-200 pt-2 pb-2 pl-4 pr-4 rounded">Login </Link>

          {/* <a href="#services" className="hover:bg-gray-200 pt-2 pb-2 pl-4 pr-4 rounded">Login</a> */}
          <div className='p-2 pr-6'>
          <a href="#about" className="hover:bg-gray-200 pt-2 pb-2 pl-4 pr-4 rounded">Clerk</a>
          </div>
          
          {/* Theme Toggle Button with Lucide Icon (No Text) */}
          <button
            onClick={toggleTheme}
            className={`flex items-center p-2 rounded hover:bg-gray-200 
              ${isDarkMode ? 'border-gray-400' : 'border-gray-200'} border-2`}
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />} {/* Conditional Icon */}
          </button>
        </div>

        {/* Mobile Hamburger Menu */}
        <div className="md:hidden flex items-center" onClick={toggleMenu}>
          <button className="text-gray-400">
            <span className="text-2xl">&#9776;</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'} p-4 space-y-4`}
      >
        <a href="#services" className="block hover:bg-gray-200 p-2 rounded">Login</a>
        <a href="#about" className="block hover:bg-gray-200 p-2 rounded">Clerk</a>
        
        {/* Mobile Theme Toggle with Lucide Icon (No Text) */}
        <button
          onClick={toggleTheme}
          className={`block hover:bg-gray-700 p-2 rounded 
            ${isDarkMode ? 'border-white' : 'border-black'} border-2`}
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />} {/* Conditional Icon */}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
