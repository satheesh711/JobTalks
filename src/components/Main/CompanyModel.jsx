import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { checkCompany } from '../../Services/companies';
import { toast } from "react-toastify";

const CompanyModal = ({ show, onClose, onSubmit }) => {

 const initialFormData= {
    name: '',
    industry: '',
    location: '',
    description: '',
    logo: '',
    benefits: '',
    salaryMin: '',
    salaryMax: ''
  }

  const [formData, setFormData] = useState(initialFormData);

  const handleSubmit = async(e) => {
    e.preventDefault();
    const benefits = formData.benefits.split(',').map(benefit => benefit.trim());
    const newCompany={
      ...formData,
      benefits,
      id:new Date().toISOString().replace(/[-:.TZ]/g, ''),
      slug: formData.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, ''),
      salaryRange: {
        min: parseInt(formData.salaryMin),
        max: parseInt(formData.salaryMax),
        currency: 'USD'
      },
      rating: 0,
      reviewCount: 0
    }


    const isDuplicate = await checkCompany(newCompany)

  if (isDuplicate) {
     
      toast.error('Company already exists!');
  } else {
      onSubmit(newCompany);
      setFormData(initialFormData)
      onClose();
  }
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
            <h5 className="modal-title">Add New Company</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Company Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Industry</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.industry}
                  onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Location</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  className="form-control"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Logo URL</label>
                <input
                  type="url"
                  className="form-control"
                  value={formData.logo}
                  onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Benefits (comma-separated)</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.benefits}
                  onChange={(e) => setFormData({ ...formData, benefits: e.target.value })}
                  placeholder="Health Insurance, 401k, Remote Work"
                  required
                />
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Minimum Salary</label>
                  <input
                    type="number"
                    className="form-control"
                    value={formData.salaryMin}
                    onChange={(e) => setFormData({ ...formData, salaryMin: e.target.value })}
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Maximum Salary</label>
                  <input
                    type="number"
                    className="form-control"
                    value={formData.salaryMax}
                    onChange={(e) => setFormData({ ...formData, salaryMax: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
                <button type="submit" className="btn btn-primary">Add Company</button>
              </div>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CompanyModal;