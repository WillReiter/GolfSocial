import router from "next/router";
import React from "react";

const Header: React.FC = () => {
    return (
        <header className="w-full bg-gray shadow-md px-6 py-3 flex items-center relative">
            {/* Left: Logo Placeholder */}
            <div className="flex items-center">
                <div className="w-24 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 font-bold hover:cursor-pointer hover:text-green-600" onClick={() => router.push("/")}>
                    Birdogie
                </div>
            </div>

            {/* Middle: Searchbar Centered Absolutely */}
            <div className="dark:absolute left-1/2 transform -translate-x-1/2 w-1/4">
                <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        {/* Search Icon (Heroicons or SVG) */}
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <circle cx="11" cy="11" r="7" />
                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                    </span>
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>

            {/* Right: Login/Signup Buttons */}
            <div className="flex items-center space-x-4 ml-auto">
                <button className="px-4 py-2 text-blue-600 font-semibold rounded hover:bg-blue-50 transition">
                    Login
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition">
                    Sign Up
                </button>
            </div>
        </header>
    );
};

export default Header;