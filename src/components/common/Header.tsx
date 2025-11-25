import React, { useState, useEffect } from "react";
import {Link, useNavigate} from "react-router-dom";
import { getToken, removeToken } from "../../utils/auth";
import {ConfirmationModal} from "./ConfirmationModal";

const Header: React.FC = () => {
    const navigate = useNavigate();
    const token = getToken();

    const [isLogoutModalOpen, setIsLogoutModalOpen] = React.useState(false);

    const handleLogout = () => {
        setIsLogoutModalOpen(true);
    };

    const handleConfirmLogout = () => {
        setIsLogoutModalOpen(false);
        removeToken();
        navigate("/resume/active");
    }

    const handleCancelLogout = () => {
        setIsLogoutModalOpen(false);
    }

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

    const navButtonClasses =
        "flex items-center gap-2 " +
        "px-1 py-1 md:px-3 md:py-1 " +
        "rounded-3xl font-semibold " +
        "bg-content " +
        "border border-transparent " +
        "text-text-secondary " +
        "hover:text-content " +
        "hover:bg-button-secondary " +
        "active:text-content active:bg-button-secondary " +
        "transition-colors duration-200";
    return (
        <header className="bg-content text-text-primary p-4 flex justify-between items-center border-b border-border">
            <Link to="/resume/active" className={navButtonClasses}>
                <span className="material-symbols-outlined text-2xl">home</span>
                <span className="hidden md:inline font-bold">Resume</span>
            </Link>
            <nav className="flex space-x-4 items-center">
                {token ? (
                    <>
                        <Link to="/games/snake" className={navButtonClasses}>
                            <span className="material-symbols-outlined text-2xl">sports_esports</span>
                            <span className="hidden md:inline">Snake game</span>
                        </Link>

                        <Link to="/resumes" className={navButtonClasses}>
                            <span className="material-symbols-outlined text-2xl">article_person</span>
                            <span className="hidden md:inline">Resume List</span>
                        </Link>

                        <Link to="/jobapplications" className={navButtonClasses}>
                            <span className="material-symbols-outlined text-2xl">cases</span>
                            <span className="hidden md:inline">Job Applications</span>
                        </Link>

                        <button
                            onClick={handleLogout}
                            className={navButtonClasses}
                        >
                            <span className="material-symbols-outlined text-2xl">move_item</span>
                            <span className="hidden md:inline">Log Out</span>
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/games/snake" className={navButtonClasses}>
                            <span className="material-symbols-outlined text-2xl">sports_esports</span>
                            <span className="hidden md:inline">Snake game</span>
                        </Link>
                        <Link to="/login" className={navButtonClasses}>
                            <span className="material-symbols-outlined text-2xl">person</span>
                            <span className="hidden md:inline">Login</span>
                        </Link>
                    </>
                )}
                <button
                    onClick={toggleTheme}
                    type="button"
                    className={navButtonClasses}
                    aria-label="Toggle theme"
                >
                    {isDark ? (
                        <span className="material-symbols-outlined text-2xl">light_mode</span>
                    ) : (
                        <span className="material-symbols-outlined text-2xl">dark_mode</span>
                    )}
                    <span className="hidden md:inline">Change Theme</span>
                </button>
            </nav>
            <ConfirmationModal
                isOpen={isLogoutModalOpen}
                title="Log Out"
                message="Are you sure you want to log out?"
                onCancel={handleCancelLogout}
                onConfirm={handleConfirmLogout}
            />
        </header>
    );
};

export default Header;