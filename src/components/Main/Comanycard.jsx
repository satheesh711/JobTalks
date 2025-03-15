import React from 'react';
import { motion } from 'framer-motion';
import { Star, MapPin, Users, Building } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CompanyCard = ({ company }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/home/companies/${company.id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="card h-100 shadow-sm company-card border-0"
    >
      <div className="card-body p-4" onClick={handleClick}>
        {/* Header */}
        <div className="d-flex align-items-center mb-3">
          <img
            src={company.logo}
            alt={company.name}
            className="rounded-circle me-3 border"
            style={{ width: 60, height: 60, objectFit: 'contain' }}
          />
          <div>
            <h5 className="card-title mb-1 fw-bold text-primary">{company.name}</h5>
            <span className="text-muted small">{company.industry}</span>
          </div>
        </div>

        {/* Description */}
        <p className="card-text text-truncate" style={{ maxHeight: '3rem' }}>
          {company.description}
        </p>

        {/* Ratings & Location */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="d-flex align-items-center">
            <Star className="text-warning me-2" size={18} />
            <span className="fw-bold me-1">{company.rating.toFixed(1)}</span>
            <span className="text-muted small">({company.reviewCount} reviews)</span>
          </div>

          <div className="d-flex align-items-center text-muted small">
            <MapPin size={16} className="me-1" />
            <span>{company.location}</span>
          </div>
        </div>

        {/* Benefits */}
        {company.benefits && (
          <div className="d-flex flex-wrap gap-2">
            {company.benefits.slice(0, 3).map((benefit, index) => (
              <span key={index} className="badge bg-primary text-white">
                {benefit}
              </span>
            ))}
            {company.benefits.length > 3 && (
              <span className="badge bg-secondary text-white">
                +{company.benefits.length - 3} more
              </span>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
    </motion.div>
  );
};

export default CompanyCard;
