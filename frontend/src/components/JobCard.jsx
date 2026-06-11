import { Link } from 'react-router-dom';

function JobCard({ job }) {
  return (
    <Link to={`/jobs/${job.id}`} className="job-card">
      <div className="job-card-header">
        <h3 className="job-title">{job.title}</h3>
        <span className={`badge badge-${job.type}`}>{job.type}</span>
      </div>
      <p className="job-company">{job.company}</p>
      <div className="job-meta">
        <span>{job.location}</span>
        {job.salary && <span>{job.salary}</span>}
      </div>
    </Link>
  );
}

export default JobCard;
