import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const ReviewModal = ({ show, onClose, onSubmit, companies }) => {
  const [formData, setFormData] = useState({
    rating: 5,
    title: '',
    pros: '',
    cons: '',
    authorRole: '',
    experience: '',
    companyId:''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      date: new Date().toISOString().split('T')[0],
      id:new Date().toISOString().replace(/[-:.TZ]/g, ''),
      helpful: 0,
      verified: true,
      location: companies.find(c => c.id === parseInt(formData.companyId))?.location || ''
    });
    onClose();
  };

  if (!show) return null;

  return (
    <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <motion.div 
        className="modal-dialog modal-lg"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add Company Review</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Company</label>
                <select
                  className="form-select"
                  value={formData.companyId}
                  onChange={(e) => setFormData({ ...formData, companyId: e.target.value })}
                  required
                >
                  <option value="">Select a company</option>
                  {companies.map(company => (
                    <option key={company.id} value={company.id}>{company.name}</option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Rating</label>
                <div className="d-flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={24}
                      className={`cursor-pointer ${star <= formData.rating ? 'text-warning' : 'text-muted'}`}
                      fill={star <= formData.rating ? 'currentColor' : 'none'}
                      onClick={() => setFormData({ ...formData, rating: star })}
                      style={{ cursor: 'pointer' }}
                    />
                  ))}
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">Review Title</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Pros</label>
                <textarea
                  className="form-control"
                  value={formData.pros}
                  onChange={(e) => setFormData({ ...formData, pros: e.target.value })}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Cons</label>
                <textarea
                  className="form-control"
                  value={formData.cons}
                  onChange={(e) => setFormData({ ...formData, cons: e.target.value })}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Your Role</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.authorRole}
                  onChange={(e) => setFormData({ ...formData, authorRole: e.target.value })}
                  required
                />
              </div>
              <div className="mb-3">
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
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
                <button type="submit" className="btn btn-primary">Submit Review</button>
              </div>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ReviewModal;