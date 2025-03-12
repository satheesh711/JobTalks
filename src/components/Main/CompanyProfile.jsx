import React, { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, MapPin, Users, Building2, DollarSign, Plus } from 'lucide-react';
import useCompanyStore from '../../pages/data/CompanyStore';
import StarRating from './StarRating';
import ReviewModal from './ReviewModel';
import LoadingSpinner from './LoadingSpinner';

const CompanyProfile = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('overview');
  const [showReviewModal, setShowReviewModal] = useState(false);

  const getCompanyById = useCompanyStore((state) => state.getCompanyById);
  const getCompanyReviews = useCompanyStore((state) => state.getCompanyReviews);
  const getCompanyRoles = useCompanyStore((state) => state.getCompanyRoles);
  const addReview = useCompanyStore((state) => state.addReview);

  const company = useMemo(() => getCompanyById(parseInt(id)), [id, getCompanyById]);
  const reviews = useMemo(() => getCompanyReviews(parseInt(id)), [id, getCompanyReviews]);
  const roles = useMemo(() => getCompanyRoles(parseInt(id)), [id, getCompanyRoles]);

  if (!company) {
    return <LoadingSpinner />;
  }

  const handleAddReview = (review) => {
    addReview({
      ...review,
      companyId: parseInt(id),
      date: new Date().toISOString()
    });
    setShowReviewModal(false);
  };
  return (
    <div className="container py-5">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card mb-4 shadow-sm"
      >
        <div className="card-body">
          <div className="row align-items-center">
            <div className="col-md-2">
              <img
                src={company.logoUrl}
                alt={company.name}
                className="img-fluid rounded-circle"
                style={{ width: 120, height: 120, objectFit: 'cover' }}
              />
            </div>
            <div className="col-md-10">
              <h1 className="mb-2">{company.name}</h1>
              <div className="d-flex align-items-center mb-3">
                <StarRating rating={company.rating} />
                <span className="ms-2 text-muted">
                  {company.rating.toFixed(1)} ({company.reviewCount} reviews)
                </span>
              </div>
              <div className="d-flex flex-wrap gap-3 text-muted">
                <div className="d-flex align-items-center">
                  <Building2 size={18} className="me-1" />
                  <span>{company.industry}</span>
                </div>
                <div className="d-flex align-items-center">
                  <MapPin size={18} className="me-1" />
                  <span>{company.location}</span>
                </div>
                <div className="d-flex align-items-center">
                  <Users size={18} className="me-1" />
                  <span>{company.size}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="card shadow-sm">
        <div className="card-header bg-white">
          <ul className="nav nav-tabs card-header-tabs">
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'overview' ? 'active' : ''}`}
                onClick={() => setActiveTab('overview')}
              >
                Overview
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'reviews' ? 'active' : ''}`}
                onClick={() => setActiveTab('reviews')}
              >
                Reviews
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'roles' ? 'active' : ''}`}
                onClick={() => setActiveTab('roles')}
              >
                Roles & Salaries
              </button>
            </li>
          </ul>
        </div>
        <div className="card-body">
          {activeTab === 'overview' && (
            <div>
              <h3 className="mb-4">About {company.name}</h3>
              <p className="lead mb-4">{company.description}</p>
              
              <h4 className="mb-3">Benefits & Perks</h4>
              <div className="d-flex flex-wrap gap-2 mb-4">
                {company.benefits.map((benefit, index) => (
                  <span key={index} className="badge bg-light text-dark p-2">
                    {benefit}
                  </span>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="mb-0">Employee Reviews</h3>
                <button
                  className="btn btn-primary d-flex align-items-center"
                  onClick={() => setShowReviewModal(true)}
                >
                  <Plus size={20} className="me-2" />
                  Add Review
                </button>
              </div>
              
              <div className="reviews-container">
                {reviews.map((review) => (
                  <motion.div
                    key={review.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="card mb-3"
                  >
                    <div className="card-body">
                      <div className="d-flex justify-content-between mb-3">
                        <h5 className="card-title mb-0">{review.title}</h5>
                        <StarRating rating={review.rating} />
                      </div>
                      <div className="mb-3">
                        <div className="text-success mb-2">
                          <strong>Pros:</strong> {review.pros}
                        </div>
                        <div className="text-danger">
                          <strong>Cons:</strong> {review.cons}
                        </div>
                      </div>
                      <div className="text-muted small">
                        {review.authorRole} • {review.experience} •{' '}
                        {new Date(review.date).toLocaleDateString()}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'roles' && (
            <div>
              <h3 className="mb-4">Open Positions & Salary Information</h3>
              <div className="row g-4">
                {roles.map((role) => (
                  <motion.div
                    key={role.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="col-md-6"
                  >
                    <div className="card h-100">
                      <div className="card-body">
                        <h5 className="card-title mb-3">{role.title}</h5>
                        <div className="d-flex align-items-center mb-3">
                          <DollarSign className="text-success me-2" />
                          <span className="fw-bold">
                            ${role.salaryRange.min.toLocaleString()} - 
                            ${role.salaryRange.max.toLocaleString()}
                          </span>
                        </div>
                        <p className="text-muted mb-3">{role.department}</p>
                        <div className="d-flex flex-wrap gap-2">
                          {role.benefits.map((benefit, index) => (
                            <span key={index} className="badge bg-light text-dark">
                              {benefit}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <ReviewModal
        show={showReviewModal}
        onClose={() => setShowReviewModal(false)}
        onSubmit={handleAddReview}
        companies={[company]}
      />
    </div>
  );
};

export default CompanyProfile;