import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../api/auth';
import { useAuth } from '../context/AuthContext';

function Register() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'seeker' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const { token, user } = await registerUser(form);
      login(token, user);
      navigate('/', { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Create account</h1>
        <p className="auth-subtitle">Join JobBoard today</p>

        {error && <p className="auth-error">{error}</p>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              id="name" name="name" type="text"
              value={form.name} onChange={handleChange}
              placeholder="John Doe" required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email" name="email" type="email"
              value={form.email} onChange={handleChange}
              placeholder="you@example.com" required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password" name="password" type="password"
              value={form.password} onChange={handleChange}
              placeholder="At least 6 characters" required
            />
          </div>
          <div className="form-group">
            <label>I am a...</label>
            <div className="role-select">
              {[
                { value: 'seeker', label: '🔍 Job Seeker', desc: 'Looking for a job' },
                { value: 'employer', label: '🏢 Employer', desc: 'Hiring talent' },
              ].map(r => (
                <label
                  key={r.value}
                  className={`role-option${form.role === r.value ? ' selected' : ''}`}
                >
                  <input
                    type="radio" name="role" value={r.value}
                    checked={form.role === r.value}
                    onChange={handleChange}
                  />
                  <span className="role-label">{r.label}</span>
                  <span className="role-desc">{r.desc}</span>
                </label>
              ))}
            </div>
          </div>
          <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <p className="auth-footer">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
