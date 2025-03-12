import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, ThumbsUp, Calendar, MapPin, Building2 } from 'lucide-react';
import companiesData from '../../pages/data/companies.json';

const Reviews = () => {
  const [selectedCompany, setSelectedCompany] = useState('');
  const [sortBy, setSortBy] = useState('date');

  const reviews = companiesData.reviews.filter(review => 
    !selectedCompany || review.companyId === parseInt(selectedCompany)
  ).sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    return b.helpful - a.helpful;
  });

  return (
    <div className="container py-5">
      <div className="row mb-4">
        <div className="col-12">
          <h1 className="mb-4">Company Reviews</h1>
          
          <div className="card mb-4">
            <div className="card-body">
              <div className="row g-3">
                <div className="col-md-8">
                  <label className="form-label">Filter by Company</label>
                  <select
                    className="form-select"
                    value={selectedCompany}
                    onChange={(e) => setSelectedCompany(e.target.value)}
                  >
                    <option value="">All Companies</option>
                    {companiesData.companies.map((company) => (
                      <option key={company.id} value={company.id}>
                        {company.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-4">
                  <label className="form-label">Sort by</label>
                  <select
                    className="form-select"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="date">Most Recent</option>
                    <option value="helpful">Most Helpful</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {reviews.map((review) => {
            const company = companiesData.companies.find(c => c.id === review.companyId);
            
            return (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="card mb-4 shadow-sm"
              >
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div>
                      <h5 className="card-title mb-1">{review.title}</h5>
                      <div className="d-flex align-items-center text-muted small">
                        <Building2 size={16} className="me-1" />
                        <span className="me-3">{company?.name}</span>
                        <MapPin size={16} className="me-1" />
                        <span className="me-3">{review.location}</span>
                        <Calendar size={16} className="me-1" />
                        <span>{new Date(review.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="d-flex align-items-center">
                      {[...Array(5)].map((_, index) => (
                        <Star
                          key={index}
                          size={18}
                          className={index < review.rating ? 'text-warning' : 'text-muted'}
                          fill={index < review.rating ? 'currentColor' : 'none'}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="mb-2">
                      <strong className="text-success">Pros:</strong>
                      <p className="mb-2">{review.pros}</p>
                    </div>
                    <div>
                      <strong className="text-danger">Cons:</strong>
                      <p className="mb-0">{review.cons}</p>
                    </div>
                  </div>

                  <div className="d-flex justify-content-between align-items-center text-muted small">
                    <div>
                      <span className="me-3">{review.authorRole}</span>
                      <span>{review.experience}</span>
                      {review.verified && (
                        <span className="badge bg-success ms-2">Verified Employee</span>
                      )}
                    </div>
                    <div className="d-flex align-items-center">
                      <ThumbsUp size={16} className="me-1" />
                      <span>{review.helpful} found helpful</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}

          {reviews.length === 0 && (
            <div className="text-center py-5">
              <h3>No reviews found</h3>
              <p className="text-muted">Try selecting a different company</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reviews;

