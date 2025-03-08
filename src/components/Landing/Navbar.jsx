import { useNavigate } from "react-router-dom";
import logo from "../../assets/Logo.ico";

const Navbar = ({ homeRef, aboutRef, companyRef,roleRef, footerRef }) => {
    const navigate = useNavigate();

    const closeNavbar = () => {
        const navbar = document.getElementById("navbarNav");
        if (navbar.classList.contains("show")) {
            navbar.classList.remove("show");
        }
    };

    const scrollToSection = (ref) => {
        if (ref && ref.current) {
            ref.current.scrollIntoView({ behavior: "smooth" });
        }
        closeNavbar();
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm sticky-top">
            <div className="container">
                <img src={logo} alt="Logo" className="opacity-75 rounded-circle" />
                <button
                    className="navbar-brand fw-bold fs-4 m-2 btn btn-link text-decoration-none"
                    onClick={() => scrollToSection(homeRef)}
                >
                    JobTalks
                </button>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto text-center">
                        <li className="nav-item">
                            <button
                                className="nav-link btn btn-link text-decoration-none"
                                onClick={() => scrollToSection(aboutRef)}
                            >
                                About
                            </button>
                        </li>
                        <li className="nav-item">
                            <button
                                className="nav-link btn btn-link text-decoration-none"
                                onClick={() => scrollToSection(companyRef)}
                            >
                                Companies
                            </button>
                        </li>
                        <li className="nav-item">
                            <button
                                className="nav-link btn btn-link text-decoration-none"
                                onClick={() => scrollToSection(roleRef)}
                            >
                                Roles
                            </button>
                        </li>
                        <li className="nav-item">
                            <button
                                className="nav-link btn btn-link text-decoration-none"
                                onClick={() => scrollToSection(footerRef)}
                            >
                                Footer
                            </button>
                        </li>
                        <li className="nav-item mt-2 mt-lg-0">
                            <button
                                className="btn btn-outline-primary"
                                onClick={() => navigate("/Auth")}
                            >
                                Login
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
