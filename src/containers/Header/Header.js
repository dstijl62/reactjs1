import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../store/actions";
import Navigator from "../../components/Navigator";
import { adminMenu, doctorMenu } from "./menuApp";
import "./Header.scss";

import { LANGUAGES, USER_ROLE } from "../../utils";

import { FormattedMessage } from "react-intl";

import { changeLanguageApp } from "../../store/actions";
import _ from "lodash";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuApp: [],
    };
  }
  handleChangeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
  };

  componentDidMount() {
    let { userInfo } = this.props;
    let menu = [];

    if (userInfo && !_.isEmpty(userInfo)) {
      let role = userInfo.roleId;
      if (role === USER_ROLE.ADMIN) {
        menu = adminMenu;
      }

      if (role === USER_ROLE.DOCTOR) {
        menu = doctorMenu;
      }
    }

    this.setState({
      menuApp: menu,
    });
    console.log(" Get userinfor: ", this.props.userInfo);
  }

  render() {
    const { processLogout, language, userInfo } = this.props;
    console.log("check userInfo: ", userInfo);

    return (
      <div className="header-container">
        {/* thanh navigator */}
        <div className="header-tabs-container">
          <Navigator menus={this.state.menuApp} />
        </div>

        <div className="languages">
          <span className="welcome">
            <FormattedMessage id="homeheader.welcome" />,
            {userInfo && userInfo.firstName ? userInfo.firstName : ""}
          </span>
          {/* ============================== */}
          <div className="header-language-menu">
            <div className="language-title">
              {{ vi: "VI", en: "EN", ja: "JA" }[language] || "LA"}
              <i className="fas fa-angle-down"></i>
            </div>

            <ul className="language-dropdown">
              <li onClick={() => this.props.changeLanguageAppRedux("vi")}>
                VN
              </li>
              <li onClick={() => this.props.changeLanguageAppRedux("en")}>
                EN
              </li>
              <li onClick={() => this.props.changeLanguageAppRedux("ja")}>
                JA
              </li>
            </ul>
          </div>

          {/* ======================= */}
          {/* <span
            className={
              language === LANGUAGES.VI ? "language-vi active" : "language-vi"
            }
            onClick={() => this.handleChangeLanguage(LANGUAGES.VI)}
          >
            VN
          </span>
          <span
            className={
              language === LANGUAGES.EN ? "language-en active" : "language-en"
            }
            onClick={() => this.handleChangeLanguage(LANGUAGES.EN)}
          >
            EN
          </span> */}

          {/* nút logout */}
          <div
            className="btn btn-logout"
            onClick={processLogout}
            title="Log out"
          >
            <i className="fas fa-sign-out-alt"></i>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processLogout: () => dispatch(actions.processLogout()),
    changeLanguageAppRedux: (language) =>
      dispatch(actions.changeLanguageApp(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
