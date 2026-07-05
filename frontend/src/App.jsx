import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import JobList from './pages/JobList';
import JobDetail from './pages/JobDetail';
import PostJob from './pages/PostJob';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  function toggleTheme() {
    setTheme(t => (t === 'light' ? 'dark' : 'light'));
  }

  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar theme={theme} toggleTheme={toggleTheme} />
        <main className="container">
          <Routes>
            <Route path="/" element={<JobList />} />
            <Route path="/jobs/:id" element={<JobDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/post"
              element={
                <ProtectedRoute roles={['employer', 'admin']}>
                  <PostJob />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
