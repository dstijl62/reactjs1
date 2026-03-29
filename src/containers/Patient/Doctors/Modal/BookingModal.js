import React, { Component } from "react";
import { connect } from "react-redux";
import "./BookingModal.scss";
import { LANGUAGES } from "../../../../utils";
import { FormattedMessage } from "react-intl";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import ProfileDoctor from "../ProfileDoctor";
import _ from "lodash";

class BookingModal extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  async componentDidMount() {}

  async componentDidUpdate(prevProps) {
    if (this.props.language !== prevProps.language) {
    }
  }

  toggle = () => {
    this.props.closeBookingModal();
    // alert("me toggle");
  };

  render() {
    let { isOpenModal, closeBookingModal, dataTime } = this.props;
    let doctorId = "";
    if (dataTime && !_.isEmpty(dataTime)) {
      doctorId = dataTime.doctorId;
    }

    console.log("check data Time new,", dataTime);

    // let doctorId = dataTime && !_.isEmpty(dataTime) ? dataTime.doctorId : "";
    console.log("data props from modal: ", this.props);
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
            <h1 className="modal-title fs-4 mb-0">Thông tin đặt lịch khám</h1>
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
                      />
                    </div>
                  </div>
                  <div className="col-md-4 mb-4 mt-4">
                    <div className="price fs-5 text-success">
                      Giá khám 500.000 vnđ
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-8 mb-4">
                    <label className="fs-5 text-secondary">Họ tên</label>
                    <input
                      placeholder="Enter your name"
                      type="text"
                      className="form-control form-control-lg"
                    />
                  </div>

                  <div className="col-md-4 mb-4">
                    <label className="fs-5 text-secondary">Số điện thoại</label>
                    <input
                      placeholder="Enter your email"
                      type="email"
                      className="form-control form-control-lg"
                    />
                  </div>

                  <div className="col-md-12 mb-4">
                    <label className="fs-5 text-secondary">Địa chỉ Email</label>
                    <input
                      placeholder="Create password"
                      type="password"
                      className="form-control form-control-lg"
                    />
                  </div>

                  <div className="col-md-12 mb-4">
                    <label className="fs-5 text-secondary">
                      Địa chỉ liên hệ
                    </label>
                    <input
                      placeholder="Confirm password"
                      type="password"
                      className="form-control form-control-lg"
                    />
                  </div>

                  <div className="col-md-12 mb-4">
                    <label className="fs-5 text-secondary">Lý do khám</label>
                    <input
                      placeholder="Confirm password"
                      type="password"
                      className="form-control form-control-lg"
                    />
                  </div>
                  <div className="col-md-8 mb-4">
                    <label className="fs-5 text-secondary">Đặt cho ai</label>
                    <input
                      placeholder="Confirm password"
                      type="password"
                      className="form-control form-control-lg"
                    />
                  </div>
                  <div className="col-md-4 mb-4">
                    <label className="fs-5 text-secondary">Giới tính</label>
                    <input
                      placeholder="Confirm password"
                      type="password"
                      className="form-control form-control-lg"
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
                      Thanh toán sau tại cơ sở y tế
                    </label>
                  </div>

                  <div className="col-md-2 mb-4"></div>

                  <div className="col-md-8 mb-4">
                    <button
                      className="btn btn-success btn-sm d-inline-flex align-items-center w-100 justify-content-center"
                      type="submit"
                    >
                      Xác nhận
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
