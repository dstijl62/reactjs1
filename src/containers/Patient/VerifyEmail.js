import React, { Component } from "react";
import { connect } from "react-redux";
import Navbar from "../HomePage/Navbar";
import Footer from "../HomePage/Section/Footer";

import "./VerifyEmail.scss";
import { postVerifyBookAppointment } from "../../services/userService";

class VerifyEmail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      statusVerify: false,
      errCode: -1,
    };
  }

  async componentDidMount() {
    if (this.props.location && this.props.location.search) {
      let urlParams = new URLSearchParams(this.props.location.search);
      let token = urlParams.get("token");
      let doctorId = urlParams.get("doctorId");

      let res = await postVerifyBookAppointment({
        token: token,
        doctorId: doctorId,
      });

      if (res && res.errCode === 0) {
        this.setState({
          statusVerify: true,
          errCode: 0,
        });
      } else {
        this.setState({
          statusVerify: false,
          errCode: res.errCode || -1,
        });
      }
    }
  }

  render() {
    let { statusVerify, errCode } = this.state;

    return (
      <React.Fragment>
        <Navbar />

        <div className="verify-container">
          <div className="verify-box">
            {errCode === 0 ? (
              <>
                <div className="icon success">✔</div>
                <h2 className="title">Appointment Confirmed</h2>
                <p className="desc">
                  Your medical appointment has been successfully verified.
                </p>
              </>
            ) : (
              <>
                <div className="icon failed">✖</div>
                <h2 className="title">Verification Failed</h2>
                <p className="desc">
                  The verification link is invalid or has expired.
                </p>
              </>
            )}
          </div>
        </div>

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

export default connect(mapStateToProps)(VerifyEmail);
