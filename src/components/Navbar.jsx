import { useState } from 'react';
import { FiMenu, FiX, FiPhone, FiMail, FiSearch } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import config from '../config/site';

export default function Navbar({ onSearchOpen }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Top bar */}
      <div className="topbar">
        <div className="container topbar-inner">
          <div className="topbar-left">
            <span><FiPhone /> {config.phone}</span>
            <span><FiMail /> {config.email}</span>
          </div>
          <div className="topbar-right">
            <span>Quality tested &amp; warranty backed products</span>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <nav className="navbar">
        <div className="container navbar-inner">
          <a href="#" className="logo">
            <span className="logo-icon">⚡</span>
            SmartToolsHub<span className="logo-ng">Ng</span>
          </a>

          <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
            <li><a href="#home" onClick={() => setMenuOpen(false)}>Home</a></li>
            <li><a href="#products" onClick={() => setMenuOpen(false)}>Products</a></li>
            <li><a href="#features" onClick={() => setMenuOpen(false)}>Why Us</a></li>
            <li><a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a></li>
          </ul>

          <div className="nav-actions">
            <button className="nav-search-btn" onClick={onSearchOpen} title="Search products">
              <FiSearch />
            </button>
            <a href={`https://wa.me/${config.whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm nav-whatsapp">
              <FaWhatsapp /> Chat Us
            </a>
            <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
