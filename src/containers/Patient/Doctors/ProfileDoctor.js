import React, { Component } from "react";
import { connect } from "react-redux";
import { Fragment } from "react";

import "./ProfileDoctor.scss";

import { doctor1 } from "../../../assets/ourDoctor/ourDoctor-img";
import { getDetailInforDoctor } from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
import { getProfileDoctorById } from "../../../services/userService";
import NumberFormat from "react-number-format";
import _ from "lodash";
import moment from "moment";
import { Link } from "react-router-dom/cjs/react-router-dom";

class ProfileDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataProfile: {},
    };
  }

  async componentDidMount() {
    let data = await this.getInforDoctor(this.props.doctorId);
    this.setState({
      dataProfile: data,
    });
  }

  getInforDoctor = async (id) => {
    let result = {};
    if (id) {
      let res = await getProfileDoctorById(id);
      if (res && res.errCode === 0) {
        result = res.data;
      }
    }

    return result;
  };

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
    if (this.props.doctorId !== prevProps.doctorId) {
      //   this.getInforDoctor(this.props.doctorId);
    }
  }

  renderTimeBooking = (dataTime) => {
    let { language } = this.props;
    let { dataProfile } = this.state;

    let nameClinic = dataProfile?.Doctor_Infor?.nameClinic;
    let addressClinic = dataProfile?.Doctor_Infor?.addressClinic;

    if (dataTime && !_.isEmpty(dataTime)) {
      let time =
        language === LANGUAGES.VI
          ? dataTime.timeTypeData.valueVi
          : dataTime.timeTypeData.valueEn;

      let date =
        language === LANGUAGES.VI
          ? moment(new Date(dataTime.date)).format("dddd - DD/MM/YYYY")
          : moment(new Date(dataTime.date))
              .locale("en")
              .format("ddd - MM/DD/YYYY");
      return (
        <>
          <div className="fs-5 fw-semibold text-secondary ">
            {" "}
            {time} - {date}
          </div>
          <div>{nameClinic}</div>
          <div>{addressClinic}</div>
        </>
      );
    }
    return <></>;
  };

  render() {
    let { dataProfile } = this.state;
    let {
      language,
      isShowDescriptionDoctor,
      dataTime,
      isShowLinkDetail,
      isShowPrice,
      isShowConsultation,
      doctorId,
    } = this.props;
    let nameVi = "",
      nameEn = "";
    if (dataProfile && dataProfile.positionData) {
      nameVi = `${dataProfile.positionData.valueVi}, ${dataProfile.lastName} ${dataProfile.firstName}`;
      nameEn = `${dataProfile.positionData.valueEn}, ${dataProfile.firstName} ${dataProfile.lastName}`;
    }
    console.log(" check new props: ", dataTime);
    return (
      <React.Fragment>
        {/* <HomeHeader /> */}
        <div className="profile-doctor-container">
          <div className="intro-doctor">
            <div className="profile-doctor-header pb-5 border-bottom">
              <div className="container">
                <div className="row align-items-center gx-md-5">
                  {/* Left block */}
                  <div className="col-md-3 mt-3 mt-md-0">
                    <div className="profile-doctor-item__img-bg">
                      <img
                        src={dataProfile.image ? dataProfile.image : ""}
                        alt="Doctor"
                      />
                    </div>
                  </div>
                  {/* Right block */}
                  <div className="col-md-8 content-right">
                    <h1 className="fs-3 fst-normal">
                      {language === LANGUAGES.VI ? nameVi : nameEn}
                    </h1>

                    <p className="fs-5 fw-light text-secondary doctor-desc">
                      {isShowDescriptionDoctor === true ? (
                        <>
                          {dataProfile.Markdown &&
                            dataProfile.Markdown.description && (
                              <span>{dataProfile.Markdown.description} </span>
                            )}
                        </>
                      ) : (
                        <>{this.renderTimeBooking(dataTime)}</>
                      )}
                    </p>

                    {isShowConsultation === true && (
                      <a
                        href="#!"
                        className="btn btn-success btn-sm d-inline-flex justify-content-center align-items-center px-3 me-2"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16px"
                          height="16px"
                          viewBox="0 0 640 640"
                        >
                          <path
                            fill="rgb(255, 255, 255)"
                            d="M286 368C384.5 368 464.3 447.8 464.3 546.3C464.3 562.7 451 576 434.6 576L78 576C61.6 576 48.3 562.7 48.3 546.3C48.3 447.8 128.1 368 226.6 368L286 368zM585.7 169.9C593.5 159.2 608.5 156.8 619.2 164.6C629.9 172.4 632.3 187.4 624.5 198.1L522.1 338.9C517.9 344.6 511.4 348.3 504.4 348.7C497.4 349.1 490.4 346.5 485.5 341.4L439.1 293.4C429.9 283.9 430.1 268.7 439.7 259.5C449.2 250.3 464.4 250.6 473.6 260.1L500.1 287.5L585.7 169.8zM256.3 312C190 312 136.3 258.3 136.3 192C136.3 125.7 190 72 256.3 72C322.6 72 376.3 125.7 376.3 192C376.3 258.3 322.6 312 256.3 312z"
                          />
                        </svg>
                        Tư vấn chuyên sâu
                      </a>
                    )}

                    <a
                      href="#!"
                      className="btn btn-success btn-sm d-inline-flex justify-content-center align-items-center ms-0 px-3"
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

                    {isShowLinkDetail === true && (
                      <div className="mt-4 fs-5 fw-light text-primary view-detail-doctor">
                        <Link to={`/detail-doctor/${doctorId}`}>Xem thêm</Link>
                      </div>
                    )}

                    {isShowPrice === true && (
                      <p className="mt-4 fs-5 fw-light text-success doctor-price">
                        Giá khám:
                        {dataProfile &&
                          dataProfile.Doctor_Infor &&
                          language === LANGUAGES.VI && (
                            <NumberFormat
                              value={
                                dataProfile.Doctor_Infor.priceTypeData.valueVi
                              }
                              displayType="text"
                              thousandSeparator={true}
                              suffix={" vnđ"}
                            />
                          )}
                        {dataProfile &&
                          dataProfile.Doctor_Infor &&
                          language === LANGUAGES.EN && (
                            <NumberFormat
                              value={
                                dataProfile.Doctor_Infor.priceTypeData.valueEn
                              }
                              displayType="text"
                              thousandSeparator={true}
                              suffix={" $"}
                            />
                          )}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
