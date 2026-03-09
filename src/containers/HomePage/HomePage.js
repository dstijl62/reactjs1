import React, { Component } from "react";
import { connect } from "react-redux";
import Navbar from "./Navbar";
import HomeHeader from "./HomeHeader";
import Specialty from "./Section/specialty";
import Ourservices from "./Section/Ourservices";
import HowItWorks from "./Section/HowItWorks";
import AboutUs from "./Section/AboutUs";
import InstallMobile from "./Section/InstallMobile";
import Blogs from "./Section/Blogs";
import AppointMent from "./Section/AppointMent";
import Footer from "./Section/Footer";
import MedicalFacility from "./Section/medicalFacility";
import OurDoctor from "./Section/OurDoctor";

class HomePage extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <HomeHeader />
        <Ourservices />
        <HowItWorks />
        <AboutUs />
        <Specialty />
        <MedicalFacility />
        <InstallMobile />
        <Blogs />
        <OurDoctor />
        <AppointMent />
        <Footer />
        {/* <div style={{ height: "300px" }}></div> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
