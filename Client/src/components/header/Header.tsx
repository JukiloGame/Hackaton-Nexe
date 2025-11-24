import React from "react";

export default function Header() {
  return (
    <header className="w-full font-sans">

      {/* Top bar azul */}
      <div className="w-full bg-[#004B73] text-white flex justify-between items-center px-8 py-3 text-sm">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-lg">📞</span>
            <span>93 285 32 40</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-lg">✉️</span>
            <span>moute@nexefundacio.org</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="bg-black text-orange-500 px-4 py-2 rounded-xl font-semibold hover:opacity-90 transition">
            REGALS SOLIDARIS
          </button>

          <button className="bg-white text-[#004B73] px-4 py-2 rounded-xl font-semibold hover:bg-gray-100 transition">
            Contacte
          </button>

          <button className="bg-orange-500 text-white px-4 py-2 rounded-xl font-semibold hover:bg-orange-600 transition">
            Dona
          </button>

        </div>
      </div>

      {/* Barra blanca */}
      <nav className="w-full bg-white flex items-center justify-between px-12 py-4 text-[#004B73] font-medium shadow-sm">
        
        <img src="/logo.png" alt="Nexe" className="h-12" />

        <ul className="flex items-center gap-10 text-lg">
          <li className="hover:text-orange-500 cursor-pointer">Què és la pluridiscapacitat</li>

          <li className="flex items-center gap-1 hover:text-orange-500 cursor-pointer">
            Fundació <span>▼</span>
          </li>

          <li className="flex items-center gap-1 hover:text-orange-500 cursor-pointer">
            Serveis <span>▼</span>
          </li>

          <li className="hover:text-orange-500 cursor-pointer">Centres</li>
          <li className="hover:text-orange-500 cursor-pointer">Beques</li>
          <li className="hover:text-orange-500 cursor-pointer">Actualitat</li>
          <li className="hover:text-orange-500 cursor-pointer">Col·labora</li>

          <li className="bg-[#B5CCD9] px-4 py-1 rounded-md flex items-center gap-1 hover:bg-[#A1BDCC] transition cursor-pointer">
            CA <span>▼</span>
          </li>
        </ul>

        <div className="relative cursor-pointer">
          <span className="text-3xl text-[#004B73]">🛒</span>
          <span className="absolute -top-1 -right-2 bg-orange-500 text-white text-xs rounded-full px-2 py-0.5 font-semibold">
            0
          </span>
        </div>

      </nav>

    </header>
  );
}
