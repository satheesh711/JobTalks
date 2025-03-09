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
        <section ref={roleRef} className="bg-light py-5">
            <div className="container">
                <h2 className="text-center mb-4">Highest Rated Roles</h2>
                <div className="row g-4">
                    {top.map((role, index) => (
                        <div className="col-md-4" key={index}>
                            <div
                                className="card shadow-sm p-3 d-flex flex-column h-100"
                                style={{
                                    transition: "transform 0.3s ease, box-shadow 0.3s ease"
                                }}
                                onMouseOver={(e) => {
                                    e.currentTarget.style.transform = "scale(1.05)";
                                    e.currentTarget.style.boxShadow = "0 6px 20px rgba(0, 0, 0, 0.2)";
                                }}
                                onMouseOut={(e) => {
                                    e.currentTarget.style.transform = "scale(1)";
                                    e.currentTarget.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.1)";
                                }}
                            >
                                <img
                                    src={role.image}
                                    alt={role.Role}
                                    className="img-fluid mb-3"
                                    style={{ height: "80px", objectFit: "contain" }}
                                />
                                <h5 className="text-primary">{role.Role}</h5>
                                <p className="text-muted flex-grow-1">{role.description}</p>
                                <div className="mt-auto">
                                    <Link to="/login" className="btn btn-outline-primary w-100">
                                        View Details
                                    </Link>                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default RoleReviews;
