import React, { Component } from "react";
import { connect } from "react-redux";
import "./HowItWorks.scss";
import {
  finduser,
  firstaidkit,
  search,
} from "../../../assets/howitworks/Howitworks.js";

class HowItworks extends Component {
  render() {
    return (
      <section className="work">
        <div className="container">
          {/* ===================== Khối How it works =================== */}
          <h2 className="section-heading">How it works</h2>

          <p className="section-desc work__desc">
            Exceptional dental care for all ages. Your great smile begins with a
            great dentist.
          </p>

          {/* =================== BODY =================== */}
          <div className="work__list">
            {/* =============== work item 1 ========== */}
            <section className="work-item">
              <img src={search} alt="Dentist" class="work-item__icon" />
              <h3 className="work-item__heading">Search doctor</h3>
              <p className="work-item__desc">
                Search a doctor by education, qualifications or experience —
                contact for inquiry.
              </p>
              <a href="#!" className="work-item__more">
                Learn More
              </a>
            </section>

            {/* =============== work item 2 ========== */}
            <section className="work-item">
              <img src={finduser} alt="Dentist" class="work-item__icon" />
              <h3 className="work-item__heading">Find best doctor</h3>
              <p className="work-item__desc">
                Search a doctor by education, qualifications or experience —
                contact for inquiry.
              </p>
              <a href="#!" className="work-item__more">
                Learn More
              </a>
            </section>

            {/* =============== work item 3 ========== */}
            <section className="work-item">
              <img src={firstaidkit} alt="Dentist" class="work-item__icon" />
              <h3 className="work-item__heading">Get treatment</h3>
              <p className="work-item__desc">
                Search a doctor by education, qualifications or experience —
                contact for inquiry.
              </p>
              <a href="#!" className="work-item__more">
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

export default connect(mapStateToProps)(HowItworks);
