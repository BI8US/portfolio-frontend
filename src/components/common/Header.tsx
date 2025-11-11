import React, { useState, useEffect } from "react";
import {Link, useNavigate} from "react-router-dom";
import { getToken, removeToken } from "../../utils/auth";

const Header: React.FC = () => {
    const navigate = useNavigate();
    const token = getToken();

    const handleLogout = () => {
        removeToken();
        navigate("/resume/active");
    };

    const [isDark, setIsDark] = useState(() => {
        if (localStorage.theme === 'dark') {
            return true;
        }
        return (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    });

    useEffect(() => {
        const root = window.document.documentElement;
        if (isDark) {
            root.classList.add('dark');
            localStorage.theme = 'dark';
        } else {
            root.classList.remove('dark');
            localStorage.theme = 'light';
        }
    }, [isDark]);

    const toggleTheme = () => {
        setIsDark(!isDark);
    };

    return (
        <header className="bg-content text-text-primary p-4 flex justify-between items-center border-b border-border">
            <h1 className="text-xl font-bold">
                <Link to="/resume/active" className="text-text-primary hover:text-text-accent transition-colors">
                    Alexander Smirnov
                </Link>
            </h1>
            <nav className="flex space-x-4 text-text-secondary items-center">
                {token ? (
                    <>
                        <Link to="/resumes" className="hover:text-text-accent transition-colors">
                            Resume List
                        </Link>
                        <Link to="/jobapplications" className="hover:text-text-accent transition-colors">
                            Job Applications
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="hover:text-text-accent transition-colors"
                        >
                            Log out
                        </button>
                    </>
                ) : (
                    <Link to="/login" className="hover:text-text-accent transition-colors">
                        Login
                    </Link>
                )}
                <button
                    onClick={toggleTheme}
                    type="button"
                    className="flex items-center hover:text-text-accent transition-colors"
                    aria-label="Toggle theme"
                >
                    {isDark ? (
                        <span className="material-symbols-outlined">light_mode</span>
                    ) : (
                        <span className="material-symbols-outlined">dark_mode</span>
                    )}
                </button>
            </nav>
        </header>
    );
};

export default Header;