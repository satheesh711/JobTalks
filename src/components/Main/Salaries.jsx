import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Building2, Briefcase, Clock } from 'lucide-react';
import companiesData from '../../pages/data/companies.json';

const Salaries = () => {
  const [selectedCompany, setSelectedCompany] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

  const allRoles = Array.from(new Set(companiesData.salaries.map(salary => salary.role)));
  const allLocations = Array.from(new Set(companiesData.salaries.map(salary => salary.location)));

  const filteredSalaries = companiesData.salaries.filter(salary => {
    const matchesCompany = !selectedCompany || salary.companyId === parseInt(selectedCompany);
    const matchesRole = !selectedRole || salary.role === selectedRole;
    const matchesLocation = !selectedLocation || salary.location === selectedLocation;
    return matchesCompany && matchesRole && matchesLocation;
  });

  const calculateAverageSalary = (salaries) => {
    if (salaries.length === 0) return 0;
    return Math.round(salaries.reduce((acc, curr) => acc + curr.amount, 0) / salaries.length);
  };

  const averageSalary = calculateAverageSalary(filteredSalaries);

  return (
    <div className="container py-5">
      <div className="row mb-4">
        <div className="col-12">
          <h1 className="mb-4">Salary Insights</h1>

          <div className="card mb-4">
            <div className="card-body">
              <div className="row g-3">
                <div className="col-md-4">
                  <label className="form-label">Company</label>
                  <select
                    className="form-select"
                    value={selectedCompany}
                    onChange={(e) => setSelectedCompany(e.target.value)}
                  >
                    <option value="">All Companies</option>
                    {companiesData.companies.map((company) => (
                      <option key={company.id} value={company.id}>
                        {company.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-4">
                  <label className="form-label">Role</label>
                  <select
                    className="form-select"
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                  >
                    <option value="">All Roles</option>
                    {allRoles.map((role) => (
                      <option key={role} value={role}>{role}</option>
                    ))}
                  </select>
                </div>
                <div className="col-md-4">
                  <label className="form-label">Location</label>
                  <select
                    className="form-select"
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                  >
                    <option value="">All Locations</option>
                    {allLocations.map((location) => (
                      <option key={location} value={location}>{location}</option>
                    ))}
                  </select>
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
                  Based on {filteredSalaries.length} salary reports
                </p>
              </div>
            </motion.div>
          )}

          {filteredSalaries.map((salary) => {
            const company = companiesData.companies.find(c => c.id === salary.companyId);
            
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
                      <div className="d-flex align-items-center mb-2">
                        <Building2 size={20} className="text-primary me-2" />
                        <h5 className="mb-0">{company?.name}</h5>
                      </div>
                      <div className="d-flex align-items-center text-muted small mb-2">
                        <Briefcase size={16} className="me-2" />
                        <span className="me-3">{salary.role}</span>
                        <Clock size={16} className="me-2" />
                        <span>{salary.experience}</span>
                      </div>
                      <div className="text-muted small">
                        {salary.location} • {salary.department}
                      </div>
                    </div>
                    <div className="col-md-6 text-md-end mt-3 mt-md-0">
                      <div className="d-flex align-items-center justify-content-md-end">
                        <DollarSign size={24} className="text-success me-2" />
                        <h4 className="mb-0 text-success">
                          ${salary.amount.toLocaleString()}
                        </h4>
                      </div>
                      <small className="text-muted">
                        Reported on {new Date(salary.date).toLocaleDateString()}
                      </small>
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
    </div>
  );
};

export default Salaries;
