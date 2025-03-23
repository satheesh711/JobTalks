import React from 'react';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

const AddButton = ({ to, onClick }) => {
  if (onClick) {
    return (
      <button onClick={onClick} className="add-button">
        <Plus size={24} />
      </button>
    );
  }

  return (
    <Link to={to} className="add-button">
      <Plus size={24} />
    </Link>
  );
};

export default AddButton;