"use client";

import { useState } from "react";
import { IoMdMenu } from "react-icons/io";

export const Menu = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-slate-800 w-full h-24 flex items-center px-4 lg:px-16 relative z-10">
      <div className="flex justify-between items-center w-full">
        <div className="text-white text-2xl font-bold">Loja Virtual</div>

        <div className="hidden lg:flex items-center bg-white rounded-md overflow-hidden w-1/3">
          <input
            type="text"
            placeholder="Buscar produtos..."
            className="w-full px-4 py-2 text-gray-700 outline-none"
          />
          <button className="bg-red-400 px-4 py-2 text-white">Buscar</button>
        </div>

        <div className="hidden lg:flex items-center gap-6 text-white">
          <button className="hover:text-red-400">Login</button>
        </div>

        <button
          className="lg:hidden text-white text-2xl"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <IoMdMenu />
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="absolute top-24 left-0 w-full bg-slate-800 text-white flex flex-col items-center gap-4 py-4 lg:hidden">
          <button className="hover:text-red-400">Login</button>
          <div className="flex items-center bg-white rounded-md overflow-hidden w-4/5">
            <input
              type="text"
              placeholder="Buscar produtos..."
              className="w-full px-4 py-2 text-gray-700 outline-none"
            />
            <button className="bg-red-400 px-4 py-2 text-white">Buscar</button>
          </div>
        </div>
      )}
    </header>
  );
};
