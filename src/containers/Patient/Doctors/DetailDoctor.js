import React, { Component } from "react";
import { connect } from "react-redux";
import { Fragment } from "react";
import Navbar from "../../HomePage/Navbar";
import HomeHeader from "../../HomePage/HomeHeader";
import Footer from "../../HomePage/Section/Footer";
import "./DetailDoctor.scss";

import { doctor1 } from "../../../assets/ourDoctor/ourDoctor-img";
import { getDetailInforDoctor } from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
import DoctorSchedule from "./DoctorSchedule";
import DoctorExtraInfor from "./DoctorExtraInfor";

class DetailDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailDoctor: {},
      currentDoctorId: -1,
    };
  }

  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;
      this.setState({
        currentDoctorId: id,
      });
      let res = await getDetailInforDoctor(id);
      console.log(" Check response: ", res);
      if (res && res.errCode === 0) {
        this.setState({
          detailDoctor: res.data,
        });
      }
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {}

  render() {
    console.log("Check state: ", this.state);
    let { language } = this.props;
    let { detailDoctor } = this.state;
    let nameVi = "",
      nameEn = "";
    if (detailDoctor && detailDoctor.positionData) {
      nameVi = `${detailDoctor.positionData.valueVi}, ${detailDoctor.lastName} ${detailDoctor.firstName}`;
      nameEn = `${detailDoctor.positionData.valueEn}, ${detailDoctor.firstName} ${detailDoctor.lastName}`;
    }
    return (
      <React.Fragment>
        <Navbar />
        {/* <HomeHeader /> */}
        <div className="doctor-detail-container">
          <div className="intro-doctor">
            <div className="doctor-detail-header pb-5 border-bottom">
              <div className="container">
                <div className="row align-items-center gx-md-5">
                  {/* Left block */}
                  <div className="col-md-3 mt-3 mt-md-0">
                    <div className="doctor-item__img-bg">
                      <img
                        src={detailDoctor.image ? detailDoctor.image : ""}
                        alt="Doctor"
                      />
                    </div>
                  </div>
                  {/* Right block */}
                  <div className="col-md-9">
                    <h1 className="fs-3 fst-normal">
                      {language === LANGUAGES.VI ? nameVi : nameEn}
                    </h1>

                    <p className="fs-5 fw-light text-secondary">
                      {detailDoctor.Markdown &&
                        detailDoctor.Markdown.description && (
                          <span>{detailDoctor.Markdown.description} </span>
                        )}
                    </p>

                    <a
                      href="#!"
                      className="btn btn-success btn-sm d-inline-flex justify-content-center align-items-center px-3"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16px"
                        height="16px"
                        className="me-2"
                        viewBox="0 0 640 640"
                      >
                        <path
                          fill="rgb(255, 255, 255)"
                          d="M286 368C384.5 368 464.3 447.8 464.3 546.3C464.3 562.7 451 576 434.6 576L78 576C61.6 576 48.3 562.7 48.3 546.3C48.3 447.8 128.1 368 226.6 368L286 368zM585.7 169.9C593.5 159.2 608.5 156.8 619.2 164.6C629.9 172.4 632.3 187.4 624.5 198.1L522.1 338.9C517.9 344.6 511.4 348.3 504.4 348.7C497.4 349.1 490.4 346.5 485.5 341.4L439.1 293.4C429.9 283.9 430.1 268.7 439.7 259.5C449.2 250.3 464.4 250.6 473.6 260.1L500.1 287.5L585.7 169.8zM256.3 312C190 312 136.3 258.3 136.3 192C136.3 125.7 190 72 256.3 72C322.6 72 376.3 125.7 376.3 192C376.3 258.3 322.6 312 256.3 312z"
                        />
                      </svg>
                      Tư vấn chuyên sâu
                    </a>
                    <a
                      href="#!"
                      className="btn btn-success btn-sm d-inline-flex justify-content-center align-items-center ms-3 px-3"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16px"
                        height="16px"
                        className="me-2"
                        viewBox="0 0 640 640"
                      >
                        <path
                          fill="rgb(255, 255, 255)"
                          d="M286 368C384.5 368 464.3 447.8 464.3 546.3C464.3 562.7 451 576 434.6 576L78 576C61.6 576 48.3 562.7 48.3 546.3C48.3 447.8 128.1 368 226.6 368L286 368zM585.7 169.9C593.5 159.2 608.5 156.8 619.2 164.6C629.9 172.4 632.3 187.4 624.5 198.1L522.1 338.9C517.9 344.6 511.4 348.3 504.4 348.7C497.4 349.1 490.4 346.5 485.5 341.4L439.1 293.4C429.9 283.9 430.1 268.7 439.7 259.5C449.2 250.3 464.4 250.6 473.6 260.1L500.1 287.5L585.7 169.8zM256.3 312C190 312 136.3 258.3 136.3 192C136.3 125.7 190 72 256.3 72C322.6 72 376.3 125.7 376.3 192C376.3 258.3 322.6 312 256.3 312z"
                        />
                      </svg>
                      Chia sẻ
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="schedule-doctor py-4">
            <div className="container">
              <div className="row ">
                <div className="content-left col-md-8 ">
                  <DoctorSchedule
                    doctorIdFromParent={this.state.currentDoctorId}
                  />
                </div>
                <div className="content-right col-md-4">
                  <DoctorExtraInfor
                    doctorIdFromParent={this.state.currentDoctorId}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* =========================== */}
          <div className="detail-infor-doctor py-4">
            <div className="container">
              <div className="row">
                <div className="col-md-12 markdown-content">
                  {detailDoctor &&
                    detailDoctor.Markdown &&
                    detailDoctor.Markdown.contentHTML && (
                      <div
                        className="doctor-content fs-5 fw-light text-secondary"
                        dangerouslySetInnerHTML={{
                          __html: detailDoctor.Markdown.contentHTML,
                        }}
                      ></div>
                    )}
                </div>
              </div>
            </div>
          </div>

          {/* ==================================== */}

          <div className="comment"></div>
        </div>
        {/* ============================ */}

        <Footer />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
