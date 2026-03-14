import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserRedux.scss";
// import { getAllCodeService } from "../../../services/userService";
import { LANGUAGES } from "../../../utils";

import * as actions from "../../../store/actions";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
// import { escape, escapeRegExp } from "lodash";

class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genderArr: [],
      positionArr: [],
      roleArr: [],
      previewImgURL: "",
      isOpen: false,
    };
  }

  async componentDidMount() {
    this.props.getGenderStart();
    this.props.getPositionStart();
    this.props.getRoleStart();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.genderRedux !== this.props.genderRedux) {
      this.setState({
        genderArr: this.props.genderRedux,
      });
    }

    if (prevProps.roleRedux !== this.props.roleRedux) {
      this.setState({
        roleArr: this.props.roleRedux,
      });
    }

    if (prevProps.positionRedux !== this.props.positionRedux) {
      this.setState({
        positionArr: this.props.positionRedux,
      });
    }
  }

  handleOnchangeImage = (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let objectUrl = URL.createObjectURL(file);
      this.setState({
        previewImgURL: objectUrl,
      });
    }
  };

  openPreviewImage = (event) => {
    if (!this.state.previewImgURL) return;
    this.setState({
      isOpen: true,
    });
  };

  render() {
    console.log(" check state: ", this.state);
    let genders = this.state.genderArr;
    let positions = this.state.positionArr;
    let roles = this.state.roleArr;
    let language = this.props.language;
    let isGetGender = this.props.isLoadingGender;
    console.log(" check state component: ", this.state);
    return (
      <div className="user-redux container">
        <div className="title">Welcome to User Redux</div>
        <div> {isGetGender === true ? "Loading genders" : ""}</div>

        <div className="user-redux-body">
          <div>
            <FormattedMessage id="manageuser-form.add-user" />
          </div>
          <div className="row">
            <form className="row g-3">
              <div className="col-md-6">
                <label className="form-label">
                  <FormattedMessage id="manageuser-form.email" />
                </label>
                <input type="email" className="form-control" />
              </div>

              <div className="col-md-6">
                <label className="form-label">
                  <FormattedMessage id="manageuser-form.password" />
                </label>
                <input type="password" className="form-control" />
              </div>

              <div className="col-6">
                <label className="form-label">
                  <FormattedMessage id="manageuser-form.first-name" />
                </label>
                <input type="text" className="form-control" />
              </div>

              <div className="col-6">
                <label className="form-label">
                  <FormattedMessage id="manageuser-form.last-name" />
                </label>
                <input type="text" className="form-control" />
              </div>
              <div className="col-6">
                <label className="form-label">
                  <FormattedMessage id="manageuser-form.phone-number" />
                </label>
                <input type="text" className="form-control" />
              </div>

              <div className="col-12">
                <label className="form-label">
                  <FormattedMessage id="manageuser-form.address" />
                </label>
                <input type="text" className="form-control" />
              </div>

              <div className="col-md-12">
                <label className="form-label">
                  <FormattedMessage id="manageuser-form.city" />
                </label>
                <input type="text" className="form-control" />
              </div>

              <div className="col-md-4">
                <label htmlFor="inputState" className="form-label">
                  <FormattedMessage id="manageuser-form.gender" />
                </label>
                <select className="form-select">
                  {genders &&
                    genders.length > 0 &&
                    genders.map((item, index) => (
                      <option key={index} value={item.keyMap}>
                        {language === LANGUAGES.VI
                          ? item.valueVi
                          : item.valueEn}
                      </option>
                    ))}
                </select>
              </div>

              <div className="col-md-4">
                <label htmlFor="inputState" className="form-label">
                  <FormattedMessage id="manageuser-form.position" />
                </label>
                <select className="form-select">
                  {positions &&
                    positions.length > 0 &&
                    positions.map((item, index) => (
                      <option key={index} value={item.keyMap}>
                        {language === LANGUAGES.VI
                          ? item.valueVi
                          : item.valueEn}
                      </option>
                    ))}
                </select>
              </div>

              <div className="col-md-4">
                <label htmlFor="inputState" className="form-label">
                  <FormattedMessage id="manageuser-form.role" />
                </label>
                <select className="form-select">
                  {roles &&
                    roles.length > 0 &&
                    roles.map((item, index) => (
                      <option key={index} value={item.keyMap}>
                        {language === LANGUAGES.VI
                          ? item.valueVi
                          : item.valueEn}
                      </option>
                    ))}
                </select>
              </div>
              {/* <div className="col-md-2">
                <label htmlFor="inputState" className="form-label">
                  <FormattedMessage id="manageuser-form.role" />
                </label>
                <select className="form-select">
                  <option defaultValue="">Admin</option>
                  <option>Doctor</option>
                  <option>Patient</option>
                </select>
              </div> */}

              <div className="col-md-6">
                <label className="form-label">
                  <FormattedMessage id="manageuser-form.image" />
                </label>
                <div>
                  <input
                    id="previewImg"
                    type="file"
                    className="form-control"
                    hidden
                    onChange={(event) => this.handleOnchangeImage(event)}
                  />
                  <label htmlFor="previewImg" className="upload-btn">
                    Tải ảnh<i className="fas fa-arrow-circle-up"></i>
                  </label>
                  <label
                    className="preview-image-btn"
                    style={{
                      backgroundImage: `url(${this.state.previewImgURL})`,
                    }}
                    onClick={() => this.openPreviewImage()}
                  >
                    <i className="fas fa-eyea"></i>
                  </label>
                </div>
              </div>

              <div className="col-12">
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" />
                  <label className="form-check-label">
                    <FormattedMessage id="manageuser-form.checkbox" />
                  </label>
                </div>
              </div>

              <div className="col-12">
                <button type="submit" className="btn btn-primary btn-submit">
                  <FormattedMessage id="manageuser-form.submit" />
                </button>
              </div>
            </form>
          </div>
        </div>

        {this.state.isOpen === true && (
          <Lightbox
            mainSrc={this.state.previewImgURL}
            onCloseRequest={() => this.setState({ isOpen: false })}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genderRedux: state.admin.genders,
    roleRedux: state.admin.roles,
    positionRedux: state.admin.positions,
    isLoadingGender: state.admin.isLoadingGender,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(actions.fetchGenderstart()),

    getPositionStart: () => dispatch(actions.fetchPositionstart()),

    getRoleStart: () => dispatch(actions.fetchRolestart()),
    // processLogout: () => dispatch(actions.processLogout()),
    // changeLanguageAppRedux: (language) =>
    //   dispatch(actions.changeLanguageApp(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
