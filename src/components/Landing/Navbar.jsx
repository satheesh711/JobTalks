import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../../assets/Logo.ico";
import { guestLogin } from "../../Services/users";
import { useIdContext } from "../Main/IdContext";

const Navbar = ({ homeRef, aboutRef, companyRef, roleRef, footerRef }) => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { setId }= useIdContext();
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

    const handleGuest = async () => {
        setLoading(true);

        try {
            const check = await guestLogin();
            if(check)
            {
                
            setTimeout(() => {
                setId(check.data.id);
                setLoading(false);
                navigate("/home");

                toast.success(" Logged in as Guest", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "colored",
                });
            }, 1000);
        }
        else
        {
            setLoading(false);
            toast.error(" Login failed. Please try again.", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
            });
        }
        } catch (error) {
            setLoading(false);
            toast.error(" Login failed. Please try again.", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
            });
        }
    };

    return (
        <>
            {loading && (
                <div className="loading-overlay">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            )}

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
                                    Contact us
                                </button>
                            </li>
                            <li className="nav-item mt-2 mt-lg-0 m-1">
                                <button
                                    className="btn btn-outline-primary"
                                    onClick={() => navigate("/login")}
                                >
                                    Login
                                </button>
                            </li>
                            <li className="nav-item mt-2 mt-lg-0">
                                <button
                                    className="btn btn-outline-primary"
                                    onClick={handleGuest}
                                    disabled={loading}
                                >
                                    Guest
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>


            <style>
                {`
                    .loading-overlay {
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background-color: rgba(255, 255, 255, 0.8); /* Transparent white */
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        z-index: 9999;
                    }

                    .spinner-border {
                        width: 3rem;
                        height: 3rem;
                    }
                `}
            </style>
        </>
    );
};

export default Navbar;
