import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="navbar-brand">Mini Job Board</Link>
        <Link to="/post" className="btn btn-primary">Post a Job</Link>
      </div>
    </nav>
  );
}

export default Navbar;
