import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    const logoutHandler = (e) => {
        e.preventDefault();
        let logout = window.confirm('yakin ingin keluar ?');
        if (logout) {
            localStorage.removeItem('token');
            navigate('/');
            return;
        }
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container mx-auto">
                <a className="navbar-brand" href="/dashboard">Hello, Irfan ramdan</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link" href="/">Home</a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link" href="/">About</a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link" href="/">Pricing</a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link" href="/">Contact</a>
                        </li>
                    </ul>
                </div>

                <button type="submit" onClick={logoutHandler} className="btn btn-outline-light">Logout</button>
            </div>
        </nav>
    );
};

export default Navbar;