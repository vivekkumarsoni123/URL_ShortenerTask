import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <h1>🔗 URL Shortener</h1>
        </Link>
        <nav className="nav">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/admin" className="nav-link">Admin</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
