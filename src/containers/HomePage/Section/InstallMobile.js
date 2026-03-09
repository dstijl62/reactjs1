import React, { Component } from "react";
import { connect } from "react-redux";
import "./InstallMobile.scss";
import {
  Rectangle,
  GooglePlay,
  AppStore,
} from "../../../assets/installMobile/installMobile";

class InstallMobile extends Component {
  render() {
    return (
      <section className="install">
        <div className="container">
          <div className="install__inner">
            {/* install left */}
            <figure>
              <img src={Rectangle} alt="Dentist" class="install__img" />
            </figure>

            {/* install right */}
            <section className="install__content">
              <h2 className="section-heading install__heading">
                Take back your smile with dentures
              </h2>

              <p className="install__desc">
                If you’re missing multiple teeth due to decay, injury, or the
                natural aging process, dentures might be the perfect solution.
              </p>

              <div className="install__row">
                <a href="#!">
                  <img
                    src={GooglePlay}
                    alt="Dentist"
                    class="install__btn-img"
                  />
                </a>

                <a href="#!">
                  <img src={AppStore} alt="Dentist" class="install__btn-img" />
                </a>
              </div>
            </section>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

export default connect(mapStateToProps)(InstallMobile);
