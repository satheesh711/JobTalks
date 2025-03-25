import React, { useRef } from "react";
import Footer from "../../components/Landing/Footer";
import HeroSection from "../../components/Landing/HeroSection";
import Navbar from "../../components/Landing/Navbar";
import About from "../../components/Landing/About";
import RoleReviews from "../../components/Landing/RoleReviews";
import CompanyReviews from "../../components/Landing/CompanyReviews";

const Landing = () => {
    const homeRef = useRef(null);
    const companyRef = useRef(null);
    const roleRef = useRef(null)
    const footerRef = useRef(null);
    const aboutRef = useRef(null)

    return (
        <div>
            <Navbar homeRef={homeRef} aboutRef={aboutRef} companyRef={companyRef} roleRef={roleRef} footerRef={footerRef} />
            <HeroSection homeRef={homeRef} />
            <About aboutRef={ aboutRef }/>
            <CompanyReviews companyRef={companyRef} />
            <RoleReviews roleRef={roleRef}/>
            <Footer footerRef={footerRef} />
        </div>
    );
};

export default Landing;
