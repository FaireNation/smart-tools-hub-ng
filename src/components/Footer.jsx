import { FiPhone, FiMail, FiMapPin } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import config from '../config/site';

export default function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <h3>
              SmartToolsHub<span className="logo-ng">Ng</span>
            </h3>
            <p>{config.tagline}</p>
          </div>

          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#products">Products</a></li>
              <li><a href="#features">Why Us</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          <div className="footer-contact">
            <h4>Contact Us</h4>
            <ul>
              <li><FiPhone /> {config.phone}</li>
              <li><FiMail /> {config.email}</li>
              <li><FiMapPin /> {config.address}</li>
            </ul>
          </div>

          <div className="footer-newsletter">
            <h4>Got Questions?</h4>
            <p>Reach out to us on WhatsApp for quick response and support.</p>
            <a href={`https://wa.me/${config.whatsappNumber}`} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
              <FaWhatsapp /> Chat on WhatsApp
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} {config.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
