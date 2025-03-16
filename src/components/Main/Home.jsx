import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Star, DollarSign, TrendingUp } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { companies as companiesData } from '../../Services/companies';
import { useIdContext } from './IdContext';

const Home = () => {
  const location = useLocation();
  const userId = location.state?.userId
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([])
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await companiesData();
        setSuggestions(data);
      } catch (error) {
        console.error('Error fetching company data:', error);
      }
    };
    fetchData();
  }, []);

  const filteredSuggestions = suggestions.filter((company) =>
    company.name.toLowerCase().includes(searchQuery.toLowerCase())
  );


  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/home/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion.name);
    navigate(`/home/search?q=${encodeURIComponent(suggestion.name)}`);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <div>
      <motion.section 
        className="hero-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <motion.h1 
                className="display-4 fw-bold mb-4"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Find Your Dream Company
              </motion.h1>
              <motion.p 
                className="lead mb-4"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Discover company reviews, salary insights, and honest feedback from employees.
              </motion.p>
              <motion.form 
                className="hero-search"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                onSubmit={handleSearch}
              >
                <div className="input-group input-group-lg">
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Search companies..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button className="btn btn-light" type="submit">
                    <Search size={24} />
                  </button>
                </div>
                <div className="input-group input-group-lg">
                {searchQuery && (
                    <ul className="list-group position-absolute w-100 mt-2 shadow" style={{ zIndex: 10 }}>
                      {filteredSuggestions.length > 0 ? (
                        filteredSuggestions.slice(0, 5).map((company) => (
                          <li
                            key={company.id}
                            className="list-group-item list-group-item-action"
                            onClick={() => handleSuggestionClick(company)}
                            style={{ cursor: 'pointer' }}
                          >
                            {company.name}
                          </li>
                        ))
                      ) : (
                        <li className="list-group-item text-muted">No suggestions found</li>
                      )}
                    </ul>
                  )}
                  </div>
              </motion.form>
            </div>
            <motion.div 
              className="col-lg-6 d-none d-lg-block text-center"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1552581234-26160f608093?w=600" 
                alt="Office workers" 
                className="img-fluid rounded shadow-lg"
                style={{ maxHeight: '400px', objectFit: 'cover' }}
              />
            </motion.div>
          </div>
        </div>
      </motion.section>

      <motion.section 
        className="py-5"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="container">
          <div className="row g-4">
            <div className="col-md-4">
              <motion.div 
                className="card h-100 border-0 shadow-sm feature-card"
                variants={itemVariants}
                whileHover={{ y: -10 }}
              >
                <div className="card-body text-center p-4">
                  <Star className="text-warning mb-3" size={40} />
                  <h5 className="card-title">Company Reviews</h5>
                  <p className="card-text">Read authentic reviews from real employees about work culture, benefits, and more.</p>
                  <Link to="/home/reviews" className="btn btn-outline-primary mt-3">View Reviews</Link>
                </div>
              </motion.div>
            </div>
            <div className="col-md-4">
              <motion.div 
                className="card h-100 border-0 shadow-sm feature-card"
                variants={itemVariants}
                whileHover={{ y: -10 }}
              >
                <div className="card-body text-center p-4">
                  <DollarSign className="text-success mb-3" size={40} />
                  <h5 className="card-title">Salary Insights</h5>
                  <p className="card-text">Compare salaries across companies and roles to make informed career decisions.</p>
                  <Link to="/home/salaries" className="btn btn-outline-primary mt-3">View Salaries</Link>
                </div>
              </motion.div>
            </div>
            <div className="col-md-4">
              <motion.div 
                className="card h-100 border-0 shadow-sm feature-card"
                variants={itemVariants}
                whileHover={{ y: -10 }}
              >
                <div className="card-body text-center p-4">
                  <TrendingUp className="text-primary mb-3" size={40} />
                  <h5 className="card-title">Career Growth</h5>
                  <p className="card-text">Track industry trends and discover opportunities for career advancement.</p>
                  <Link to="/home/companies" className="btn btn-outline-primary mt-3">Explore Companies</Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      <section className="py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-6 fw-bold">Why Choose JabTalks?</h2>
            <p className="lead text-muted">Join thousands of professionals making informed career decisions</p>
          </div>
          <div className="row g-4">
            <div className="col-md-3">
              <div className="text-center">
                <h3 className="display-3 fw-bold text-primary">500+</h3>
                <p className="text-muted">Companies Listed</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="text-center">
                <h3 className="display-3 fw-bold text-primary">10k+</h3>
                <p className="text-muted">User Reviews</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="text-center">
                <h3 className="display-3 fw-bold text-primary">5k+</h3>
                <p className="text-muted">Salary Insights</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="text-center">
                <h3 className="display-3 fw-bold text-primary">95%</h3>
                <p className="text-muted">User Satisfaction</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;