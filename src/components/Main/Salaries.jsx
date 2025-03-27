import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import Select from 'react-select';
import AddButton from './Addbutton';
import { addRole, companies as getCompanies, getSalaryInsights } from '../../Services/companies';
import RoleModel from './RoleModel';
import { MapPin } from 'lucide-react';

const Salaries = () => {
  const location = useLocation();
  const id = location.state?.id;
  const [selectedCompany, setSelectedCompany] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [companies, setCompanies] = useState([]);
  const [salaryInsights, setSalaryInsights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showRoleModal, setShowRoleModal] = useState(false);

  const handleAddRole = async (role) => {
    const id = role.companyId;
    delete role.companyId;
    await addRole({ ...role }, id);
    setShowRoleModal(false);
    fetchCompanies();
    fetchSalaryInsights();
  };

  const fetchCompanies = async () => {
    try {
      setLoading(true);
      const response = await getCompanies();
      setCompanies(response);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching companies:", err);
      setError("Failed to load company data. Please try again later.");
      setLoading(false);
    }
  };

  const fetchSalaryInsights = async () => {
    try {
      const response = await getSalaryInsights();
      setSalaryInsights(response);
    } catch (err) {
      console.error("Error fetching salary insights:", err);
      setError("Failed to load salary insights. Please try again later.");
    }
  };

  useEffect(() => {
    fetchCompanies();
    fetchSalaryInsights();
  }, []);

  const allRoles = React.useMemo(() => {
    const roles = [];
    companies.forEach(company => {
      if (company.roles && Array.isArray(company.roles)) {
        company.roles.forEach(role => {
          if (!roles.some(r => r.title === role.title)) {
            roles.push({ ...role });
          }
        });
      }
    });
    return roles;
  }, [companies]);

  const allLocations = React.useMemo(() => {
    return Array.from(new Set(companies.map(company => company.location)));
  }, [companies]);

  const filteredSalaries = React.useMemo(() => {
    return salaryInsights.filter(salary => {
      const matchesCompany = !selectedCompany || salary.companyId === selectedCompany;
      const matchesRole = !selectedRole || salary.role === selectedRole;
      const matchesLocation = !selectedLocation || salary.location === selectedLocation;
      return matchesCompany && matchesRole && matchesLocation;
    });
  }, [salaryInsights, selectedCompany, selectedRole, selectedLocation]);

  const averageSalary = React.useMemo(() => {
    if (filteredSalaries.length === 0) return 0;
    return Math.round(filteredSalaries.reduce((acc, curr) => acc + curr.amount, 0) / filteredSalaries.length);
  }, [filteredSalaries]);

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading salary data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="row mb-4">
        <div className="row g-3 sticky-top bg-light shadow-sm mb-3 pb-3" style={{ top: '60px', zIndex: 1 }}>
          <div className="card-body">
            <div className="row g-3">
              <h1 className="mb-0">Salary Insights</h1>
              <div className="col-md-4 col-7">
                <Select
                  options={[{ value: '', label: 'All Companies' }, ...companies.map((company) => ({
                    value: company.id,
                    label: company.name
                  }))]}
                  value={companies.find((company) => company.id === selectedCompany)
                    ? { value: selectedCompany, label: companies.find((company) => company.id === selectedCompany)?.name }
                    : { value: '', label: 'All Companies' }
                  }
                  onChange={(selectedOption) => setSelectedCompany(selectedOption?.value || '')}
                  isSearchable
                  placeholder="Select or type a company..."
                />
              </div>
              <div className="col-md-4 col-5">
                <Select
                  options={[{ value: '', label: 'All Roles' }, ...allRoles.map((role) => ({
                    value: role.title,
                    label: role.title
                  }))]}
                  value={selectedRole
                    ? { value: selectedRole, label: selectedRole }
                    : { value: '', label: 'All Roles' }
                  }
                  onChange={(selectedOption) => setSelectedRole(selectedOption?.value || '')}
                  isSearchable
                  placeholder="Select or type a role..."
                />
              </div>
              <div className="col-md-4">
                <Select
                  options={[{ value: '', label: 'All Locations' }, ...allLocations.map((loc) => ({
                    value: loc,
                    label: loc
                  }))]}
                  value={selectedLocation
                    ? { value: selectedLocation, label: selectedLocation }
                    : { value: '', label: 'All Locations' }
                  }
                  onChange={(selectedOption) => setSelectedLocation(selectedOption?.value || '')}
                  isSearchable
                  placeholder="Select or type a location..."
                />
              </div>
            </div>
          </div>
        </div>

        {filteredSalaries.length > 0 && (
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
                Based on {filteredSalaries.length} role{filteredSalaries.length !== 1 ? 's' : ''}
              </p>
            </div>
          </motion.div>
        )}

        {filteredSalaries.map((salary) => {
          return (
            <motion.div
              key={salary.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="card mb-3 shadow-sm"
            >
              <div className="card-body">
                <div className='row align-items-between'>
                  <div className="row align-items-center col-md-6">
                    <div className="col-12 d-md-none text-center mb-3">
                      <h4 className="text-primary opacity-75">{salary.role}</h4>
                    </div>
                    <div className="col-md-6 d-none d-md-block">
                      <h4 className="me-3 text-primary opacity-75">{salary.role}</h4>
                    </div>

                    <div className="col-6 col-md-12 text-start">
                      <h6 className="mb-0 text-dark">{salary.companyName}</h6>
                      <span className="text-muted small">({salary.department})</span>
                    </div>
                    <div className="col-6 col-md-12 text-md-start text-end text-muted small">
                      <MapPin size={16} className="me-1" />
                      {salary.location}
                    </div>

                    <div className="col-12 mt-3">
                      {salary.benefits && salary.benefits.length > 0 && (
                        <p className="small mb-1"><strong>Benefits:</strong> {salary.benefits.join(", ")}</p>
                      )}

                      {salary.requirements && salary.requirements.length > 0 && (
                        <p className="small"><strong>Requirements:</strong>
                          {salary.requirements[0]}{salary.requirements.length > 1 ? ' and more...' : ''}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6 text-md-end mt-3 d-flex justify-content-md-end row text-center align-items-md-start">
                    <div>
                      <h4 className="mb-0 text-success">
                        ${Math.round(salary.amount).toLocaleString()}
                      </h4>
                      <small className="text-muted d-block">
                        Range: ${salary.minAmount.toLocaleString()} - ${salary.maxAmount.toLocaleString()}
                      </small>
                    </div>

                    <div className="col-12 col-md-4 text-start ">
                      <Link
                        className="btn btn-sm btn-outline-primary w-100"
                        to={`/home/companies/${salary.companyId}`}
                        state={{ id }}
                      >
                        View Company
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

          );
        })}
        {filteredSalaries.length === 0 && (
          <div className="text-center py-5">
            <h3>No salary data found</h3>
            <p className="text-muted">Try adjusting your filters</p>
          </div>
        )}
      </div>
      <AddButton onClick={() => setShowRoleModal(true)} />
      <RoleModel
        show={showRoleModal}
        onClose={() => setShowRoleModal(false)}
        onSubmit={handleAddRole}
        companiesdata={companies}
      />
    </div>
  );
};

export default Salaries;