import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar({ theme, toggleTheme }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/');
  }

  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="navbar-brand">
          <span className="brand-icon">💼</span> JobBoard
        </Link>
        <div className="navbar-actions">
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
          {user ? (
            <div className="user-menu">
              <span className="user-name">
                <span className={`role-badge role-${user.role}`}>{user.role}</span>
                {user.name}
              </span>
              {user.role === 'employer' && (
                <Link to="/post" className="btn btn-primary">+ Post a Job</Link>
              )}
              <button className="btn btn-ghost" onClick={handleLogout}>Sign Out</button>
            </div>
          ) : (
            <div className="user-menu">
              <Link to="/login" className="btn btn-ghost">Sign In</Link>
              <Link to="/register" className="btn btn-primary">Get Started</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
