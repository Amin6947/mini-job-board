import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchJobById } from '../api/jobs';

function JobDetail() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchJobById(id)
      .then(setJob)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="status-text">Loading...</p>;
  if (error) return <p className="status-text error">{error}</p>;

  return (
    <div className="job-detail">
      <Link to="/" className="back-link">&larr; Back to jobs</Link>

      <div className="job-detail-header">
        <div>
          <h1>{job.title}</h1>
          <p className="job-company">{job.company}</p>
        </div>
        <span className={`badge badge-${job.type}`}>{job.type}</span>
      </div>

      <div className="job-detail-meta">
        <span>Location: {job.location}</span>
        {job.salary && <span>Salary: {job.salary}</span>}
        <span>Posted: {new Date(job.created_at).toLocaleDateString()}</span>
      </div>

      <section className="job-section">
        <h2>Job Description</h2>
        <p>{job.description}</p>
      </section>

      {job.requirements && (
        <section className="job-section">
          <h2>Requirements</h2>
          <p>{job.requirements}</p>
        </section>
      )}
    </div>
  );
}

export default JobDetail;
