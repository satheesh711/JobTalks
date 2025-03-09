import { useEffect, useState } from "react";
import { getTopCompaniesList } from "../../Services/topCompanies";
import { Link } from 'react-router-dom';

const CompanyReviews = ({ companyRef }) => {
    const [top, setTop] = useState([]);
    useEffect(() => {
        loadTopCompanies()
    }, [])
    const loadTopCompanies = async () => {
        try {
            const data = await getTopCompaniesList()
            setTop(data)
        }
        catch (error) {
            console.error("Error fetching Highest rated companies:", error)
        }
    }
    return (
        <section id="reviews" className="py-5" ref={companyRef}>
            <div className="container">
                <h2 className="text-center mb-4">Highest rated Companies</h2>
                <div className="row g-4">
                    {
                        top.map(
                            (company, index) => (
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
                                        <img src={company.logo} alt={company.company} className="img-fluid mb-3" style={{ height: "60px", objectFit: "contain" }} />
                                        <h5>{company.company}</h5>
                                        <p className="flex-grow-1">{company.OverallReview}</p>
                                        <div className="mt-auto">
                                            <Link to="/login" className="btn btn-outline-primary w-100">
                                                View Details
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            )
                        )
                    }
                </div>
            </div>
        </section>
    )
}

export default CompanyReviews;
