import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManagePatient.scss";
import { LANGUAGES } from "../../../utils";
import { FormattedMessage } from "react-intl";
import DatePicker from "../../../components/Input/DatePicker";
import {
  getAllPatientForDoctor,
  postSendRemedy,
} from "../../../services/userService";
import moment from "moment";
import RemedyModal from "./RemedyModal";
import { toast } from "react-toastify";
import LoadingOverlay from "react-loading-overlay";

class ManagePatient extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentDate: moment(new Date()).startOf("day").valueOf(),
      dataPatient: [],
      isOpenRemedyModal: false,
      dataModal: {},
      isShowLoading: false,
    };
  }

  async componentDidMount() {
    this.getDataPatient();
  }

  getDataPatient = async () => {
    let { user } = this.props;
    let { currentDate } = this.state;
    let formatedDate = new Date(currentDate).getTime();

    let res = await getAllPatientForDoctor({
      doctorId: user.id,
      date: formatedDate,
    });

    if (res && res.errCode === 0) {
      this.setState({
        dataPatient: res.data,
      });
    }
  };

  async componentDidUpdate(prevProps) {
    if (this.props.language !== prevProps.language) {
    }
  }

  handleOnchangeDatePicker = (date) => {
    this.setState(
      {
        currentDate: date[0],
      },
      async () => {
        await this.getDataPatient();
      },
    );
  };

  handleBtnConfirm = (item) => {
    let data = {
      doctorId: item.doctorId,
      patientId: item.patientId,
      email: item.patientData.email,
      fullName: item.patientData.firstName,
      timeType: item.timeType,
    };
    this.setState({
      isOpenRemedyModal: true,
      dataModal: data,
    });
  };

  closeRemedyModal = () => {
    this.setState({
      isOpenRemedyModal: false,
      dataModal: {},
    });
  };

  sendRemedy = async (dataChild) => {
    let { dataModal } = this.state;
    this.setState({
      isShowLoading: true,
    });
    let res = await postSendRemedy({
      email: dataChild.email,
      fullName: dataChild.fullName,
      imgBase64: dataChild.imgBase64,
      doctorId: dataModal.doctorId,
      patientId: dataModal.patientId,
      timeType: dataModal.timeType,
      language: this.props.language,
    });

    if (res && res.errCode === 0) {
      this.setState({
        isShowLoading: false,
      });
      toast.success("Send Remedy succeeds! ");
      this.closeRemedyModal();
      await this.getDataPatient();
    } else {
      this.setState({
        isShowLoading: false,
      });
      toast.error("Send Remedy error!");
      console.log(" check modal error remedy: ", res);
    }
  };

  render() {
    console.log("dataPatient: ", this.state.dataPatient);
    let { dataPatient, isOpenRemedyModal, dataModal } = this.state;
    let { language } = this.props;
    return (
      <>
        <LoadingOverlay
          active={this.state.isShowLoading}
          spinner
          text="Loading..."
        >
          <div className="manage-patient-container">
            <div className="container">
              <div className="row">
                <div className="col-12 m-p-title py-5">
                  <div className="h1 text-center ">
                    Quản lý bệnh nhân khám bệnh của Bác sĩ
                  </div>
                </div>
              </div>
            </div>
            <div className="container">
              <div className="row m-p-body">
                <div className="col-6 form-group">
                  <label className="text-bold ">Chọn ngày khám</label>
                  <DatePicker
                    className="form-control fs-4"
                    onChange={this.handleOnchangeDatePicker}
                    value={this.state.currentDate[0]}
                    // minDate={new Date()}
                  />
                </div>
                <div className="col-12 form-group">
                  <label className="text-bold mt-5 py-2">
                    Danh sách đặt lịch khám
                  </label>
                  <div className="manage-patient-table mt-3 mx-1">
                    <table>
                      <tbody>
                        <tr>
                          <th>STT</th>
                          <th>Thời gian</th>
                          <th>Email</th>
                          <th>Họ và tên</th>
                          <th>Địa chỉ</th>
                          <th>Ngày sinh</th>
                          <th>Giới tính</th>
                          {/* <th>SDT</th> */}
                          <th>Actions</th>
                        </tr>
                        {dataPatient && dataPatient.length > 0 ? (
                          dataPatient.map((item, index) => {
                            let time =
                              language === LANGUAGES.VI
                                ? item.timeTypeDataPatient.valueVi
                                : item.timeTypeDataPatient.valueEn;
                            let gender =
                              language === LANGUAGES.VI
                                ? item.patientData.genderData.valueVi
                                : item.patientData.genderData.valueEn;
                            return (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{time}</td>
                                <td>{item.patientData.email}</td>
                                <td>{item.patientData.firstName}</td>
                                <td>{item.patientData.address}</td>
                                <td>{item.patientData.birthday}</td>
                                <td>{gender}</td>
                                {/* <td>{item.phonenumber}</td> */}

                                <td>
                                  <button
                                    className="btn btn-warning btn-sm d-inline-flex justify-content-center align-items-center me-2 px-3"
                                    onClick={() => this.handleBtnConfirm(item)}
                                  >
                                    Xác nhận
                                    {/* <i className="fas fa-edit"></i> */}
                                  </button>
                                </td>
                              </tr>
                            );
                          })
                        ) : (
                          <tr>
                            <td colSpan="8">
                              <div className="row">
                                <div className="col-12 text-center">
                                  --Không có dữ liệu--
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <RemedyModal
            isOpenModal={isOpenRemedyModal}
            closeRemedyModal={this.closeRemedyModal}
            dataModal={dataModal}
            sendRemedy={this.sendRemedy}
          />
        </LoadingOverlay>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    user: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
