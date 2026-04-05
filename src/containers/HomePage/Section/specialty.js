import React, { Component } from "react";
import { connect } from "react-redux";
import "./specialty.scss";

import { FormattedMessage } from "react-intl";

import { doctor1 } from "../../../assets/specialty/specialty-icon";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getAllSpecialty } from "../../../services/userService";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";

class Specialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSpecialty: [],
    };
  }
  async componentDidMount() {
    let res = await getAllSpecialty();
    console.log(" check response specialty: ", res);
    if (res && res.errCode === 0) {
      this.setState({
        dataSpecialty: res.data,
      });
    }
  }

  handleViewDetailSpecialty = (item) => {
    if (this.props.history) {
      this.props.history.push(`/detail-specialty/${item.id}`);
    }
  };

  render() {
    let settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
    };

    let { dataSpecialty } = this.state;

    return (
      <section className="specialty">
        <div className="container">
          {/* =================== HEADER =================== */}
          <div className="specialty-header">
            <h2 className="section-heading">Chuyên khoa phổ biến</h2>
            <a href="#!" className="btn specialty__cta">
              Xem thêm
            </a>
          </div>

          {/* =================== BODY =================== */}
          <div className="specialty__list">
            <Slider {...settings}>
              {dataSpecialty &&
                dataSpecialty.length > 0 &&
                dataSpecialty.map((item, index) => {
                  return (
                    <div
                      onClick={() => this.handleViewDetailSpecialty(item)}
                      className="specialty-item"
                      key={index}
                    >
                      <div className="specialty-item__img-bg">
                        <img src={item.image} alt="Dentist" />
                      </div>
                      <h3 className="specialty-item__name">{item.name}</h3>
                      {/* <p className="specialty-item__desc">
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
  connect(mapStateToProps, mapDispatchToProps)(Specialty),
);
