import React, { Component } from "react";
import { connect } from "react-redux";
import "./DoctorExtraInfor.scss";

import Select from "react-select";

import { LANGUAGES } from "../../../utils";

import { toast } from "react-toastify";

import { getExtraInforDoctorById } from "../../../services/userService";
import { FormattedMessage } from "react-intl";
import NumberFormat from "react-number-format";

class DoctorExtraInfor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isShowDetailInfor: false,
      extraInfor: {},
    };
  }

  async componentDidMount() {
    if (this.props.doctorIdFromParent) {
      let res = await getExtraInforDoctorById(this.props.doctorIdFromParent);

      if (res && res.errCode === 0) {
        this.setState({
          extraInfor: res.data,
        });
      }
    }
  }

  async componentDidUpdate(prevProps) {
    if (this.props.language !== prevProps.language) {
    }

    // Khi đổi doctorId
    if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
      let res = await getExtraInforDoctorById(this.props.doctorIdFromParent);

      if (res && res.errCode === 0) {
        this.setState({
          extraInfor: res.data,
        });
      }
    }
  }

  showHideDetailInfor = (status) => {
    this.setState({
      isShowDetailInfor: status,
    });
  };

  render() {
    let { isShowDetailInfor, extraInfor } = this.state;
    let { language } = this.props;
    return (
      <div className="doctor-extra-infor-container">
        <div className="container">
          <div className="row">
            {/* TOP: Địa chỉ khám */}
            <div className="col-12 mb-4">
              <div className="content-top">
                <h5 className="text-uppercase fs-4 fw-normal mb-2">
                  Địa chỉ khám
                </h5>

                <p className="fs-5 fw-semibold text-dark mb-1">
                  {extraInfor && extraInfor.nameClinic
                    ? extraInfor.nameClinic
                    : ""}
                </p>

                <p className="fs-6 fw-light text-secondary">
                  {extraInfor && extraInfor.addressClinic
                    ? extraInfor.addressClinic
                    : ""}
                </p>
              </div>
            </div>

            {/* BOTTOM: Giá khám */}
            <div className="col-12">
              <div className="content-bottom">
                {isShowDetailInfor === false && (
                  <div>
                    <h5 className="text-uppercase fs-4 fw-normal mb-2">
                      Giá khám:
                    </h5>
                    <p className="fs-5 fw-semibold text-success mb-1">
                      {extraInfor &&
                        extraInfor.priceTypeData &&
                        language === LANGUAGES.VI && (
                          <NumberFormat
                            value={extraInfor.priceTypeData.valueVi}
                            displayType="text"
                            thousandSeparator={true}
                            suffix={" vnđ"}
                          />
                        )}

                      {extraInfor &&
                        extraInfor.priceTypeData &&
                        language === LANGUAGES.EN && (
                          <NumberFormat
                            value={extraInfor.priceTypeData.valueEn}
                            displayType="text"
                            thousandSeparator={true}
                            suffix={" $"}
                          />
                        )}
                    </p>

                    <p className="fs-5 fw-light text-primary mb-1">
                      <span
                        className="show-hide"
                        onClick={() => this.showHideDetailInfor(true)}
                      >
                        Xem chi tiết
                      </span>
                    </p>
                  </div>
                )}
                {isShowDetailInfor === true && (
                  <div>
                    <h5 className="text-uppercase fs-4 fw-normal mb-2">
                      Giá khám:
                    </h5>

                    <div className="border rounded ">
                      <div className="bg-light p-3">
                        <div className="d-flex justify-content-between align-items-center border-bottom py-1">
                          <span className="fs-5 fw-light text-secondary">
                            Giá khám
                          </span>
                          <span className="fs-5 fw-semibold text-success">
                            {extraInfor &&
                              extraInfor.priceTypeData &&
                              language === LANGUAGES.VI && (
                                <NumberFormat
                                  value={extraInfor.priceTypeData.valueVi}
                                  displayType="text"
                                  thousandSeparator={true}
                                  suffix={" vnđ"}
                                />
                              )}

                            {extraInfor &&
                              extraInfor.priceTypeData &&
                              language === LANGUAGES.EN && (
                                <NumberFormat
                                  value={extraInfor.priceTypeData.valueEn}
                                  displayType="text"
                                  thousandSeparator={true}
                                  suffix={" $"}
                                />
                              )}
                          </span>
                        </div>
                      </div>
                      <div className="bg-light p-3">
                        <p className="fs-5 fw-light text-secondary mb-3">
                          {extraInfor && extraInfor.note ? extraInfor.note : ""}
                        </p>
                        <p className="fs-5 fw-light text-secondary mb-3">
                          Bệnh viện có các hình thức thanh toán:
                          {extraInfor && extraInfor.paymentTypeData
                            ? extraInfor.paymentTypeData.valueVi
                            : ""}
                        </p>
                      </div>
                    </div>

                    <p className="fs-5 fw-light text-primary cursor-pointer mt-3">
                      <span
                        className="show-hide"
                        onClick={() => this.showHideDetailInfor(false)}
                      >
                        Ẩn bảng giá
                      </span>
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfor);
