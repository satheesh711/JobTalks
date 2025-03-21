import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter } from 'lucide-react';
import CompanyCard from './Comanycard';
import CompanyModal from './CompanyModel';
import AddButton from './Addbutton';
import { addComapy, companies as companiesData } from '../../Services/companies';
import { useLocation } from 'react-router-dom';

const Companies = () => {
  const [companies, setCompanies] = useState([]);
  const [userid, setUserId] = useState(null);
  const location = useLocation();
  const locationUserId = location.state?.id;
  
  useEffect(() => {
    setUserId(locationUserId);  
  }, [locationUserId]);

    useEffect(() => {
        Companies()
    }, [])

    const Companies = async () => {
        try {
            const data = await companiesData()
            setCompanies(data)
        }
        catch (error) {
            console.error("Error fetching Highest rated companies:", error)
        }
    }


  const [showAddModal, setShowAddModal] = useState(false);
  const [searchFilters, setSearchFilters] = useState({
    query: '',
    industry: '',
    location: '',
    rating: 0
  });
  const [showFilters, setShowFilters] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const companiesPerPage = 4;

  const [sortBy, setSortBy] = useState('name');

  const industries = Array.from(new Set(companies.map(company => company.industry)));

  const handleAddCompany = async(newCompany) => {
    await addComapy(newCompany)
    await Companies()
  };

  const filteredCompanies = companies?.filter(company => {
    const matchesQuery = company?.name?.toLowerCase()?.includes(searchFilters?.query?.toLowerCase()) ||
                         company?.description?.toLowerCase()?.includes(searchFilters?.query?.toLowerCase());

    const matchesIndustry = !searchFilters?.industry || company?.industry === searchFilters?.industry;
    const matchesLocation = !searchFilters?.location || company?.location === searchFilters?.location;
    const matchesRating = !searchFilters?.rating || company?.rating >= searchFilters?.rating;

    return matchesQuery && matchesIndustry && matchesLocation && matchesRating;
});


  const sortedCompanies = [...filteredCompanies].sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'reviews') return b.reviewCount - a.reviewCount;
    return 0;
  });

  const indexOfLastCompany = currentPage * companiesPerPage;
  const indexOfFirstCompany = indexOfLastCompany - companiesPerPage;
  const currentCompanies = sortedCompanies.slice(indexOfFirstCompany, indexOfLastCompany);

  const totalPages = Math.ceil(sortedCompanies.length / companiesPerPage);

  return (
    <div className="container py-5">
      <div className="row mb-4">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 className="mb-0">Companies</h1>
            <button
              className="btn btn-outline-primary d-flex align-items-center"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="me-2" />
              Filters
            </button>
          </div>
          
          <div className="search-section mb-4">
            <div className="input-group">
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Search companies by name, description..."
                value={searchFilters.query}
                onChange={(e) => setSearchFilters({ ...searchFilters, query: e.target.value })}
              />
              <button className="btn btn-primary">
                <Search size={20} />
              </button>
            </div>
          </div>

          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="filter-section bg-light p-4 rounded mb-4"
            >
              <div className="row g-3">
                <div className="col-md-4">
                  <label className="form-label">Industry</label>
                  <select
                    className="form-select"
                    value={searchFilters.industry}
                    onChange={(e) => setSearchFilters({ ...searchFilters, industry: e.target.value })}
                  >
                    <option value="">All Industries</option>
                    {industries.map((industry) => (
                      <option key={industry} value={industry}>{industry}</option>
                    ))}
                  </select>
                </div>
                <div className="col-md-4">
                  <label className="form-label">Sort By</label>
                  <select
                    className="form-select"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="name">Name</option>
                    <option value="rating">Rating</option>
                    <option value="reviews">Review Count</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      <div className="row g-4">
        {currentCompanies.map((company) => (
          <div key={company.id} className="col-md-6">
            <CompanyCard company={company} id ={userid}/>
          </div>
        ))}
        {currentCompanies.length === 0 && (
          <div className="col-12 text-center py-5">
            <h3>No companies found matching your criteria</h3>
            <p className="text-muted">Try adjusting your search filters</p>
          </div>
        )}
      </div>

      <div className="d-flex justify-content-center my-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            className={`btn ${index + 1 === currentPage ? 'btn-primary' : 'btn-outline-primary'} mx-1`}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <AddButton onClick={() => setShowAddModal(true)} />
      <CompanyModal
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleAddCompany}
      />
    </div>
  );
};

export default Companies;
