import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import AddButton from './Addbutton';
import { addRole, companies as getCompanies } from '../../Services/companies';
import RoleModel from './RoleModel';

const Salaries = () => {
  const [selectedCompany, setSelectedCompany] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showRoleModal, setShowRoleModal] = useState(false);
  

const handleAddRole = async (role) => {
    const id = role.companyId
    delete role.companyId
    await addRole({ ...role }, id);
    setShowRoleModal(false);
    fetchCompanies()
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
  useEffect(() => {
    fetchCompanies();
  }, []);

  const allRoles = React.useMemo(() => {
    const roles = [];
    companies.forEach(company => {
      if (company.roles && Array.isArray(company.roles)) {
        company.roles.forEach(role => {
          if (!roles.some(r => r.title === role.title)) {
            roles.push({...role});
          }
        });
      }
    });
    return roles;
  }, [companies]);

  const allLocations = React.useMemo(() => {
    return Array.from(new Set(companies.map(company => company.location)));
  }, [companies]);

  const salaryInsights = React.useMemo(() => {
    const insights = [];

    companies.forEach(company => {
      if (company.roles && Array.isArray(company.roles)) {
        company.roles.forEach(role => {
          const avgSalary = (role.salaryRange.min + role.salaryRange.max) / 2;

          insights.push({
            id: `${company.id}-${role.id}`,
            companyId: company.id,
            companyName: company.name,
            role: role.title,
            department: role.department,
            amount: avgSalary,
            minAmount: role.salaryRange.min,
            maxAmount: role.salaryRange.max,
            location: role.location,
            experience: "Based on role requirements",
            benefits: role.benefits,
            requirements: role.requirements,
            date: new Date().toISOString(), 
            currency: role.salaryRange.currency || "USD"
          });
        });
      }
    });

    return insights;
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
    <div className="container py-5">
      <div className="row mb-4">
        <h1 className="mb-4">Salary Insights</h1>

        <div className="card mb-4">
          <div className="card-body">
            <div className="row g-3">
              <div className="col-md-4">
                <label className="form-label">Company</label>
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
              <div className="col-md-4">
                <label className="form-label">Role</label>

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
                <label className="form-label">Location</label>

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
                  <div className="row align-items-center">
                    <div className="col-md-6">
                        <h4 className="me-3">{salary.role}</h4>
                      <div className="d-flex align-items-center text-muted small mb-2">
                      <div className="d-flex align-items-center mb-2">
                        <h6 className="mb-0 text-dark me-1">{salary.companyName}</h6>
                        <span >{`(${salary.department})`}</span>
                      </div>
                        
                      </div>
                      <div className="text-muted small mb-2">
                        {salary.location}
                      </div>

                      {salary.benefits && salary.benefits.length > 0 && (
                        <div className="mt-2 small">
                          <p className="mb-1"><strong>Benefits:</strong> {salary.benefits.join(", ")}</p>
                        </div>
                      )}

                      {salary.requirements && salary.requirements.length > 0 && (
                        <div className="small">
                          <p className="mb-1"><strong>Requirements:</strong> {salary.requirements[0]}{salary.requirements.length > 1 ? ' and more...' : ''}</p>
                        </div>
                      )}
                    </div>
                    <div className="col-md-6 text-md-end mt-3 mt-md-0">
                      <div className="d-flex align-items-center justify-content-md-end">
                        <h4 className="mb-0 text-success">
                          ${Math.round(salary.amount).toLocaleString()}
                        </h4>
                      </div>
                      <small className="text-muted mb-2 d-block">
                        Range: ${salary.minAmount.toLocaleString()} - ${salary.maxAmount.toLocaleString()}
                      </small>
                      <div className="mt-2">
                        <Link
                          className="btn btn-sm btn-outline-primary"
                          to={`/home/companies/${salary.companyId}`}
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