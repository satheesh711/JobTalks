import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, ArrowLeft } from 'lucide-react';

const AddReview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const company = useCompanyStore(state => state.getCompanyById(parseInt(id)));
  const addReview = useCompanyStore(state => state.addReview);

  const [formData, setFormData] = useState({
    rating: 5,
    title: '',
    pros: '',
    cons: '',
    authorRole: '',
    experience: '',
    employmentStatus: 'Current',
    salary: '',
    location: '',
    recommendToFriend: true
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addReview({
      ...formData,
      companyId: parseInt(id),
      date: new Date().toISOString(),
      helpful: 0,
      verified: true
    });
    navigate(`/companies/${id}`);
  };

  if (!company) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container py-5">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card shadow-sm"
      >
        <div className="card-body">
          <button
            className="btn btn-link text-decoration-none mb-4 p-0"
            onClick={() => navigate(`/companies/${id}`)}
          >
            <ArrowLeft className="me-2" />
            Back to {company.name}
          </button>

          <h2 className="mb-4">Write a Review for {company.name}</h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="form-label">Overall Rating</label>
              <div className="d-flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={32}
                    className={`cursor-pointer ${star <= formData.rating ? 'text-warning' : 'text-muted'}`}
                    fill={star <= formData.rating ? 'currentColor' : 'none'}
                    onClick={() => setFormData({ ...formData, rating: star })}
                    style={{ cursor: 'pointer' }}
                  />
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label className="form-label">Review Title</label>
              <input
                type="text"
                className="form-control"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Sum up your experience"
                required
              />
            </div>

            <div className="mb-4">
              <label className="form-label">Pros</label>
              <textarea
                className="form-control"
                rows="4"
                value={formData.pros}
                onChange={(e) => setFormData({ ...formData, pros: e.target.value })}
                placeholder="What did you like about working here?"
                required
              />
            </div>

            <div className="mb-4">
              <label className="form-label">Cons</label>
              <textarea
                className="form-control"
                rows="4"
                value={formData.cons}
                onChange={(e) => setFormData({ ...formData, cons: e.target.value })}
                placeholder="What did you dislike about working here?"
                required
              />
            </div>

            <div className="row mb-4">
              <div className="col-md-6">
                <label className="form-label">Your Role</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.authorRole}
                  onChange={(e) => setFormData({ ...formData, authorRole: e.target.value })}
                  placeholder="e.g., Software Engineer"
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Employment Status</label>
                <select
                  className="form-select"
                  value={formData.employmentStatus}
                  onChange={(e) => setFormData({ ...formData, employmentStatus: e.target.value })}
                >
                  <option value="Current">Current Employee</option>
                  <option value="Former">Former Employee</option>
                </select>
              </div>
            </div>

            <div className="row mb-4">
              <div className="col-md-6">
                <label className="form-label">Experience at Company</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  placeholder="e.g., 2 years"
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Location</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="e.g., San Francisco, CA"
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="form-label">Salary (Optional)</label>
              <div className="input-group">
                <span className="input-group-text">$</span>
                <input
                  type="number"
                  className="form-control"
                  value={formData.salary}
                  onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                  placeholder="Annual salary"
                />
              </div>
            </div>

            <div className="mb-4">
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="recommendToFriend"
                  checked={formData.recommendToFriend}
                  onChange={(e) => setFormData({ ...formData, recommendToFriend: e.target.checked })}
                />
                <label className="form-check-label" htmlFor="recommendToFriend">
                  Would you recommend working at {company.name} to a friend?
                </label>
              </div>
            </div>

            <div className="d-flex gap-3">
              <button type="submit" className="btn btn-primary">
                Submit Review
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => navigate(`/companies/${id}`)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default AddReview;