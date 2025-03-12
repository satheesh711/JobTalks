import React from 'react';
import { motion } from 'framer-motion';
import { Star, MapPin, Users, Building } from 'lucide-react';
import { Link } from 'react-router-dom';

const CompanyCard = ({ company }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
      className="card h-100 shadow-sm company-card"
    >
      <div className="card-body">
        <div className="d-flex align-items-center mb-3">
          <img
            src={company.logoUrl}
            alt={company.name}
            className="rounded-circle me-3"
            style={{ width: 60, height: 60, objectFit: 'cover' }}
          />
          <div>
            <Link to={`/home/companies/${company.id}`} className="text-decoration-none">
              <h5 className="card-title mb-1">{company.name}</h5>
            </Link>
            <span className="text-muted small">{company.industry}</span>
          </div>
        </div>

        <p className="card-text">{company.description}</p>

        <div className="mt-3">
          <div className="d-flex align-items-center mb-2">
            <Star className="text-warning me-2" size={18} />
            <span className="fw-bold me-1">{company.rating.toFixed(1)}</span>
            <span className="text-muted small">({company.reviewCount} reviews)</span>
          </div>

          <div className="d-flex flex-wrap gap-2 mb-3">
            <div className="d-flex align-items-center text-muted small">
              <MapPin size={16} className="me-1" />
              <span>{company.location}</span>
            </div>
            <div className="d-flex align-items-center text-muted small">
              <Users size={16} className="me-1" />
              <span>{company.size}</span>
            </div>
            <div className="d-flex align-items-center text-muted small">
              <Building size={16} className="me-1" />
              <span>Founded {company.founded}</span>
            </div>
          </div>

          {company.benefits && (
            <div className="d-flex flex-wrap gap-2">
              {company.benefits.slice(0, 3).map((benefit, index) => (
                <span key={index} className="badge bg-light text-dark">
                  {benefit}
                </span>
              ))}
              {company.benefits.length > 3 && (
                <span className="badge bg-light text-dark">
                  +{company.benefits.length - 3} more
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default CompanyCard;
