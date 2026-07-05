import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createJob } from '../api/jobs';
import { useAuth } from '../context/AuthContext';

const INITIAL_FORM = {
  title: '', company: '', location: '', type: 'full-time',
  salary: '', description: '', requirements: '',
};

function PostJob() {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState(null);

  function validate() {
    const e = {};
    if (!form.title.trim()) e.title = 'Title is required';
    if (!form.company.trim()) e.company = 'Company is required';
    if (!form.location.trim()) e.location = 'Location is required';
    if (!form.description.trim()) e.description = 'Description is required';
    return e;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: undefined }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) { setErrors(validationErrors); return; }

    setSubmitting(true);
    setServerError(null);
    try {
      const newJob = await createJob(form, token);
      navigate(`/jobs/${newJob.id}`);
    } catch (err) {
      setServerError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="post-job">
      <h1>Post a New Job</h1>
      {serverError && <p className="status-text error">{serverError}</p>}
      <form onSubmit={handleSubmit} className="job-form" noValidate>
        <div className="form-group">
          <label htmlFor="title">Job Title *</label>
          <input id="title" name="title" value={form.title} onChange={handleChange}
            placeholder="e.g. Frontend Developer" className={errors.title ? 'input-error' : ''} />
          {errors.title && <span className="error-msg">{errors.title}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="company">Company *</label>
          <input id="company" name="company" value={form.company} onChange={handleChange}
            placeholder="e.g. Wongnai" className={errors.company ? 'input-error' : ''} />
          {errors.company && <span className="error-msg">{errors.company}</span>}
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="location">Location *</label>
            <input id="location" name="location" value={form.location} onChange={handleChange}
              placeholder="e.g. Bangkok" className={errors.location ? 'input-error' : ''} />
            {errors.location && <span className="error-msg">{errors.location}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="type">Job Type *</label>
            <select id="type" name="type" value={form.type} onChange={handleChange}>
              <option value="full-time">Full-time</option>
              <option value="part-time">Part-time</option>
              <option value="contract">Contract</option>
              <option value="internship">Internship</option>
            </select>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="salary">Salary (optional)</label>
          <input id="salary" name="salary" value={form.salary} onChange={handleChange}
            placeholder="e.g. 40,000 - 60,000 THB" />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description *</label>
          <textarea id="description" name="description" value={form.description}
            onChange={handleChange} rows={5}
            placeholder="Describe the role and responsibilities..."
            className={errors.description ? 'input-error' : ''} />
          {errors.description && <span className="error-msg">{errors.description}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="requirements">Requirements (optional)</label>
          <textarea id="requirements" name="requirements" value={form.requirements}
            onChange={handleChange} rows={3} placeholder="e.g. React, 1+ years experience" />
        </div>
        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? 'Posting...' : 'Post Job'}
        </button>
      </form>
    </div>
  );
}

export default PostJob;
