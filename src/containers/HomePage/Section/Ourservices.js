import React, { Component } from "react";
import { connect } from "react-redux";
import "./Ourservices.scss";
import { dentist2, Teeth } from "../../../assets/Ourservices/ourService-img";

class Ourservices extends Component {
  render() {
    return (
      <section className="service">
        <div className="container">
          {/* =================== HEADER =================== */}
          <h2 className="service__heading section-heading">Our services</h2>
          <p className="service__desc section-desc">
            Exceptional dental care for all ages. Your great smile begins with a
            great dentist.
          </p>

          {/* =================== BODY =================== */}
          <div className="service__row">
            {/* service left */}
            <figure>
              {/* <img src={dentist2} alt="Dentist" className="service__img" /> */}
              <iframe
                className="service__img"
                width="993"
                height="240"
                src="https://www.youtube.com/embed/5DUXdmoVAGA?list=PLhThj1C8DuL1uJUov1bFJX0HEl_uJY-U8"
                title="基本情報技術者試験📝受験前に知りたいテスト形式"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
              ></iframe>
            </figure>

            {/* service right */}
            <div className="service__list">
              {/* item 1 */}
              <section className="service-item">
                <div className="service-item__icon">
                  <img src={Teeth} alt="Dentist" />
                </div>
                <div className="service-item__body">
                  <div className="service-item__heading">Oral Surgery</div>
                  <div className="service-item__desc">
                    Everything you expect and then some. Cleanings, fillings,
                    and x-rays.
                  </div>
                </div>
              </section>

              {/* item 2 */}
              <section className="service-item">
                <div className="service-item__icon">
                  <img src={Teeth} alt="Dentist" />
                </div>
                <div className="service-item__body">
                  <div className="service-item__heading">
                    Wisdom Teeth Removal
                  </div>
                  <div className="service-item__desc">
                    Everything you expect and then some. Cleanings, fillings,
                    and x-rays.
                  </div>
                </div>
              </section>

              {/* item 3 */}
              <section className="service-item">
                <div className="service-item__icon">
                  <img src={Teeth} alt="Dentist" />
                </div>
                <div className="service-item__body">
                  <div className="service-item__heading">
                    Preventative Dentistry
                  </div>
                  <div className="service-item__desc">
                    Everything you expect and then some. Cleanings, fillings,
                    and x-rays.
                  </div>
                </div>
              </section>

              {/* button */}
              <a href="#!" className="btn service__btn">
                All Services
              </a>
            </div>
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

export default connect(mapStateToProps)(Ourservices);
