import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserRedux.scss";
// import { getAllCodeService } from "../../../services/userService";
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from "../../../utils";

import * as actions from "../../../store/actions";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import TableManageUser from "./TableManageUser";
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

      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      address: "",
      gender: "",
      positionId: "",
      roleId: "",
      avatar: "",

      action: "",
      userEditId: "",
    };
  }

  async componentDidMount() {
    this.props.getGenderStart();
    this.props.getPositionStart();
    this.props.getRoleStart();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.genderRedux !== this.props.genderRedux) {
      let arrGenders = this.props.genderRedux;
      this.setState({
        genderArr: arrGenders,
        gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : "",
      });
    }

    if (prevProps.roleRedux !== this.props.roleRedux) {
      let arrRoles = this.props.roleRedux;

      this.setState({
        roleArr: arrRoles,
        roleId: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : "",
      });
    }

    if (prevProps.positionRedux !== this.props.positionRedux) {
      let arrPositions = this.props.positionRedux;
      this.setState({
        positionArr: arrPositions,
        positionId:
          arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : "",
      });
    }

    if (prevProps.listUsers !== this.props.listUsers) {
      let arrGenders = this.props.genderRedux;
      let arrRoles = this.props.roleRedux;
      let arrPositions = this.props.positionRedux;

      this.setState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        address: "",
        gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : "",
        roleId: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : "",
        positionId:
          arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : "",
        avatar: "",

        action: CRUD_ACTIONS.CREATE,
        previewImgURL: "",
      });
    }
  }

  handleOnchangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      console.log("check base64 image: ", base64);
      let objectUrl = URL.createObjectURL(file);
      this.setState({
        previewImgURL: objectUrl,
        avatar: base64,
      });
    }
  };

  openPreviewImage = (event) => {
    if (!this.state.previewImgURL) return;
    this.setState({
      isOpen: true,
    });
  };

  handleSaveUser = () => {
    let isValid = this.checkValidateInput();
    if (isValid === false) return;

    let { action } = this.state;

    if (action === CRUD_ACTIONS.CREATE) {
      //fire redux create user
      this.props.createNewUser({
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        address: this.state.address,
        phonenumber: this.state.phoneNumber,
        gender: this.state.gender,
        roleId: this.state.roleId,
        positionId: this.state.positionId,
        avatar: this.state.avatar,
      });
    }
    if (action === CRUD_ACTIONS.EDIT) {
      //fire redux edit user
      this.props.editAUserRedux({
        id: this.state.userEditId,
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        address: this.state.address,
        phonenumber: this.state.phoneNumber,
        gender: this.state.gender,
        roleId: this.state.roleId,
        positionId: this.state.positionId,
        avatar: this.state.avatar,
      });
    }

    this.props.fetchUserRedux();
  };

  checkValidateInput = () => {
    let isValid = true;
    let arrCheck = [
      "email",
      "password",
      "firstName",
      "lastName",
      "phoneNumber",
      "address",
    ];
    for (let i = 0; i < arrCheck.length; i++) {
      if (!this.state[arrCheck[i]]) {
        isValid = false;
        alert("This input is required" + arrCheck[i]);
        break;
      }
    }
    return isValid;
  };

  onChangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };

  handleEditUserFromParent = (user) => {
    let imageBase64 = "";

    if (user.image) {
      imageBase64 = new Buffer(user.image, "base64").toString("binary");
    }

    // if (user.image) {
    //   const imageBuffer = Buffer.from(JSON.stringify(user.image));
    //   const imageBase64 = imageBuffer.toString("base64");
    //   setImage(imageBase64);
    // }

    console.log(" check handle edit user from parent: ", user);
    this.setState({
      email: user.email,
      password: "HASHCODE",
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phonenumber,
      address: user.address,
      gender: user.gender,
      roleId: user.roleId,
      positionId: user.positionId,
      avatar: "",
      previewImgURL: imageBase64,

      action: CRUD_ACTIONS.EDIT,
      userEditId: user.id,
    });
  };

  render() {
    let genders = this.state.genderArr;
    let positions = this.state.positionArr;
    let roles = this.state.roleArr;
    let language = this.props.language;
    let isGetGender = this.props.isLoadingGender;

    let {
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
      address,
      gender,
      positionId,
      roleId,
      avatar,
    } = this.state;

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
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(event) => {
                    this.onChangeInput(event, "email");
                  }}
                  disabled={
                    this.state.action === CRUD_ACTIONS.EDIT ? true : false
                  }
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">
                  <FormattedMessage id="manageuser-form.password" />
                </label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(event) => {
                    this.onChangeInput(event, "password");
                  }}
                  disabled={
                    this.state.action === CRUD_ACTIONS.EDIT ? true : false
                  }
                />
              </div>

              <div className="col-6">
                <label className="form-label">
                  <FormattedMessage id="manageuser-form.first-name" />
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={firstName}
                  onChange={(event) => {
                    this.onChangeInput(event, "firstName");
                  }}
                />
              </div>

              <div className="col-6">
                <label className="form-label">
                  <FormattedMessage id="manageuser-form.last-name" />
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={lastName}
                  onChange={(event) => {
                    this.onChangeInput(event, "lastName");
                  }}
                />
              </div>
              <div className="col-6">
                <label className="form-label">
                  <FormattedMessage id="manageuser-form.phone-number" />
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={phoneNumber}
                  onChange={(event) => {
                    this.onChangeInput(event, "phoneNumber");
                  }}
                />
              </div>

              <div className="col-12">
                <label className="form-label">
                  <FormattedMessage id="manageuser-form.address" />
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={address}
                  onChange={(event) => {
                    this.onChangeInput(event, "address");
                  }}
                />
              </div>

              <div className="col-md-4">
                <label htmlFor="inputState" className="form-label">
                  <FormattedMessage id="manageuser-form.gender" />
                </label>
                <select
                  className="form-select"
                  onChange={(event) => this.onChangeInput(event, "gender")}
                  value={gender}
                >
                  {genders &&
                    genders.length > 0 &&
                    genders.map((item, index) => (
                      <option keyMap={index} value={item.keyMap}>
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
                <select
                  className="form-select"
                  onChange={(event) => this.onChangeInput(event, "positionId")}
                  value={positionId}
                >
                  {positions &&
                    positions.length > 0 &&
                    positions.map((item, index) => (
                      <option keyMap={index} value={item.keyMap}>
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
                <select
                  className="form-select"
                  onChange={(event) => this.onChangeInput(event, "roleId")}
                  value={roleId}
                >
                  {roles &&
                    roles.length > 0 &&
                    roles.map((item, index) => (
                      <option keyMap={index} value={item.keyMap}>
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
                    <i className="fas fa-searchh"></i>
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
            </form>
            <div className="col-12">
              <button
                type="submit"
                className={
                  this.state.action === CRUD_ACTIONS.EDIT
                    ? "btn btn-warning btn-submit"
                    : "btn btn-primary btn-submit"
                }
                onClick={() => this.handleSaveUser()}
              >
                {this.state.action === CRUD_ACTIONS.EDIT ? (
                  <FormattedMessage id="manageuser-form.edit" />
                ) : (
                  <FormattedMessage id="manageuser-form.submit" />
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="col-12 mb-5">
          <TableManageUser
            handleEditUserFromParentKey={this.handleEditUserFromParent}
            action={this.state.action}
          />
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
    listUsers: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(actions.fetchGenderstart()),

    getPositionStart: () => dispatch(actions.fetchPositionstart()),

    getRoleStart: () => dispatch(actions.fetchRolestart()),

    createNewUser: (data) => dispatch(actions.createNewUser(data)),

    fetchUserRedux: () => dispatch(actions.fetchAllUsersstart()),

    editAUserRedux: (data) => dispatch(actions.editAUser(data)),
    // processLogout: () => dispatch(actions.processLogout()),
    // changeLanguageAppRedux: (language) =>
    //   dispatch(actions.changeLanguageApp(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
