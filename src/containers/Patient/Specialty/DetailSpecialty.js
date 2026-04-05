import React, { Component } from "react";
import { connect } from "react-redux";
import "./DetailSpecialty.scss";
import { LANGUAGES } from "../../../utils";
import { FormattedMessage } from "react-intl";
import Navbar from "../../HomePage/Navbar";
import HomeHeader from "../../HomePage/HomeHeader";
import Footer from "../../HomePage/Section/Footer";
import DoctorSchedule from "../Doctors/DoctorSchedule";
import DoctorExtraInfor from "../Doctors/DoctorExtraInfor";
import ProfileDoctor from "../Doctors/ProfileDoctor";
import _ from "lodash";
import {
  getAllDetailSpecialtyById,
  getAllCodeService,
} from "../../../services/userService";

class DetailSpecialty extends Component {
  constructor(props) {
    super(props);

    this.state = {
      arrDoctorId: [],
      dataDetailSpecialty: {},
      listProvince: [],
    };
  }

  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;

      let res = await getAllDetailSpecialtyById({
        id: id,
        location: "ALL",
      });

      let resProvince = await getAllCodeService("PROVINCE");

      if (
        res &&
        res.errCode === 0 &&
        resProvince &&
        resProvince.errCode === 0
      ) {
        let data = res.data;
        let arrDoctorId = [];
        if (data && !_.isEmpty(res.data)) {
          let arr = data.doctorSpecialty;
          if (arr && arr.length > 0) {
            arr.map((item) => {
              arrDoctorId.push(item.doctorId);
            });
          }
        }

        let dataProvince = resProvince.data;
        if (dataProvince && dataProvince.length > 0) {
          dataProvince.unshift({
            createAt: null,
            keyMap: "ALL",
            type: "PROVINCE",
            valueEn: "ALL",
            valueVi: "Toàn quốc",
          });
        }

        this.setState({
          dataDetailSpecialty: res.data,
          arrDoctorId: arrDoctorId,
          listProvince: dataProvince ? dataProvince : [],
        });
      }
    }
  }

  async componentDidUpdate(prevProps) {
    if (this.props.language !== prevProps.language) {
    }
  }

  handleOnChangeSelect = async (event) => {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;
      let location = event.target.value;

      let res = await getAllDetailSpecialtyById({
        id: id,
        location: location,
      });

      if (res && res.errCode === 0) {
        let data = res.data;
        let arrDoctorId = [];
        if (data && !_.isEmpty(res.data)) {
          let arr = data.doctorSpecialty;
          if (arr && arr.length > 0) {
            arr.map((item) => {
              arrDoctorId.push(item.doctorId);
            });
          }
        }

        this.setState({
          dataDetailSpecialty: res.data,
          arrDoctorId: arrDoctorId,
        });
      }
    }
    console.log("check event onchange: ", event.target.value);
  };

  render() {
    let { arrDoctorId, dataDetailSpecialty, listProvince } = this.state;

    console.log("Check res detail specialty: ", this.state);
    let { language } = this.props;

    return (
      <React.Fragment>
        <Navbar />
        <div className="intro-detail-specialty">
          <div className="container">
            <div className="row">
              <div className="col-12 ">
                <div className="desc-specialty">
                  {dataDetailSpecialty && !_.isEmpty(dataDetailSpecialty) && (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: dataDetailSpecialty.descriptionHTML,
                      }}
                    ></div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="detail-specialty-body">
          <div className="search-sp-doctor">
            <div className="container">
              <div className="row">
                <div className="col-3 pb-4">
                  <select
                    onChange={(event) => this.handleOnChangeSelect(event)}
                  >
                    {listProvince &&
                      listProvince.length > 0 &&
                      listProvince.map((item, index) => {
                        return (
                          <option key={index} value={item.keyMap}>
                            {language === LANGUAGES.VI
                              ? item.valueVi
                              : item.valueEn}
                          </option>
                        );
                      })}
                  </select>
                </div>
              </div>
            </div>
          </div>
          {arrDoctorId &&
            arrDoctorId.length > 0 &&
            arrDoctorId.map((item, index) => {
              return (
                <>
                  <div className="specialty-detail-container">
                    <div className="intro-doctor pt-5">
                      <div className="container">
                        <div className="row ">
                          <div className="col-12 ">
                            {/* Profile Doctor */}
                            <ProfileDoctor
                              doctorId={item}
                              isShowDescriptionDoctor={true}
                              isShowConsultation={true}
                              isShowLinkDetail={true}
                              isShowPrice={false}

                              // dataTime={dataTime}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Each Doctor */}
                    <div className="schedule-doctor pb-5">
                      <div className="container">
                        <div className="row ">
                          <div className="content-left col-md-8 ">
                            <DoctorSchedule
                              doctorIdFromParent={item}
                              key={index}
                            />
                          </div>
                          <div className="content-right col-md-4">
                            <DoctorExtraInfor
                              doctorIdFromParent={item}
                              key={index}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  ;
                </>
              );
            })}
        </div>

        <Footer />
      </React.Fragment>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
