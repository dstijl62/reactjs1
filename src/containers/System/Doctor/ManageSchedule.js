import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManageSchedule.scss";
import { FormattedMessage } from "react-intl";
import Select from "react-select";
import * as actions from "../../../store/actions";
import { LANGUAGES, CRUD_ACTIONS, dateFormat } from "../../../utils";
import DatePicker from "../../../components/Input/DatePicker";
import moment from "moment";
import { toast } from "react-toastify";
import _ from "lodash";
import { saveBulkScheduleDoctor } from "../../../services/userService";

class ManageSchudule extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listDoctors: [],
      selectedDoctor: {},
      currentDate: "",
      rangeTime: [],
    };
  }

  componentDidMount() {
    this.props.fetchAllDoctorsRedux();
    this.props.fetchAllScheduleTimeRedux();
  }

  buildDataInputSelect = (inputData) => {
    let result = [];

    let { language } = this.props;

    if (inputData && inputData.length > 0) {
      inputData.map((item, index) => {
        let object = {};
        let labelVi = `${item.lastName} ${item.firstName}`;
        let labelEn = `${item.firstName} ${item.lastName} `;

        object.label = language === LANGUAGES.VI ? labelVi : labelEn;
        object.value = item.id;
        result.push(object);
      });
    }
    return result;
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allDoctors !== this.props.allDoctors) {
      let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
      this.setState({
        listDoctors: dataSelect,
      });
    }
    if (prevProps.allScheduleTime !== this.props.allScheduleTime) {
      let data = this.props.allScheduleTime;
      if (data && data.length > 0) {
        // data.map((item) => {
        //   item.isSelected = false;
        //   return item;
        // });
        data = data.map((item) => ({ ...item, isSelected: false }));
      }

      console.log("check range time data: ", data);
      this.setState({
        rangeTime: data,
      });
    }

    // if (prevProps.language !== this.props.language) {
    //   let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
    //   this.setState({
    //     listDoctors: dataSelect,
    //   });
    // }
  }

  handleChangeSelect = async (selectedOption) => {
    this.setState({ selectedDoctor: selectedOption });
  };

  handleOnchangeDatePicker = (date) => {
    this.setState({
      currentDate: date[0],
    });
  };

  handleClickbtnTime = (time) => {
    let { rangeTime } = this.state;

    if (rangeTime && rangeTime.length > 0) {
      rangeTime = rangeTime.map((item) => {
        if (item.id === time.id) item.isSelected = !item.isSelected;
        return item;
      });
      this.setState({
        rangeTime: rangeTime,
      });
    }
  };

  handleSaveSchedule = async () => {
    let { rangeTime, selectedDoctor, currentDate } = this.state;
    let result = [];

    if (!currentDate) {
      toast.error("Invalid date!");
      return;
    }
    if (selectedDoctor && _.isEmpty(selectedDoctor)) {
      toast.error("Invalid selected Doctor!");
      return;
    }
    // let formattedDate = moment(currentDate).format(dateFormat.SEND_TO_SERVER);
    // let formattedDate = moment(currentDate).unix();
    let formattedDate = new Date(currentDate).getTime();

    if (rangeTime && rangeTime.length > 0) {
      let selectedTime = rangeTime.filter((item) => item.isSelected === true);
      if (selectedTime && selectedTime.length > 0) {
        selectedTime.map((schedule) => {
          let object = {};
          object.doctorId = selectedDoctor.value;
          object.date = formattedDate;
          object.timeType = schedule.keyMap;

          result.push(object);
        });
      } else {
        toast.error("Invalid selected Time!");
        return;
      }
    }

    let res = await saveBulkScheduleDoctor({
      arrSchedule: result,
      doctorId: selectedDoctor.value,
      formattedDate: formattedDate,
    });
    if (res && res.errCode === 0) {
      toast.success("Save Schedule Time Succeed!");
    } else {
      toast.error("Error Save Schedule Doctor Time!");
    }

    console.log(" Check result saveBulkScheduleDoctor: ", res);
    console.log(" Check result: ", result);
  };

  render() {
    console.log(" Manage Doctor check state: ", this.state);
    let { rangeTime } = this.state;
    let { language } = this.props;
    console.log("Check rangetime state:", rangeTime);
    return (
      <div className="manage-schedule-container">
        <div className="m-s-title">
          <FormattedMessage id="manage-schedule.title" />
        </div>
        <div className="container">
          <div className="row">
            <div className="col-8 form-group">
              <label>
                <FormattedMessage id="manage-schedule.select-doctor" />
              </label>
              <Select
                value={this.state.selectedDoctor}
                onChange={this.handleChangeSelect}
                options={this.state.listDoctors}
              />
            </div>
            <div className="col-4 form-group">
              <label>
                <FormattedMessage id="manage-schedule.select-date" />
              </label>
              <DatePicker
                className="form-control"
                onChange={this.handleOnchangeDatePicker}
                value={this.state.currentDate[0]}
                minDate={new Date()}
              />
            </div>
            <div className="col-8">
              <div className="row pick-hour-container">
                {rangeTime &&
                  rangeTime.length > 0 &&
                  rangeTime.map((item, index) => {
                    return (
                      <div className="col-3 mb-3" key={index}>
                        <button
                          onClick={() => this.handleClickbtnTime(item)}
                          className={
                            item.isSelected === true
                              ? "btn btn-success schedule-btn w-100"
                              : "btn btn-warning schedule-btn w-100"
                          }
                        >
                          {language === LANGUAGES.VI
                            ? item.valueVi
                            : item.valueEn}
                        </button>
                      </div>
                    );
                  })}
              </div>
              {/* Nút lưu thông tin nằm NGAY DƯỚI khung giờ */}
              <div className="row">
                <div className="col-3">
                  <button
                    className="btn btn-success schedule-btn w-100"
                    onClick={() => this.handleSaveSchedule()}
                  >
                    <FormattedMessage id="manage-schedule.confirm" />
                  </button>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchudule);
