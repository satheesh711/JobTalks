import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Star, ThumbsUp, Calendar, MapPin, Building2, Plus } from 'lucide-react';
import { addReview, decrementLikes, getAllReviews, incrementLikes } from '../../Services/companies';
import { useIdContext } from './IdContext';
import AddButton from './Addbutton';
import ReviewModal from './ReviewModel';
import Select from 'react-select';

const Reviews = () => {
  const [selectedCompany, setSelectedCompany] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [companiesData, setCompaniesData] = useState([]);
  const [likedReviews, setLikedReviews] = useState({});
  const [showReviewModal, setShowReviewModal] = useState(false);
  const { id } = useIdContext();
  useEffect(() => {
    AllReviews()
  }, [])

  const AllReviews = async () => {
    try {
      const data = await getAllReviews()
      setCompaniesData(data)
      const likedData = {};
      data.forEach((review) => {
        if (review.likedBy && review.likedBy.includes(id)) {
          likedData[review.id] = true;
        }
      });
      setLikedReviews(likedData);
    }
    catch (error) {
      console.error("Error fetching Highest rated companies:", error)
    }
  }
  let reviews = companiesData.filter(review => 
    !selectedCompany || review.companyName === selectedCompany
);

switch (sortBy) {
    case 'date':
        reviews = [...reviews].sort((a, b) => new Date(b.date) - new Date(a.date));
        break;

    case 'helpful':
        reviews = [...reviews].sort((a, b) => b.helpful - a.helpful);
        break;

    case 'good':
        reviews = [...reviews]
            .filter(review => review.rating >= 3)
            .sort((a, b) => b.rating - a.rating)
        break;

    case 'bad':
        reviews = [...reviews]
            .filter(review => review.rating < 3)
            .sort((a, b) => (b.rating-a.rating))
        break;

    default:
        break;
}
  const companyOptions = Array.from(
    new Map(companiesData.map((review) => [
      review.companyId,
      { value: review.companyName, label: review.companyName }
    ])).values()
  );

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

    AllReviews();
  };


  const handleAddReview = async (review) => {
    const id = review.companyId
    delete review.companyId
    await addReview({ ...review }, id);
    setShowReviewModal(false);
    AllReviews()
  };


  return (


    <div className="container py-5">
      <div className="row mb-4">
        <div className="col-12">
          <h1 className="mb-4">Company Reviews</h1>
          <div className="row g-3 sticky-top bg-light shadow-sm mb-3" style={{ top: '70px', zIndex: 1020 }}>

            <div className="col-md-8">
              <Select
                options={[{ value: '', label: 'All Companies' }, ...companyOptions]}
                value={companyOptions.find((option) => option.value === selectedCompany)}
                onChange={(selectedOption) => setSelectedCompany(selectedOption?.value || '')}
                isSearchable
                placeholder="Select or type a company..."
              />
            </div>
            <div className="col-md-4">
              <select
                className="form-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="date">Most Recent</option>
                <option value="helpful">Most Helpful</option>
                <option value="good">3+ rating</option>
                <option value="bad">below 3 rating</option>
              </select>
            </div>
          </div>

          {reviews.map((review) => {
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
                        <span className="me-3">{review?.companyName}</span>
                        {/* <MapPin size={16} className="me-1" /> */}
                        {/* <span className="me-3">{review?.location}</span> */}
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
                        onClick={() => handleHelpfulToggle(review.id, review.companyId)}
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
      <AddButton onClick={() => setShowReviewModal(true)} />
      <ReviewModal
        show={showReviewModal}
        onClose={() => setShowReviewModal(false)}
        onSubmit={handleAddReview}
        companies={Array.from(
          new Map(companiesData.map((review) => [
            review.companyId,         // Key (ensures uniqueness)
            { id: review.companyId, name: review.companyName }  // Value (final object structure)
          ])).values()
        )}
      />
    </div>
  );
};

export default Reviews;

