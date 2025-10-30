import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoMdSearch } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";
import { MdOutlineShoppingCart } from "react-icons/md";
import { HiX } from "react-icons/hi";
import { HiMenu } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
const firstLink = [
  { name: "Sell on Ecom", href: "/" },
  { name: "Register", href: "/" },
];
function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/cart");
  };
  return (
    <header className="w-full bg-gray-100 text-gray-600 shadow-sm px-4 md:px-5">
      <div className="flex justify-between items-center py-2">
        <div className="flex items-center gap-4">
          {/* Logo */}
          <div className="flex items-center gap-1">
            <img
              src="../src/assets/ecom-logo.png"
              alt="Logo"
              width={45}
              className="block"
            />
            <span className="text-black text-2xl font-bold">Ecom</span>
          </div>

          {/* Nav Links */}
          <nav className="hidden md:flex gap-3 text-gray-700">
            {firstLink.map((link, ind) => (
              <span key={ind} className="cursor-pointer hover:text-violet-700">
                {link.name}
              </span>
            ))}
          </nav>

          {/* Search Bar  */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-xl shadow-lg w-72 bg-white">
            <IoMdSearch className="text-gray-600" />
            <input
              type="text"
              placeholder="Search..."
              className="flex-1 outline-none border-none bg-transparent text-gray-700"
            />
            <IoCloseSharp className="text-violet-700 cursor-pointer" />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex gap-4 text-violet-700">
            <button className="px-5 py-1 border border-violet-700 rounded-lg hover:bg-violet-700 hover:text-white transition">
              Sign In
            </button>
            <button
              onClick={handleRedirect}
              className="flex items-center gap-2 px-5 py-1 bg-white rounded-lg hover:bg-gray-800 hover:text-white transition shadow-md"
            >
              <MdOutlineShoppingCart className="text-lg" />
              <span>Cart</span>
            </button>
          </div>

          {/* Hamburger Menu */}
          <button
            className="md:hidden text-3xl text-violet-700"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="flex flex-col items-start gap-3 px-6 py-4 bg-white border-t border-gray-200 md:hidden shadow-inner">
          {firstLink.map((link, ind) => (
            <span
              key={ind}
              className="text-gray-800 text-lg hover:text-violet-700 cursor-pointer"
            >
              {link.name}
            </span>
          ))}

          <div className="flex flex-col w-full gap-3 mt-3 text-violet-700">
            <button className="w-full px-5 py-2 border border-violet-700 rounded-lg hover:bg-violet-700 hover:text-white transition">
              Sign In
            </button>
            <button className="flex justify-center items-center gap-2 w-full px-5 py-2 bg-white rounded-lg hover:bg-gray-800 hover:text-white transition shadow-md">
              <MdOutlineShoppingCart className="text-lg" />
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Nav;
