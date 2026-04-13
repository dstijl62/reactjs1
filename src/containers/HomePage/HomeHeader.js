import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeHeader.scss";
import {
  hospital,
  remote,
  general,
  test,
  mental,
  dental,
  logo,
} from "../../assets/images/icon";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../utils";

import { changeLanguageApp } from "../../store/actions/appActions";

class HomeHeader extends Component {
  changeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
    //fire redux event : actions
  };

  render() {
    let language = this.props.language;

    return (
      <React.Fragment>
        {/* <div className="home-header-container">
          <div className="home-header-content">
            <div className="left-content">
              <i className="fas fa-bars"></i>

              <div className="header-logo">
               
              </div>
            </div> */}

        {/*             
            <div className="center-content">
              <div className="child-content">
                <div>
                  <b>
                    <FormattedMessage id="homeheader.specilaity" />
                  </b>
                </div>
                <div className="subs-title">
                </div>
              </div> */}

        {/* <div className="child-content">
                <div>
                  <b>
                    <FormattedMessage id="homeheader.healthfacility" />
                  </b>
                </div>
                <div className="subs-title">
                </div>
              </div> */}

        {/* <div className="child-content">
                <div>
                  <b>
                    <FormattedMessage id="homeheader.doctor" />
                  </b>
                </div>
                <div className="subs-title">
                </div>
              </div> */}

        {/* <div className="child-content">
                <div>
                  <b>
                    <FormattedMessage id="homeheader.package" />
                  </b>
                </div>
                <div className="subs-title">
                 
                </div>
              </div>
            </div> */}

        {/* <div className="right-content">
              <div className="support">
                <i className="fas fa-question-circle"></i>
                <FormattedMessage id="homeheader.help" />
              </div>
              <div className="language">
                <div
                  className={
                    language === LANGUAGES.VI
                      ? "language-vi active"
                      : "language-vi"
                  } */}

        {/* <span onClick={() => this.changeLanguage(LANGUAGES.VI)}>
                    VI
                  </span>
                </div>
                <div
                  className={
                    language === LANGUAGES.EN
                      ? "language-en active"
                      : "language-en"
                  }
                >
                  <span onClick={() => this.changeLanguage(LANGUAGES.EN)}>
                    EN
                  </span>
                </div>
                <div
                  className={
                    language === LANGUAGES.JA
                      ? "language-ja active"
                      : "language-ja"
                  } */}

        {/* <span onClick={() => this.changeLanguage(LANGUAGES.JA)}>
                    JA
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div> */}

        <div className="home-header-banner">
          <div className="content-top">
            <div className="title1">
              <FormattedMessage id="banner.title1" />
            </div>
            <div className="title2">
              <FormattedMessage id="banner.title2" />
            </div>
            <div className="search">
              <i className="fas fa-search"></i>
              <input type="text" placeholder="Tìm chuyên khoa khám bệnh" />
            </div>
          </div>

          <div className="content-bottom">
            <div className="container">
              <div className="row">
                {/* item 1 */}
                <div className="col-md-2 text-center option-child">
                  <div className="icon-child">
                    <img src={hospital} alt="icon" />
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="banner.specializedexam" />
                  </div>
                </div>

                {/* item 2 */}

                <div className="col-2 text-center option-child">
                  <div className="icon-child">
                    <img src={remote} alt="icon" />
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="banner.telemedicine" />
                  </div>
                </div>

                {/* item 3 */}

                <div className="col-2 text-center option-child">
                  <div className="icon-child">
                    <img src={general} alt="icon" />
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="banner.generalexam" />
                  </div>
                </div>

                {/* item 4 */}

                <div className="col-2 text-center option-child">
                  <div className="icon-child">
                    <img src={test} alt="icon" />
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="banner.labtest" />
                  </div>
                </div>

                {/* item 5 */}

                <div className="col-2 text-center option-child">
                  <div className="icon-child">
                    <img src={mental} alt="icon" />
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="banner.mentalhealth" />
                  </div>
                </div>

                {/* item 6 */}

                <div className="col-2 text-center option-child">
                  <div className="icon-child">
                    <img src={dental} alt="icon" />
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="banner.dentalexam" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
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
  return {
    changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
