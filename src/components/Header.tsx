import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { getToken, removeToken } from "../utils/auth";

const Header: React.FC = () => {
    const navigate = useNavigate();
    const token = getToken();

    const handleLogout = () => {
        removeToken();
        navigate("/resume/active");
    };

    return (
        <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
            <h1 className="text-xl font-bold">
                <Link to="/resume/active" className="text-white hover:text-gray-300 transition-colors">
                    Resume
                </Link>
            </h1>
            <nav className="flex space-x-4">
                {token ? (
                    <>
                        <Link to="/resumes" className="hover:text-gray-300 transition-colors">
                            Resume List
                        </Link>
                        <Link to="/jobapplications" className="hover:text-gray-300 transition-colors">
                            Job Applications
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="hover:text-gray-300 transition-colors"
                        >
                            Log out
                        </button>
                    </>
                ) : (
                    <Link to="/login" className="hover:text-gray-300 transition-colors">
                        Login
                    </Link>
                )}
            </nav>
        </header>
    );
};

export default Header;