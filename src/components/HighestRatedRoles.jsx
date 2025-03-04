import { useEffect, useState } from "react";
import { getHighestListRoles } from "../Services/HighestRatedRoles";

const HighestRatedRoles = () => {
    const [Highest, setHighest] = useState([]);
    useEffect(() => {
        loadHighest()
    }, [])
    const loadHighest = async () => {
        try {
            const data = await getHighestListRoles()
            setHighest(data)
        }
        catch (error) {
            console.error("Error fetching Highest rated companies:", error)
        }
    }
    return (
        <section id="jobs" className="bg-light py-5">
            <div className="container">
                <h2 className="text-center mb-4">Highest rated Roles</h2>
                <div className="row">
                    {
                        Highest.map(
                            (role, index) => (
                                <div className="col-md-4" key={index}>
                                    <div className="card shadow-sm p-3 d-flex flex-column h-100">
                                        <h5>{role.Role}</h5>
                                        <p className="flex-grow-1">{role.company} | {role.location}</p> {/* Make paragraph stretch */}
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
export default HighestRatedRoles;