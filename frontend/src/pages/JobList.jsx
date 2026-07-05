import { useEffect, useState, useMemo } from 'react';
import { fetchJobs } from '../api/jobs';
import JobCard from '../components/JobCard';

const JOB_TYPES = ['all', 'full-time', 'part-time', 'contract', 'internship'];

function JobList() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');

  useEffect(() => {
    fetchJobs()
      .then(setJobs)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    return jobs.filter(job => {
      const q = search.toLowerCase();
      const matchesSearch =
        q === '' ||
        job.title.toLowerCase().includes(q) ||
        job.company.toLowerCase().includes(q) ||
        job.location.toLowerCase().includes(q);
      const matchesType = typeFilter === 'all' || job.type === typeFilter;
      return matchesSearch && matchesType;
    });
  }, [jobs, search, typeFilter]);

  if (loading) return <p className="status-text">Loading jobs...</p>;
  if (error) return <p className="status-text error">{error}</p>;

  return (
    <div>
      <div className="page-header">
        <h1>Find Your Next Job</h1>
        <p>{filtered.length} position{filtered.length !== 1 ? 's' : ''} found</p>
      </div>

      <div className="search-bar">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          placeholder="Search by title, company, or location..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="search-input"
        />
        {search && (
          <button className="search-clear" onClick={() => setSearch('')}>✕</button>
        )}
      </div>

      <div className="filter-bar">
        {JOB_TYPES.map(type => (
          <button
            key={type}
            className={`filter-btn${typeFilter === type ? ' active' : ''}`}
            onClick={() => setTypeFilter(type)}
          >
            {type === 'all' ? 'All Types' : type.replace('-', '‑')}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">
          <p>No jobs found matching your search.</p>
          <button className="btn btn-ghost" onClick={() => { setSearch(''); setTypeFilter('all'); }}>
            Clear filters
          </button>
        </div>
      ) : (
        <div className="job-list">
          {filtered.map(job => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
}

export default JobList;
