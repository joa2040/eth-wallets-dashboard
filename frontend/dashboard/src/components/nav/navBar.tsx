import React from 'react';

import MainNav from './mainNav';
import AuthNav from '../auht/authNav';

const NavBar = () => {
    return (
        <div className="nav-container mb-3">
            <nav className="navbar navbar-expand-md navbar-light bg-light">
                <div className="container">
                    <MainNav />
                    <AuthNav />
                </div>
            </nav>
        </div>
    );
};

export default NavBar;
