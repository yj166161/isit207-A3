
import { Link } from 'react-router-dom';
import './footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Branding */}
        <div className="footer-brand">
          <h2>PetHeaven</h2>
          <p>
            Helping pets find loving homes, one paw at a time.
            Because every pet deserves a second chance.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-links">
          <h3>Quick Links</h3>
          <Link to="/">Home</Link>
          <Link to="/gallery">Gallery</Link>
          <Link to="/petcare">Pet Care</Link>
          <Link to="/aboutus">About Us</Link>
        </div>

        {/* Services */}
        <div className="footer-links">
          <h3>Our Services</h3>
          <Link to="/adopt">Adopt a Pet</Link>
          <Link to="/release">Release a Pet</Link>
        </div>

        {/* Contact */}
        <div className="footer-contact" id="contact">
          <h3>Contact Us</h3>
          <p>Tel: 61234567</p>
          <p>Email: hello@petheaven.com</p>
          <p>Address: 50 Sungei Tengah Rd, Singapore 699012</p>
        </div>

      </div>

      
      <div className="footer-bottom">
        <p>© 2026 PetHeaven. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
