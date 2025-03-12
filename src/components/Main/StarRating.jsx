import React from 'react';
import { Star } from 'lucide-react';

const StarRating = ({ rating, size = 20, onChange, interactive = false }) => {
  return (
    <div className="d-flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={size}
          className={`${star <= rating ? 'text-warning' : 'text-muted'} ${
            interactive ? 'cursor-pointer' : ''
          }`}
          fill={star <= rating ? 'currentColor' : 'none'}
          onClick={() => interactive && onChange?.(star)}
          style={interactive ? { cursor: 'pointer' } : undefined}
        />
      ))}
    </div>
  );
};

export default StarRating;