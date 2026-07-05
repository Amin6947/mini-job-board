import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { fetchJobById, deleteJob } from '../api/jobs';
import { useAuth } from '../context/AuthContext';

function JobDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, token } = useAuth();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchJobById(id)
      .then(setJob)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  const canManage = user && job && (user.id === job.employer_id || user.role === 'admin');

  async function handleDelete() {
    if (!confirm('Delete this job posting?')) return;
    setDeleting(true);
    try {
      await deleteJob(id, token);
      navigate('/');
    } catch (err) {
      alert(err.message);
      setDeleting(false);
    }
  }

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
        <div className="job-detail-header-right">
          <span className={`badge badge-${job.type}`}>{job.type}</span>
          {canManage && (
            <div className="manage-actions">
              <Link to={`/jobs/${id}/edit`} className="btn btn-ghost">Edit</Link>
              <button className="btn btn-danger" onClick={handleDelete} disabled={deleting}>
                {deleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="job-detail-meta">
        <span>📍 {job.location}</span>
        {job.salary && <span>💰 {job.salary}</span>}
        <span>📅 {new Date(job.created_at).toLocaleDateString()}</span>
        {job.employer_name && <span>🏢 Posted by {job.employer_name}</span>}
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
