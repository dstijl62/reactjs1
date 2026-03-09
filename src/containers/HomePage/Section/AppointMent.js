import React, { Component } from "react";
import { connect } from "react-redux";
import "./AppointMent.scss";

class AppointMent extends Component {
  render() {
    return (
      <section className="appointment">
        <div className="container">
          <div className="appointment__inner">
            <h2 className="section-heading appointment__heading">
              Always welcoming new patients
            </h2>

            <p className="section-desc appointment__desc">
              Take control of your dental health and get the personalized care
              you deserve. Call (541) 772-8846 to schedule
            </p>

            <a href="#!" className="btn appointment__btn">
              Appointment
            </a>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

export default connect(mapStateToProps)(AppointMent);
