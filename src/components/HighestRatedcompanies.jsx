import { useEffect, useState } from "react";
import { getHighestCompaniesList } from "../Services/HighestRatedCompaniesData";

const HighestRatedCompanies = () => {
    const [Highest, setHighest] = useState([]);
    useEffect(() => {
        loadHighest()
    }, [])
    const loadHighest = async () => {
        try {
            const data = await getHighestCompaniesList()
            setHighest(data)
        }
        catch (error) {
            console.error("Error fetching Highest rated companies:", error)
        }
    }
    return (
        <section id="reviews" className="py-5">
            <div className="container">
                <h2 className="text-center mb-4">Highest rated Companies</h2>
                <div className="row">
                    {
                        Highest.map(
                            (company, index) => (
                                <div className="col-md-4" key={index}>
                                    <div className="card shadow-sm p-3 d-flex flex-column h-100">
                                        <h5>{company.company}</h5>
                                        <p className="flex-grow-1">{company.OverallReview}</p> {/* Make paragraph stretch */}
                                        <a href="#" className="btn btn-primary">View Now</a>
                                    </div>
                                </div>
                            )
                        )
                    }
                </div>
            </div>
        </section >
    )
}
export default HighestRatedCompanies;