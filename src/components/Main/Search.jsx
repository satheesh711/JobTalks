import React, { useState, useEffect, use } from 'react';
import { motion } from 'framer-motion';
import { Search as SearchIcon, Filter, Building2 } from 'lucide-react';
import { useSearchParams, useLocation, useNavigate } from 'react-router-dom';
import CompanyCard from './Comanycard';
import { companies as companiesData } from '../../Services/companies';
import { set } from 'react-hook-form';

const Search = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const id = location.state?.id;
  const [searchParams, setSearchParams] =useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [companies, setCompanies] = useState([]);
useEffect(() => {
    if (!id) {
      navigate('/login', { replace: true });
    }
    setSearchParams(location.state?.searchQuery);
}, [id, navigate, location.state]);
  useEffect(() => {
    Companies();
  }, []);

  const Companies = async () => {
    try {
      const data = await companiesData();
      setCompanies(data);
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };

  const [filters, setFilters] = useState({
    query: searchParams|| '',

  });

  const industries = Array.from(new Set(companies.map(company => company.industry)));
  const locations = Array.from(new Set(companies.map(company => company.location)));

  useEffect(() => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });
    setSearchParams(params);
  }, [filters, setSearchParams]);

  const filteredCompanies = companies.filter(company => {
    const matchesQuery = !filters.query || 
      company.name.toLowerCase().includes(filters.query.toLowerCase()) ||
      company.description.toLowerCase().includes(filters.query.toLowerCase());
    
    const matchesIndustry = !filters.industry || company.industry === filters.industry;
    const matchesLocation = !filters.location || company.location === filters.location;
    const matchesRating = !filters.rating || company.rating >= parseFloat(filters.rating);
    
    const matchesSalary = !filters.minSalary || !filters.maxSalary ||
      (company.salaryRange &&
        company.salaryRange.min >= parseInt(filters.minSalary) &&
        company.salaryRange.max <= parseInt(filters.maxSalary));

    return matchesQuery && matchesIndustry && matchesLocation && matchesRating && matchesSalary;
  });

  return (
    <div className="container py-5">
      <div className="row mb-4">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 className="mb-0">Search Results</h1>
            <button
              className="btn btn-outline-primary d-flex align-items-center"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="me-2" />
              Filters
            </button>
          </div>

          <div className="card mb-4">
            <div className="card-body">
              <div className="input-group input-group-lg mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search companies, roles, or keywords..."
                  value={filters.query}
                  onChange={(e) => setFilters({ ...filters, query: e.target.value })}
                />
                <button className="btn btn-primary" onClick={() => navigate(`/home/search?q=${encodeURIComponent(filters.query)}`, { state: { id } })}>
                  <SearchIcon size={20} />
                </button>
              </div>

              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="border-top pt-3"
                >
                  <div className="row g-3">
                    <div className="col-md-6 col-lg-3">
                      <label className="form-label">Industry</label>
                      <select
                        className="form-select"
                        value={filters.industry}
                        onChange={(e) => setFilters({ ...filters, industry: e.target.value })}
                      >
                        <option value="">All Industries</option>
                        {industries.map((industry) => (
                          <option key={industry} value={industry}>{industry}</option>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-6 col-lg-3">
                      <label className="form-label">Location</label>
                      <select
                        className="form-select"
                        value={filters.location}
                        onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                      >
                        <option value="">All Locations</option>
                        {locations.map((location) => (
                          <option key={location} value={location}>{location}</option>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-6 col-lg-3">
                      <label className="form-label">Minimum Rating</label>
                      <select
                        className="form-select"
                        value={filters.rating}
                        onChange={(e) => setFilters({ ...filters, rating: e.target.value })}
                      >
                        <option value="">Any Rating</option>
                        <option value="4">4+ Stars</option>
                        <option value="4.5">4.5+ Stars</option>
                      </select>
                    </div>
                    <div className="col-md-6 col-lg-3">
                      <label className="form-label">Salary Range</label>
                      <div className="input-group">
                        <input
                          type="number"
                          className="form-control"
                          placeholder="Min"
                          value={filters.minSalary}
                          onChange={(e) => setFilters({ ...filters, minSalary: e.target.value })}
                        />
                        <input
                          type="number"
                          className="form-control"
                          placeholder="Max"
                          value={filters.maxSalary}
                          onChange={(e) => setFilters({ ...filters, maxSalary: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {filteredCompanies.length > 0 ? (
            <div className="row g-4">
              {filteredCompanies.map((company) => (
                <div key={company.id} className="col-md-6">
                  <CompanyCard company={company} id={id} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-5">
              <Building2 size={48} className="text-muted mb-3" />
              <h3>No companies found</h3>
              <p className="text-muted">Try adjusting your search criteria</p>
            </div>
          )}
        </div>
      </div>

      {filteredCompanies.length > 0 && (
        <div className="card bg-light">
          <div className="card-body"> 
            <div className="row text-center">
              <Building2 size={24} className="text-primary mb-2" />
              <h4>{filteredCompanies.length}</h4>
              <p className="text-muted mb-0">Companies Found</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
