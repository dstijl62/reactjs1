import React, { Component } from "react";
import { connect } from "react-redux";
import "./RemedyModal.scss";
import { LANGUAGES, CommonUtils } from "../../../utils";
import { FormattedMessage } from "react-intl";
import { Modal, ModalHeader, ModalBody } from "reactstrap";

import _ from "lodash";

import moment from "moment";
import * as actions from "../../../store/actions";
import Select from "react-select";
import { toast } from "react-toastify";

class RemedyModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      fullName: "",
      imgBase64: "",
    };
  }

  async componentDidMount() {
    this.setState({
      email: this.props.dataModal.email,
      fullName: this.props.dataModal.firstName,
    });
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.dataModal !== this.props.dataModal) {
      this.setState({
        email: this.props.dataModal.email,
        fullName: this.props.dataModal.fullName,
      });
    }
  }

  toggle = () => {
    this.props.closeRemedyModal();
    // alert("me toggle");
  };

  handleOnchangeInputRemedy = (event, id) => {
    let valueInput = event.target.value;
    let stateCopy = { ...this.state };
    stateCopy[id] = valueInput;
    this.setState({
      ...stateCopy,
    });
  };

  handleOnchangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);

      this.setState({
        imgBase64: base64,
      });
    }
  };

  handleSendRemedy = () => {
    this.props.sendRemedy(this.state);
  };

  render() {
    let { isOpenModal, closeRemedyModal, dataModal, sendRemedy } = this.props;

    return (
      <>
        {/* Modal wrapper */}
        <Modal
          isOpen={isOpenModal}
          className="remedy-modal-container"
          centered
          size="md"
          toggle={this.toggle}
        >
          {/* HEADER */}
          <ModalHeader className="text-white bg-success">
            <h1 className="modal-title fs-4 mb-0">
              Gửi hóa đơn khám bệnh
              {/* <FormattedMessage id="patient.booking-modal.title" /> */}
            </h1>
          </ModalHeader>

          {/* BODY */}
          <ModalBody>
            <div className="card-body">
              <form>
                <div className="row">
                  <div className="col-md-12 mb-4">
                    <label className="fs-5 text-secondary">
                      <FormattedMessage id="patient.booking-modal.fullname" />
                    </label>
                    <input
                      value={this.state.fullName}
                      onChange={(event) =>
                        this.handleOnchangeInputRemedy(event, "fullName")
                      }
                      placeholder="Enter your name"
                      type="text"
                      className="form-control form-control-lg"
                    />
                  </div>

                  <div className="col-md-12 mb-4">
                    <label className="fs-5 text-secondary">
                      Email
                      {/* <FormattedMessage id="patient.booking-modal.email" /> */}
                    </label>
                    <input
                      value={this.state.email}
                      onChange={(event) =>
                        this.handleOnchangeInputRemedy(event, "email")
                      }
                      placeholder="Enter your email"
                      type="email"
                      className="form-control form-control-lg"
                    />
                  </div>

                  <div className="col-md-12 mb-4">
                    <label className="fs-5 text-secondary">
                      Chọn file đơn thuốc
                      {/* <FormattedMessage id="patient.booking-modal.address" /> */}
                    </label>
                    <input
                      onChange={(event) => this.handleOnchangeImage(event)}
                      type="file"
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
                      Đồng ý
                      {/* <FormattedMessage id="patient.booking-modal.agree" /> */}
                    </label>
                  </div>

                  <div className="col-md-2 mb-4"></div>

                  <div className="col-md-8 mb-4">
                    <button
                      onClick={() => this.handleSendRemedy()}
                      className="btn btn-success btn-sm d-inline-flex align-items-center w-100 justify-content-center"
                      type="button"
                    >
                      Send
                      {/* <FormattedMessage id="patient.booking-modal.confirm" /> */}
                    </button>
                  </div>

                  <div className="col-md-2 mb-4">
                    <button
                      onClick={this.props.closeRemedyModal}
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

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);
