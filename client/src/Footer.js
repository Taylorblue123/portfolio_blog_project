import { Link } from "react-router-dom";

export default function Footer() {

  return (

        <footer className="footer">
        <div className="footer-wrapper">
          <div className="footer-links">
            <ul>
              <li><Link to="#">About</Link></li>
              <li><Link to="#">Doing</Link></li>
              <li><Link to="#">Work</Link></li>
              <li><Link to="#">Projects</Link></li>
              <li><Link to="#">Contacts</Link></li>
            </ul>
          </div>
          <div className="footer-legal">
            <p>© 2024 Wenxuan Wu</p>
          </div>
        </div>
        </footer>
  );
}