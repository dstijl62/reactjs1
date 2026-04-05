import React, { Component } from "react";
import { connect } from "react-redux";
import "./BookingModal.scss";
import { LANGUAGES } from "../../../../utils";
import { FormattedMessage } from "react-intl";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import ProfileDoctor from "../ProfileDoctor";
import _ from "lodash";

import moment from "moment";
import * as actions from "../../../../store/actions";
import Select from "react-select";
import { toast } from "react-toastify";
import { postPatientBookAppointment } from "../../../../services/userService";
import DatePicker from "../../../../components/Input/DatePicker";

class BookingModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fullName: "",
      phoneNumber: "",
      email: "",
      address: "",
      reason: "",
      birthday: "",
      selectedGender: "",
      doctorId: "",

      genders: "",

      timeType: "",
    };
  }

  async componentDidMount() {
    this.props.getGenders();
  }

  buildDataGender = (data) => {
    let result = [];
    let language = this.props.language;

    if (data && data.length > 0) {
      data.map((item) => {
        let object = {};
        object.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn;
        object.value = item.keyMap;
        result.push(object);
      });
    }
    return result;
  };

  async componentDidUpdate(prevProps) {
    if (this.props.language !== prevProps.language) {
      this.setState({
        genders: this.buildDataGender(this.props.genders),
      });
    }
    if (this.props.genders !== prevProps.genders) {
      this.setState({
        genders: this.buildDataGender(this.props.genders),
      });
    }
    if (this.props.dataTime !== prevProps.dataTime) {
      if (this.props.dataTime && !_.isEmpty(this.props.dataTime)) {
        console.log("check data Time:", this.props.dataTime);
        let doctorId = this.props.dataTime.doctorId;
        let timeType = this.props.dataTime.timeType;

        this.setState({
          doctorId: doctorId,
          timeType: timeType,
        });
      }
    }
  }

  toggle = () => {
    this.props.closeBookingModal();
    // alert("me toggle");
  };

  handleOnchangeInput = (event, id) => {
    let valueInput = event.target.value;
    let stateCopy = { ...this.state };
    stateCopy[id] = valueInput;
    this.setState({
      ...stateCopy,
    });
  };

  handleOnchangeDatePicker = (date) => {
    this.setState({
      birthday: date[0],
    });
  };

  handleOnChangeSelect = (selectedOption) => {
    this.setState({ selectedGender: selectedOption });
  };

  buildTimeBooking = (dataTime) => {
    let { language } = this.props;

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

      return `${time} - ${date}`;
    }

    return "";
  };

  buildDoctorName = (dataTime) => {
    let { language } = this.props;
    if (dataTime && !_.isEmpty(dataTime)) {
      let name =
        language === LANGUAGES.VI
          ? `${dataTime.doctorData.lastName} ${dataTime.doctorData.firstName} `
          : `${dataTime.doctorData.firstName} ${dataTime.doctorData.lastName} `;

      return name;
    }

    return "";
  };

  handleConfirmBooking = async () => {
    // validate input

    let date = new Date(this.state.birthday).getTime();
    let timeString = this.buildTimeBooking(this.props.dataTime);
    let doctorName = this.buildDoctorName(this.props.dataTime);

    let res = await postPatientBookAppointment({
      fullName: this.state.fullName,
      phoneNumber: this.state.phoneNumber,
      email: this.state.email,
      address: this.state.address,
      reason: this.state.reason,
      date: date,
      selectedGender: this.state.selectedGender.value,
      doctorId: this.state.doctorId,
      timeType: this.state.timeType,
      language: this.props.language,
      timeString: timeString,
      doctorName: doctorName,
    });

    console.log("Booking response:", res);
    console.log("selectedGender:", this.state.selectedGender);

    if (res && res.errCode === 0) {
      toast.success("Booking a new appointment Succeed!");
      this.props.closeBookingModal();
    } else {
      toast.error("Booking a new appointment Error!");
    }
  };

  render() {
    let { isOpenModal, closeBookingModal, dataTime } = this.props;
    let doctorId = "";
    if (dataTime && !_.isEmpty(dataTime)) {
      doctorId = dataTime.doctorId;
    }

    console.log("check dataTime: ", dataTime);

    // let doctorId = dataTime && !_.isEmpty(dataTime) ? dataTime.doctorId : "";

    return (
      <>
        {/* Modal wrapper */}
        <Modal
          isOpen={isOpenModal}
          className="booking-modal-container"
          centered
          size="lg"
          toggle={() => {
            this.toggle();
          }}
        >
          {/* HEADER */}
          <ModalHeader className="text-white bg-success">
            <h1 className="modal-title fs-4 mb-0">
              <FormattedMessage id="patient.booking-modal.title" />
            </h1>
          </ModalHeader>

          {/* BODY */}
          <ModalBody>
            <div className="card-body">
              <form>
                {/* {JSON.stringify(dataTime)} */}
                <div className="row">
                  <div className="col-md-12 mb-4 mt-4">
                    <div className="doctor-infor">
                      <ProfileDoctor
                        doctorId={doctorId}
                        isShowDescriptionDoctor={false}
                        dataTime={dataTime}
                        isShowPrice={true}
                      />
                    </div>
                  </div>
                  {/* <div className="col-md-4 mb-4 mt-4">
                    <div className="price fs-5 text-success"></div>
                  </div> */}
                </div>
                <div className="row">
                  <div className="col-md-8 mb-4">
                    <label className="fs-5 text-secondary">
                      <FormattedMessage id="patient.booking-modal.fullname" />
                    </label>
                    <input
                      value={this.state.fullName}
                      onChange={(event) =>
                        this.handleOnchangeInput(event, "fullName")
                      }
                      placeholder="Enter your name"
                      type="text"
                      className="form-control form-control-lg"
                    />
                  </div>

                  <div className="col-md-4 mb-4">
                    <label className="fs-5 text-secondary">
                      <FormattedMessage id="patient.booking-modal.phonenumber" />
                    </label>
                    <input
                      value={this.state.phoneNumber}
                      onChange={(event) =>
                        this.handleOnchangeInput(event, "phoneNumber")
                      }
                      placeholder="012345678"
                      type="text"
                      className="form-control form-control-lg"
                    />
                  </div>

                  <div className="col-md-12 mb-4">
                    <label className="fs-5 text-secondary">
                      <FormattedMessage id="patient.booking-modal.email" />
                    </label>
                    <input
                      value={this.state.email}
                      onChange={(event) =>
                        this.handleOnchangeInput(event, "email")
                      }
                      placeholder="Enter your email"
                      type="email"
                      className="form-control form-control-lg"
                    />
                  </div>

                  <div className="col-md-12 mb-4">
                    <label className="fs-5 text-secondary">
                      <FormattedMessage id="patient.booking-modal.address" />
                    </label>
                    <input
                      value={this.state.address}
                      onChange={(event) =>
                        this.handleOnchangeInput(event, "address")
                      }
                      placeholder="Enter your address"
                      type="text"
                      className="form-control form-control-lg"
                    />
                  </div>

                  <div className="col-md-12 mb-4">
                    <label className="fs-5 text-secondary">
                      <FormattedMessage id="patient.booking-modal.reason" />
                    </label>
                    <input
                      value={this.state.reason}
                      onChange={(event) =>
                        this.handleOnchangeInput(event, "reason")
                      }
                      placeholder=""
                      type="text"
                      className="form-control form-control-lg"
                    />
                  </div>
                  <div className="col-md-8 mb-4">
                    <label className="fs-5 text-secondary">
                      <FormattedMessage id="patient.booking-modal.birthday" />
                    </label>
                    <DatePicker
                      className="form-control form-control-lg"
                      onChange={this.handleOnchangeDatePicker}
                      value={this.state.birthday}
                      // minDate={new Date()}
                    />
                  </div>
                  <div className="col-md-4 mb-4">
                    <label className="fs-5 text-secondary">
                      <FormattedMessage id="patient.booking-modal.gender" />
                    </label>
                    <Select
                      options={this.state.genders}
                      value={this.state.selectedGender}
                      onChange={this.handleOnChangeSelect}
                      // value={this.state.gender}
                      // onChange={(event) =>
                      //   this.handleOnchangeInput(event, "gender")
                      // }

                      className="booking-modal gender-select"
                      classNamePrefix="react-select"
                    />
                  </div>

                  <div className="form-check mb-4 d-flex justify-content-center">
                    <input
                      className="form-check-input me-2"
                      type="checkbox"
                      id="agreeCheck"
                    />
                    <label
                      className="form-check-label small text-secondary"
                      htmlFor="agreeCheck"
                    >
                      <FormattedMessage id="patient.booking-modal.agree" />
                    </label>
                  </div>

                  <div className="col-md-2 mb-4"></div>

                  <div className="col-md-8 mb-4">
                    <button
                      onClick={() => this.handleConfirmBooking()}
                      className="btn btn-success btn-sm d-inline-flex align-items-center w-100 justify-content-center"
                      type="button"
                    >
                      <FormattedMessage id="patient.booking-modal.confirm" />
                    </button>
                  </div>

                  <div className="col-md-2 mb-4">
                    <button
                      onClick={closeBookingModal}
                      className="btn btn-secondary btn-sm d-inline-flex align-items-center w-100 justify-content-center"
                      type="button"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </ModalBody>
        </Modal>

        {/* BACKDROP */}
        {/* {isOpen && <div className="modal-backdrop fade show"></div>} */}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    genders: state.admin.genders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenders: () => dispatch(actions.fetchGenderstart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
