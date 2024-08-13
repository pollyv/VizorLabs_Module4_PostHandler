import React from 'react';

import './Header.css';

function Header() {
    return (
        <header className="header">
            <h1 className="header__title">PostHandler</h1>
            <h2 className="header__subtitle">Manage Your Posts</h2>
            <p className="header__text">
                Create and edit your posts easily and quickly with our simple and elegant app :)
            </p>
        </header>
    );
}

export default Header;
