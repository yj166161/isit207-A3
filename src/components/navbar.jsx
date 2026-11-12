import { useState } from "react";
import { Link } from 'react-router-dom';
import './navbar.css';

const Navbar = ({ isLoggedIn, onLogout }) => {

    const [dropdownOpen, setDropdownOpen] = useState(false);
  return (
    <nav className="navbar">
      <Link to="/" className="logo"><img src="images/logo.png" ></img></Link>
      <ul>
       

    
        <li className="dropdown" onMouseEnter={() => setDropdownOpen(true)} onMouseLeave={() => setDropdownOpen(false)}>
        <button className="dropdown-toggle" onClick={() => setDropdownOpen(!dropdownOpen)}>
            Services ▾
        </button>

        {dropdownOpen && (
            <ul className="dropdown-menu">
            <li>
                <Link to="/adopt" onClick={() => setDropdownOpen(false)}>
                Adopt
                </Link>
            </li>
            <li>
                <Link to="/release" onClick={() => setDropdownOpen(false)}>
                Release
                </Link>
            </li>
            </ul>
        )}
        </li>


        <li><Link to="/gallery">Gallery</Link></li>
        <li><Link to="/petcare">Pet Care</Link></li>
        <li><Link to="/aboutus">About Us</Link></li>
        <li><a href="#contact">Contact Us</a></li>
        
        {!isLoggedIn ? (
            <li>
                <Link to="/login" className="account-button">
                Login / Sign Up
                </Link>
            </li>
            ) : (
            <>
                <li>
                <Link to="/my-applications">
                    My Applications
                </Link>
                </li>

                <li>
                <button onClick={onLogout} className="logout-button">
                    Logout
                </button>
                </li>
            </>
            )}
      </ul>
    </nav>
  );
};

export default Navbar;
