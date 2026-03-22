import React, { Component } from "react";
import { connect } from "react-redux";
import "./OurDoctor.scss";

import { FormattedMessage } from "react-intl";

import { doctor1 } from "../../../assets/ourDoctor/ourDoctor-img";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { LANGUAGES } from "../../../utils";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";

import * as actions from "../../../store/actions";

class OurDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctors: [],
    };
  }

  componentDidUpdate(preProps, prevState, snapshot) {
    if (preProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
      this.setState({
        arrDoctors: this.props.topDoctorsRedux,
      });
    }
  }

  componentDidMount() {
    this.props.loadTopDoctors();
  }

  handleViewDetailDoctor = (doctor) => {
    console.log(" Check view infor: ", doctor);
    if (this.props.history) {
      this.props.history.push(`/detail-doctor/${doctor.id}`);
    }
  };
  render() {
    let arrDoctors = this.state.arrDoctors;
    let { language } = this.props;
    // arrDoctors = arrDoctors.concat(arrDoctors).concat(arrDoctors);
    console.log(" check topDoctorsRedux: ", this.props.topDoctorsRedux);

    let settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
    };

    return (
      <section className="team">
        <div className="container">
          {/* =================== HEADER =================== */}
          <div className="team-header">
            <h2 className="section-heading">
              <FormattedMessage id="homepage.out-standing-doctor" />
            </h2>
            <a href="#!" className="btn team__cta">
              <FormattedMessage id="homepage.more-infor" />
            </a>
          </div>

          {/* =================== BODY =================== */}
          <div className="team__list">
            <Slider {...settings}>
              {arrDoctors &&
                arrDoctors.length > 0 &&
                arrDoctors.map((item, index) => {
                  let imageBase64 = "";
                  if (item.image) {
                    imageBase64 = new Buffer(item.image, "base64").toString(
                      "binary",
                    );
                  }
                  let nameVi = `${item.positionData.valueVi}, ${item.lastName} ${item.firstName}`;
                  let nameEn = `${item.positionData.valueEn}, ${item.firstName} ${item.lastName}`;
                  return (
                    <article
                      className="team-item"
                      onClick={() => this.handleViewDetailDoctor(item)}
                    >
                      <div className="team-item__img-bg doctor-slider-img">
                        <img
                          src={imageBase64}
                          alt="Dentist"
                          className="doctor-img"
                        />
                      </div>
                      <h3 className="team-item__name">Cơ xương khớp</h3>
                      <p className="team-item__desc">
                        {language === LANGUAGES.VI ? nameVi : nameEn}
                      </p>
                    </article>
                  );
                })}
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
    topDoctorsRedux: state.admin.topDoctors,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadTopDoctors: () => dispatch(actions.fetchTopDoctor()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(OurDoctor),
);
