import { useEffect, useState } from 'react';
import { fetchJobs } from '../api/jobs';
import JobCard from '../components/JobCard';

function JobList() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchJobs()
      .then(setJobs)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="status-text">Loading jobs...</p>;
  if (error) return <p className="status-text error">{error}</p>;

  return (
    <div>
      <div className="page-header">
        <h1>Available Jobs</h1>
        <p>{jobs.length} positions found</p>
      </div>
      <div className="job-list">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
}

export default JobList;
