import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "./DoctorSchedule.scss";
// import { FormattedMessage } from "react-intl";
import Select from "react-select";
import * as actions from "../../../store/actions";
import { LANGUAGES, CRUD_ACTIONS, dateFormat } from "../../../utils";
import DatePicker from "../../../components/Input/DatePicker";
import moment from "moment";
import localization from "moment/locale/vi";
import { toast } from "react-toastify";
import _ from "lodash";
import { saveBulkScheduleDoctor } from "../../../services/userService";
import { getScheduleDoctorByDate } from "../../../services/userService";
import { FormattedMessage } from "react-intl";
import BookingModal from "./Modal/BookingModal";

class DoctorSchedule extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allDays: [],
      allAvailableTime: [],
      isOpenModalBooking: false,
      dataScheduleTimeModal: {},
    };
  }

  async componentDidMount() {
    let { language, doctorIdFromParent } = this.props;

    let allDays = this.getArrDays(language);
    this.setState({
      allDays: allDays,
      selectedDay: allDays[0], //chọn ngày đầu sẵn
    });

    if (doctorIdFromParent) {
      let res = await getScheduleDoctorByDate(
        doctorIdFromParent,
        allDays[0].value,
      );

      this.setState({
        allAvailableTime: res.data ? res.data : [],
      });
    }
  }

  getArrDays = (language) => {
    let allDays = [];
    for (let i = 0; i < 7; i++) {
      let object = {};
      if (this.props.language === LANGUAGES.VI) {
        object.label = moment(new Date()).add(i, "days").format("dddd - DD/MM");
      } else {
        object.label = moment(new Date())
          .add(i, "days")
          .locale("en")
          .format("ddd - DD/MM");
      }
      object.value = moment(new Date()).add(i, "days").startOf("day").valueOf();

      allDays.push(object);
    }

    return allDays;
  };

  async componentDidUpdate(prevProps) {
    if (this.props.language !== prevProps.language) {
      let allDays = this.getArrDays(this.props.language);

      this.setState({
        allDays: allDays,
        selectedDay: allDays[0], // reset về ngày đầu tiên
      });

      let res = await getScheduleDoctorByDate(
        this.props.doctorIdFromParent,
        allDays[0].value,
      );

      this.setState({
        allAvailableTime: res.data ? res.data : [],
      });
    }

    // Khi đổi doctorId
    if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
      let allDays = this.getArrDays(this.props.language);

      this.setState({
        selectedDay: allDays[0],
      });

      let res = await getScheduleDoctorByDate(
        this.props.doctorIdFromParent,
        allDays[0].value,
      );

      this.setState({
        allAvailableTime: res.data ? res.data : [],
      });
    }
  }

  handleOnChangeSelect = async (selectedOption) => {
    this.setState({ selectedDay: selectedOption });

    // Lấy doctorId từ props (được truyền từ DetailDoctor)
    let doctorId = this.props.doctorIdFromParent;

    if (!doctorId) {
      console.log("Không tìm thấy doctorId trong props");
      return;
    }

    // react-select trả về object => dùng selectedOption.value
    let date = selectedOption.value;

    let res = await getScheduleDoctorByDate(doctorId, date);

    if (res && res.errCode === 0) {
      this.setState({
        allAvailableTime: res.data ? res.data : [],
      });
    }

    console.log("Kết quả lịch theo ngày đã chọn:", res);
  };

  isPastTime = (item) => {
    let date = moment(item.date).startOf("day");

    let timeString = item.timeTypeData.valueEn; // "14:00 - 15:00"
    let startTime = timeString.split(" - ")[0].trim(); // "14:00"

    let fullDateTime = moment(
      date.format("YYYY-MM-DD") + " " + startTime,
      "YYYY-MM-DD HH:mm",
    );

    return fullDateTime.valueOf() < Date.now();
  };

  handleClickScheduleTime = (time) => {
    this.setState({
      isOpenModalBooking: true,
      dataScheduleTimeModal: time,
    });
    console.log(" check onClick ", time);
  };

  closeBookingModal = () => {
    this.setState({
      isOpenModalBooking: false,
    });
  };

  render() {
    let {
      allDays,
      allAvailableTime,
      isOpenModalBooking,
      dataScheduleTimeModal,
    } = this.state;
    let { language } = this.props;
    console.log(" Manage Doctor check state: ", this.state);

    return (
      <React.Fragment>
        <div className="doctor-schedule-container">
          <div className="m-s-title"> </div>
          <div className="container">
            <div className="row">
              <div className="col-6 form-group">
                <label className="text-uppercase fs-4 fw-normal">
                  Chọn ngày
                </label>
                <Select
                  options={allDays}
                  value={this.state.selectedDay}
                  onChange={this.handleOnChangeSelect}
                />
              </div>

              <div className="col-12">
                <div className="row all-available-time-container">
                  <label className="mb-2 d-flex align-items-center gap-2">
                    <i className="fas fa-calendar-alt"></i>
                    <FormattedMessage id="patient.detail-doctor.schedule" />
                  </label>

                  {allAvailableTime && allAvailableTime.length > 0 ? (
                    allAvailableTime.map((item, index) => {
                      let timeDisplay =
                        language === LANGUAGES.VI
                          ? item.timeTypeData.valueVi
                          : item.timeTypeData.valueEn;

                      let isPast = this.isPastTime(item); // kiểm tra slot đã qua chưa

                      return (
                        <div className="col-6 col-md-3 mb-3" key={index}>
                          <button
                            onClick={() => this.handleClickScheduleTime(item)}
                            className={
                              isPast
                                ? "btn btn-secondary border-0 schedule-btn w-100"
                                : "btn btn-warning border-0 schedule-btn w-100"
                            }
                            disabled={isPast} // không cho bấm nếu đã qua
                          >
                            {timeDisplay}
                          </button>
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-success fw-semibold">
                      Hiện lịch khám đang trống, vui lòng chọn khung thời gian
                      khác!
                    </div>
                  )}
                </div>
                {/* Nút lưu thông tin nằm NGAY DƯỚI khung giờ */}
                <div className="row">
                  <div className="col-12 col-md-6">
                    <label className="btn btn-success schedule-btn w-100">
                      <i className="far fa-hand-point-up"></i> Chọn và đặt lịch
                      miễn phí
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <BookingModal
          isOpenModal={isOpenModalBooking}
          closeBookingModal={this.closeBookingModal}
          dataTime={dataScheduleTimeModal}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    allDoctors: state.admin.allDoctors,
    allScheduleTime: state.admin.allScheduleTime,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctorsRedux: () => dispatch(actions.fetchAllDoctors()),
    fetchAllScheduleTimeRedux: () => dispatch(actions.fetchAllScheduleTime()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
