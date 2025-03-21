import { useEffect, useState } from "react";
import { getTopRolesList } from "../../Services/topRoles";
import { Link } from 'react-router-dom';

const RoleReviews = ({ roleRef }) => {
    const [top, setTop] = useState([]);

    useEffect(() => {
        loadTopRoles();
    }, []);

    const loadTopRoles = async () => {
        try {
            const data = await getTopRolesList();
            setTop(data);
        } catch (error) {
            console.error("Error fetching Highest rated roles:", error);
        }
    };

    return (
        <section ref={roleRef} className="py-5" style={{ backgroundColor: "#f0f2f5" }}>
            <div className="container">
                <h2 className="text-center mb-4">Highest Paid Roles</h2>
                <div className="row g-4">
                    {top.map((role, index) => (
                        <div className="col-md-4" key={index}>
                            <div
                                className="card shadow-sm p-3 d-flex flex-column h-100 border-0"
                                style={{
                                    backgroundColor: "#ffffff",
                                    borderRadius: "12px",
                                    transition: "transform 0.3s ease, box-shadow 0.3s ease"
                                }}
                                onMouseOver={(e) => {
                                    e.currentTarget.style.transform = "scale(1.05)";
                                    e.currentTarget.style.boxShadow = "0 6px 20px rgba(0, 0, 0, 0.15)";
                                }}
                                onMouseOut={(e) => {
                                    e.currentTarget.style.transform = "scale(1)";
                                    e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.08)";
                                }}
                            >
                                <img src={role.companyLogo} alt={role.Logo} className="img-fluid mb-3" style={{ height: "60px", objectFit: "contain" }} />
                                <h5 className="text-primary text-center">{role.title}</h5>

                                <p
                                    className="text-dark fw-bold text-center"
                                    style={{
                                        filter: "blur(1px)",
                                        opacity: "0.5"
                                    }}
                                >
                                    ${role.salaryRange.min} - ${role.salaryRange.max} / year
                                </p>



                                {role.responsibilities && role.responsibilities.length > 0 && (
                                    <p className="mb-1 small"><strong>Responsibilities:</strong> {role.responsibilities[0]}{role.responsibilities.length > 1 ? ' and more...' : ''}</p>
                                )}

                                <div className="mt-auto">
                                    <Link to="/login" className="btn btn-outline-primary w-100">
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>


    );
};

export default RoleReviews;
