import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Navbars from "../../components/Navbars";
import Header from "../../components/Header";
import LandingSections from "../../components/LandingSections";
import Footer from "../../components/Footer";

const JobTalksLanding = () => {
  return (
    <div>
      <Navbars />
      <Header />
      <LandingSections />
      <Footer />
    </div>
  );
};

export default JobTalksLanding;
