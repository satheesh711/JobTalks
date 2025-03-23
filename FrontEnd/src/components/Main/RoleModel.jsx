import { useState } from 'react';
import { motion } from 'framer-motion';


const RoleModel = ({show, onClose, onSubmit, companiesdata}) => {
    const [formData, setFormData] = useState({
        companyId: '',
        title: '',
        department: '',
        level: '',
        type: '',
        location: '',
        salaryRange: { min: '', max: '' },
        requirements: '',
        responsibilities: '',
        benefits: '',
    });
    const handleSubmit = (e) => {
        e.preventDefault();

        onSubmit({
            ...formData,
            id: new Date().toISOString().replace(/[-:.TZ]/g, ''),
            requirements: formData.requirements.split(','),
            responsibilities: formData.responsibilities.split(','),
            benefits: formData.benefits.split(','),
            salaryRange: {
                min: Number(formData.salaryRange.min),
                max: Number(formData.salaryRange.max),
            }    
        }
        );
        onClose();
    };
    if (!show) return null;
    return (        
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <motion.div 
                className="modal-dialog modal-lg"
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
            >
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Add Company Role</h5>
                        <button type="button" className="btn-close" onClick={()=>{onClose()
                            setFormData({
                                companyId: '',
                                title: '',
                                department: '',
                                level: '',
                                type: '',
                                location: '',
                                salaryRange: { min: '', max: '' },
                                requirements: '',
                                responsibilities: '',
                                benefits: '',
                            })
                        }}></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label">Company</label>
                                <select
                                    className="form-select"
                                    value={formData.companyId}
                                    onChange={(e) => setFormData({ ...formData, companyId: e.target.value })}
                                    required
                                >
                                    <option value="">Select a company</option>
                                    {companiesdata.map(company => (
                                        <option key={company.id} value={company.id}>{company.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Role Title</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className='form-label'>Role Department</label>
                                <input
                                    type="text" 
                                    className="form-control"
                                    value={formData.department}
                                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Role Level</label>
                                <select
                                    className="form-select"
                                    value={formData.level}
                                    onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                                    required
                                >
                                    <option value="">Select a level</option>
                                    {['Intern', 'Entry', 'Mid', 'Senior', 'Lead', 'Manager', 'Director', 'Executive'].map(level => (
                                        <option key={level} value={level}>{level}</option>  
                                    ))}
                                </select>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Role Type</label>
                                <select
                                    className="form-select"
                                    value={formData.type}
                                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                    required
                                >
                                    <option value="">Select a type</option>
                                    {['Full-time', 'Part-time', 'Contract', 'Internship'].map(type => (
                                        <option key={type} value={type}>{type}</option>  
                                    ))}
                                </select>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Role Location</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={formData.location}
                                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Role Salary Range</label>
                                <div className="d-flex gap-3">
                                    <input
                                        type="number"
                                        className="form-control"
                                        value={formData.salaryRange.min}
                                        onChange={(e) => setFormData({ ...formData, salaryRange: { ...formData.salaryRange, min: e.target.value } })}
                                        required
                                    />
                                    <input
                                        type="number"
                                        className="form-control"
                                        value={formData.salaryRange.max}
                                        onChange={(e) => setFormData({ ...formData, salaryRange: { ...formData.salaryRange, max: e.target.value } })}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Role Requirements</label>
                                <textarea
                                    className="form-control"
                                    value={formData.requirements}
                                    onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Role Responsibilities</label>
                                <textarea
                                    className="form-control"
                                    value={formData.responsibilities}
                                    onChange={(e) => setFormData({ ...formData, responsibilities: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Role Benefits</label>
                                <textarea
                                    className="form-control"
                                    value={formData.benefits}
                                    onChange={(e) => setFormData({ ...formData, benefits: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={()=>{onClose()
                                    setFormData({
                                        companyId: '',
                                        title: '',
                                        department: '',
                                        level: '',
                                        type: '',
                                        location: '',
                                        salaryRange: { min: '', max: '' },
                                        requirements: '',
                                        responsibilities: '',
                                        benefits: '',
                                    })
                                }
                            }>Cancel</button>
                                <button type="submit" className="btn btn-primary">Add Role</button> 
                            </div>
                        </form>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
export default RoleModel;