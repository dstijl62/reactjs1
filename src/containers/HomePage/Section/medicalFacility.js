import React, { Component } from "react";
import { connect } from "react-redux";
import "./medicalFacility.scss";

import { FormattedMessage } from "react-intl";

import { medicalFacility1 } from "../../../assets/medicalFacility/medicalFacility-img";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
class medicalFacility extends Component {
  render() {
    let settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
    };

    return (
      <section className="team">
        <div className="container">
          {/* =================== HEADER =================== */}
          <div className="team-header">
            <h2 className="section-heading">Cơ Sở Y Tế Nổi Bật</h2>
            <a href="#!" className="btn team__cta">
              Xem thêm
            </a>
          </div>

          {/* =================== BODY =================== */}
          <div className="team__list">
            <Slider {...settings}>
              {/* ITEM 1 */}
              <article className="team-item">
                <div className="mfacility-item__img-bg">
                  <img src={medicalFacility1} alt="medicalFacility1" />
                </div>
                <h3 className="team-item__name">Cơ xương khớp</h3>
                <p className="team-item__desc">
                  DDS, California - Linda University
                </p>
              </article>

              {/* ITEM 2 */}
              <article className="team-item">
                <div className="mfacility-item__img-bg">
                  <img src={medicalFacility1} alt="medicalFacility1" />
                </div>
                <h3 className="team-item__name">Dr. Essence Page</h3>
                <p className="team-item__desc">
                  DDS, California - Linda University
                </p>
              </article>

              {/* ITEM 3 */}
              <article className="team-item">
                <div className="mfacility-item__img-bg">
                  <img src={medicalFacility1} alt="medicalFacility1" />
                </div>
                <h3 className="team-item__name">Dr. Essence Page</h3>
                <p className="team-item__desc">
                  DDS, California - Linda University
                </p>
              </article>

              {/* ITEM 4 */}
              <article className="team-item">
                <div className="mfacility-item__img-bg">
                  <img src={medicalFacility1} alt="medicalFacility1" />
                </div>
                <h3 className="team-item__name">Dr. Essence Page</h3>
                <p className="team-item__desc">
                  DDS, California - Linda University
                </p>
              </article>
              {/* ITEM 5 */}
              <article className="team-item">
                <div className="mfacility-item__img-bg">
                  <img src={medicalFacility1} alt="medicalFacility1" />
                </div>
                <h3 className="team-item__name">Dr. Essence Page</h3>
                <p className="team-item__desc">
                  DDS, California - Linda University
                </p>
              </article>
              {/* ITEM 6 */}
              <article className="team-item">
                <div className="mfacility-item__img-bg">
                  <img src={medicalFacility1} alt="medicalFacility1" />
                </div>
                <h3 className="team-item__name">Dr. Essence Page</h3>
                <p className="team-item__desc">
                  DDS, California - Linda University
                </p>
              </article>
            </Slider>
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

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(medicalFacility);
