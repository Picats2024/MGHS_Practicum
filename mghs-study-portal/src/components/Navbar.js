import React, {useState} from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {

    const [isOpen, setIsOpen] = useState(false); // Toggle sidebar

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const handleLinkClick = () => {
        setIsOpen(false); // Close sidebar when a link is clicked
    };

return (
    <nav className='navbar'>
        <div className="navbar-header">
            <button className="nav-toggle" onClick={toggleSidebar}>
                ☰ {/* Hamburger icon */}
            </button>
            {/* add mghs logo */}
            <h3>MGHS Study Portal</h3>
        </div>
        <ul className={`nav-list ${isOpen ? 'open' : ''}`}>
            <li><Link to="/" onClick={handleLinkClick}>Dashboard</Link></li> 
            <li><Link to="/tasks" onClick={handleLinkClick}>Tasks</Link></li>
            <li><Link to="/reflections" onClick={handleLinkClick}>Reflections</Link></li>
            <li><Link to="/profile" onClick={handleLinkClick}>Profile</Link></li>
            {/* add logout logic */}
            <li><Link to="/" onClick={handleLinkClick}>Logout</Link></li>
            <li>
                <Link to="/" onClick={handleLinkClick}>
                    <img src=".\src\assets\icons\notification-bell.svg" alt="Notifications" />
                </Link>
            </li>
        </ul>
    </nav>
);
};


export default Navbar;
