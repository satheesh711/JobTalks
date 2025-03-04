import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min';
import logo from "../assets/Logo.ico"
const Navbars = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
            <div className="container">
                <img src={logo} alt="" className="opacity-75 rounded-circle"/>
                <a className="navbar-brand fw-bold fs-4 m-2" href="#">JobTalks</a>
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
                        <li className="nav-item"><a className="nav-link" href="#">Home</a></li>
                        <li className="nav-item"><a className="nav-link" href="#reviews">Companies</a></li>
                        <li className="nav-item"><a className="nav-link" href="#jobs">Roles</a></li>
                        <li className="nav-item mt-2 mt-lg-0">
                            <a className="btn btn-outline-primary" href="#">Sign Up</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}
export default Navbars;