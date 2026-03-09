import React, { Component } from "react";
import { connect } from "react-redux";
import "./AboutUs.scss";
import { dentist1, dentist2 } from "../../../assets/aboutUs/aboutUs";

class AboutUs extends Component {
  render() {
    return (
      <section className="about">
        <div className="container">
          <div className="about-row">
            {/* about left */}
            <div className="about__media">
              <figure className="about__img">
                <img src={dentist1} alt="Dentist" class="about__img--big" />
                <img src={dentist2} alt="Dentist" class="about__img--small" />
              </figure>
            </div>

            {/* about right */}
            <section className="about-content">
              <h2 className="section-heading">
                Take back your smile with shine.
              </h2>

              <p className="section-desc">
                If you’re missing multiple teeth due to decay, injury, or the
                natural aging process, dentures might be the perfect solution.
              </p>

              <a href="#!" className="btn about-content__btn">
                Learn More
              </a>
            </section>
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

export default connect(mapStateToProps)(AboutUs);
