import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>Entertainment Agency</h1>
      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/entertainers">Entertainers</Link>
        </li>
        <li>
          <Link to="/add">Add New</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
