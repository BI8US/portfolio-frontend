import React from "react";
import "../styles/Header.css";

const Header: React.FC = () => {
    return (
        <header className="header">
            <h1>My resume</h1>
    <nav>
    <a href="/resumes">Resume List</a>
        <a href="/resume/active">Resume</a>
        </nav>
        </header>
);
};

export default Header;
