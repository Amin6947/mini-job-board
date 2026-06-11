import { BrowserRouter, Routes, Route } from 'react-router-dom';
import JobList from './pages/JobList';
import JobDetail from './pages/JobDetail';
import PostJob from './pages/PostJob';
import Navbar from './components/Navbar';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<JobList />} />
          <Route path="/jobs/:id" element={<JobDetail />} />
          <Route path="/post" element={<PostJob />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
