import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, MapPin, Users, Building2,Plus, Calendar, ThumbsUp, Briefcase, Clock } from 'lucide-react';
import ReviewModal from './ReviewModel';
import LoadingSpinner from './LoadingSpinner';
import { addReview, decrementLikes, getCompanyByid, getCompanyReviews, getCompanyRoles, incrementLikes } from '../../Services/companies';
import StarRating from './StarRating';

const CompanyProfile = () => {
  const { companyId } = useParams();
  const [company, setCompany] = useState({});
  const [reviews, setReviews] = useState([]);
  const [roles, setRoles] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [sortBy, setSortBy] = useState('date');
  const [likedReviews, setLikedReviews] = useState({});
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [id, setId] = useState(null);
  const location = useLocation();
  const locationUserId = location.state?.id;
  useEffect(() => {
    setId(locationUserId);
  }, [locationUserId]);

  useEffect(() => {
    loadCompany();
    loadReviews();
    loadRoles();
  }, []);

  useEffect(() => {
    loadReviews();
  }, [sortBy]);

  const loadCompany = async () => {
    try {
      const data = await getCompanyByid(companyId);
      setCompany(data);
    } catch (error) {
      console.error("Error fetching Highest rated roles:", error);
    }
  };

  const loadReviews = async () => {
    try {
      const data = await getCompanyReviews(companyId);
      setReviews(sortReviews(data));
      const likedData = {};
      data.forEach((review) => {
        if (review.likedBy && review.likedBy.includes(id)) {
          likedData[review.id] = true;
        }
      });
      setLikedReviews(likedData);
    } catch (error) {
      console.error("Error fetching company reviews:", error);
    }
  };

  const handleHelpfulToggle = async (reviewId, companyId) => {
    const isLiked = likedReviews[reviewId];
    if (isLiked) {
      await decrementLikes(reviewId, companyId, id);
    } else {
      await incrementLikes(reviewId, companyId, id);
    }

    setLikedReviews((prev) => ({
      ...prev,
      [reviewId]: !isLiked
    }));

    loadReviews();
  };

  const sortReviews = (reviews) => {
    switch (sortBy) {
      case 'date':
        return [...reviews].sort((a, b) => new Date(b.date) - new Date(a.date));
      case 'helpful':
        return [...reviews].sort((a, b) => b.helpful - a.helpful);
      case 'good':
        return [...reviews].filter(review => review.rating >= 3)
          .sort((a, b) => b.rating - a.rating);
      case 'bad':
        return [...reviews].filter(review => review.rating < 3)
          .sort((a, b) => a.rating - b.rating);
      default:
        return reviews;
    }
  };

  const loadRoles = async () => {
    try {
      const data = await getCompanyRoles(companyId);
      setRoles(data);
    } catch (error) {
      console.error("Error fetching Highest rated roles:", error);
    }
  };

  const filteredRoles = React.useMemo(() => {
    return roles?.filter(role => {
      const matchesDepartment = !selectedDepartment || role.department === selectedDepartment;
      return matchesDepartment;
    });
  }, [roles, selectedDepartment]);

  const departments = React.useMemo(() => {
    return Array.from(new Set(roles?.map(role => role.department)));
  }, [roles]);

  const averageSalary = React.useMemo(() => {
    if (!filteredRoles || filteredRoles?.length === 0) 
      return 0;
    const total = filteredRoles.reduce((acc, role) => {
      return acc + ((role.salaryRange.min + role.salaryRange.max) / 2);
    }, 0);
    return Math.round(total / filteredRoles.length);
  }, [filteredRoles]);

  if (!company.id || !company) {
    return <LoadingSpinner />;
  }

  const handleAddReview = async (review) => {
    delete review?.companyId;
    const newReview = await addReview({ ...review }, companyId);
    setReviews((prevReviews) => [newReview, ...prevReviews]);
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
                src={company.logo}
                alt={company.name}
                className="img-fluid rounded-circle"
                style={{ width: 120, height: 120, objectFit: 'contain' }}
              />
            </div>
            <div className="col-md-10">
              <h1 className="mb-2">{company.name}</h1>
              <div className="d-flex align-items-center mb-3">
                <StarRating rating={company?.rating} />
                <span className="ms-2 text-muted">
                  {company?.rating.toFixed(1)} ({company?.reviewCount} reviews)
                </span>
              </div>
              <div className="d-flex flex-wrap gap-3 text-muted">
                <div className="d-flex align-items-center">
                  <Building2 size={18} className="me-1" />
                  <span>{company?.industry}</span>
                </div>
                <div className="d-flex align-items-center">
                  <MapPin size={18} className="me-1" />
                  <span>{company?.location}</span>
                </div>
                <div className="d-flex align-items-center">
                  <Users size={18} className="me-1" />
                  <span>{company?.size}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="card shadow-sm">
        <div className="card-header bg-white d-flex flex-wrap gap-2 justify-content-center">
          <ul className="nav nav-tabs card-header-tabs flex-grow-1">
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

          {activeTab === 'reviews' && (
            <select
              className="form-select w-auto form-select-lg"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="date">Most Recent</option>
              <option value="helpful">Most Helpful</option>
              <option value="good">3+ rating</option>
              <option value="bad">Below 3 rating</option>
            </select>
          )}

{activeTab === 'roles' && (
          <select
            className="form-select w-auto form-select-lg"
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
          >
            <option value="">All Departments</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
)}

        </div>

        <div className="card-body">
          {activeTab === 'overview' && (
            <div>
              <h3 className="mb-4">About {company?.name}</h3>
              <p className="lead mb-4">{company?.description}</p>

              <h4 className="mb-3">Benefits & Perks</h4>
              <div className="d-flex flex-wrap gap-2 mb-4">
                {company?.benefits.map((benefit, index) => (
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

              {reviews?.length === 0 ? (
                <p className="text-center text-muted">No reviews yet. Be the first to share your experience!</p>
              ) : (
                <div className="reviews-container">
                  {reviews.map((review) => (
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
                              <span className="me-3">{company.name}</span>
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
                            <motion.div
                              initial={{ scale: 1 }}
                              animate={{
                                scale: likedReviews[review.id] ? 1.2 : 1,
                              }}
                              transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                              onClick={() => handleHelpfulToggle(review.id, company.id)}
                              style={{ cursor: 'pointer' }}
                            >
                              <ThumbsUp
                                size={18}
                                className="me-1"
                                fill={likedReviews[review.id] ? '#FFD700' : 'none'}
                                stroke={likedReviews[review.id] ? '#FFD700' : '#6c757d'}
                              />
                            </motion.div>
                            <span>{review.helpful} times found helpful</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'roles' && (
            <div>
              <h3 className="mb-4">Roles & Salary Information</h3>

              {(filteredRoles || filteredRoles?.length > 0 )&& (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="card mb-4 bg-primary text-white"
                >
                  <div className="card-body text-center py-4">
                    <h3 className="mb-3">Average Salary</h3>
                    <h2 className="display-4 mb-0">
                      ${averageSalary.toLocaleString()}
                    </h2>
                    <p className="mb-0 mt-2">
                      Based on {filteredRoles.length} role{filteredRoles.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                </motion.div>
              )}

              <div className="row g-4">
                {filteredRoles?.map((role) => (
                  <motion.div
                    key={role.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="col-12"
                  >
                    <div className="card shadow-sm">
                      <div className="card-body">
                        <div className="row align-items-center">
                          <div className="col-md-8">
                            <div className="d-flex align-items-center mb-2">
                              <Briefcase size={20} className="text-primary me-2" />
                              <h5 className="mb-0">{role.title}</h5>
                            </div>
                            <div className="d-flex align-items-center text-muted small mb-2">
                              <Clock size={16} className="me-2" />
                              <span className="me-3">{role.department}</span>
                            </div>
                            {role.requirements && (
                              <div className="mt-3">
                                <h6 className="mb-2">Requirements:</h6>
                                <ul className="small text-muted mb-0">
                                  {role.requirements.map((req, index) => (
                                    <li key={index}>{req}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                          <div className="col-md-4 text-md-end mt-3 mt-md-0">
                            <h4 className="mb-0 text-success">
                              ${((role.salaryRange.min + role.salaryRange.max) / 2).toLocaleString()}
                            </h4>
                            <small className="text-muted d-block mb-2">
                              Range: ${role.salaryRange.min.toLocaleString()} - ${role.salaryRange.max.toLocaleString()}
                            </small>
                            <div className="d-flex flex-wrap gap-2 justify-content-md-end mt-3">
                              {role.benefits.map((benefit, index) => (
                                <span key={index} className="badge bg-light text-dark">
                                  {benefit}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {(!filteredRoles || filteredRoles.length === 0) && (
                <div className="text-center py-5">
                  <h3>No roles found</h3>
                  <p className="text-muted">Try adjusting your filters</p>
                </div>
              )}
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