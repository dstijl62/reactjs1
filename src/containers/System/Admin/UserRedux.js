import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserRedux.scss";
import { getAllCodeService } from "../../../services/userService";
import { LANGUAGES } from "../../../utils";

import * as actions from "../../../store/actions";
// import { escape, escapeRegExp } from "lodash";

class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genderArr: [],
    };
  }

  async componentDidMount() {
    this.props.getGenderStart();
    // this.props.dispatch(actions.getGenderStart());
    // try {
    //   let res = await getAllCodeService("gender");
    //   console.log("gender data: ", res.data);
    //   if (res && res.errCode === 0) {
    //     this.setState({
    //       genderArr: res.data,
    //     });
    //   }
    //   console.log("check respone: ", res);
    // } catch (e) {
    //   console.log(e);
    // }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.genderRedux !== this.props.genderRedux) {
      this.setState({
        genderArr: this.props.genderRedux,
      });
    }
  }

  render() {
    console.log(" check state: ", this.state);
    let genders = this.state.genderArr;
    let language = this.props.language;

    console.log(" check props from Redux: ", this.props.genderRedux);
    return (
      <div className="user-redux container">
        <div className="title">Welcome to User Redux</div>

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

              <div className="col-md-6">
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
              <div className="col-md-2">
                <label htmlFor="inputState" className="form-label">
                  <FormattedMessage id="manageuser-form.role" />
                </label>
                <select className="form-select">
                  <option defaultValue="">Admin</option>
                  <option>Doctor</option>
                  <option>Patient</option>
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label">
                  <FormattedMessage id="manageuser-form.image" />
                </label>
                <input type="text" className="form-control" />
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
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genderRedux: state.admin.genders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(actions.fetchGenderstart()),
    // processLogout: () => dispatch(actions.processLogout()),
    // changeLanguageAppRedux: (language) =>
    //   dispatch(actions.changeLanguageApp(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
