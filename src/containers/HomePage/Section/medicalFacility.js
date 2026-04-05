import React, { Component } from "react";
import { connect } from "react-redux";
import "./medicalFacility.scss";

import { FormattedMessage } from "react-intl";

import { medicalFacility1 } from "../../../assets/medicalFacility/medicalFacility-img";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getAllClinic } from "../../../services/userService";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";

class medicalFacility extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataClinics: [],
    };
  }

  async componentDidMount() {
    let res = await getAllClinic();
    console.log(" check response getAllClinic: ", res);
    if (res && res.errCode === 0) {
      this.setState({
        dataClinics: res.data ? res.data : [],
      });
    }
  }

  handleViewDetailClinic = (clinic) => {
    if (this.props.history) {
      this.props.history.push(`/detail-clinic/${clinic.id}`);
    }
  };

  render() {
    let settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
    };

    let { dataClinics } = this.state;

    return (
      <section className="clinic">
        <div className="container">
          {/* =================== HEADER =================== */}
          <div className="clinic-header">
            <h2 className="section-heading">Cơ Sở Y Tế Nổi Bật</h2>
            <a href="#!" className="btn clinic__cta">
              Xem thêm
            </a>
          </div>

          {/* =================== BODY =================== */}
          <div className="clinic__list">
            <Slider {...settings}>
              {dataClinics &&
                dataClinics.length > 0 &&
                dataClinics.map((item, index) => {
                  return (
                    <div
                      onClick={() => this.handleViewDetailClinic(item)}
                      className="clinic-item"
                      key={index}
                    >
                      <div className="mfacility-item__img-bg">
                        <img src={item.image} alt="medicalFacility1" />
                      </div>
                      <h3 className="clinic-item__name">{item.name}</h3>
                      {/* <p className="clinic-item__desc">
                        DDS, California - Linda University
                      </p> */}
                    </div>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(medicalFacility),
);
