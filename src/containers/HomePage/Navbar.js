import React, { Component } from "react";
import { connect } from "react-redux";
import { logo } from "../../assets/images/logo";
import { LANGUAGES } from "../../utils";
import { changeLanguageApp } from "../../store/actions/appActions";
import "./Navbar.scss";

class Navbar extends Component {
  changeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
  };

  render() {
    let language = this.props.language;

    return (
      <header className="header">
        <div className="container">
          {/* ======================= Khối Top =========================== */}
          <div className="header-top">
            {/* logo */}
            <a href="#!">
              <img src={logo} alt="shine smile" className="logo" />
            </a>

            {/* Navigation */}
            <nav className="navbar">
              <ul className="navbar__list">
                <li className="navbar__item">
                  <a href="#!" className="navbar__link">
                    Home
                  </a>
                </li>

                <li className="navbar__item">
                  <a href="#!" className="navbar__link navbar__link--active">
                    Services
                  </a>
                </li>

                <li className="navbar__item">
                  <a href="#!" className="navbar__link">
                    About
                  </a>
                </li>

                <li className="navbar__item">
                  <a href="#!" className="navbar__link">
                    Doctors
                  </a>
                </li>
              </ul>
            </nav>

            {/* CTA + Language */}
            <div className="header__action">
              <a href="#!" className="header__action--login">
                Log In
              </a>
              <a href="#!" className="btn header__action--signup">
                Sign Up
              </a>

              {/* ==================== Language Switcher ==================== */}
              <div className="language">
                {/* <div
                  className={
                    language === LANGUAGES.VI
                      ? "language-vi active"
                      : "language-vi"
                  }
                >
                  <span onClick={() => this.changeLanguage(LANGUAGES.VI)}>
                    VI
                  </span>
                </div> */}

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
                  }
                >
                  <span onClick={() => this.changeLanguage(LANGUAGES.JA)}>
                    JA
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
