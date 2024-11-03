import Link from "next/link";
import React from "react";

const Header: React.FC = () => {
    return (
        <header className="bg-gray-800 text-white shadow-lg">
            <div className="container mx-auto flex items-center justify-between px-6 py-4">
                <div className="text-2xl font-semibold text-yellow-400">
                    <Link href="/">Music App</Link>
                </div>
                <nav className="space-x-6">
                    <Link href="/" className="text-lg text-gray-300 hover:text-yellow-400 transition duration-200">
                        Home
                    </Link>
                    <Link href="/playlists" className="text-lg text-gray-300 hover:text-yellow-400 transition duration-200">
                        Playlists
                    </Link>
                    <Link href="/songs" className="text-lg text-gray-300 hover:text-yellow-400 transition duration-200">
                        Songs
                    </Link>
                    {/* <Link href="/login" className="text-lg text-gray-300 hover:text-yellow-400 transition duration-200">
                        Login
                    </Link> */}
                </nav>
            </div>
        </header>
    );
};

export default Header;
