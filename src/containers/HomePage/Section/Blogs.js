import React, { Component } from "react";
import { connect } from "react-redux";
import "./Blogs.scss";
import { vaccine1, vaccine2, vaccine3 } from "../../../assets/blogs/blogs-img";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class Blogs extends Component {
  render() {
    let settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 2,
      slidesToScroll: 1,
    };

    return (
      <section className="blog">
        <div className="container">
          <div className="blog__inner">
            {/* LEFT BLOG */}
            <section className="blog__content">
              <h2 className="section-heading blog__heading">
                Read Latest News & Events.
              </h2>

              <a href="#!" className="blog__more">
                Read All Blog
              </a>

              {/* CONTROL BUTTONS */}
              {/* <div className="control blog__control">
                <button className="control__btn">
                  <svg
                    className="control-icon"
                    xmlns="http://www.w3.org/2000/svg"
                    width="6"
                    height="11"
                    viewBox="0 0 6 11"
                    fill="none"
                  >
                    <path
                      d="M5.5 0.5L0.5 5.5L5.5 10.5"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                <button className="control__btn">
                  <svg
                    className="control-icon control-icon--next"
                    xmlns="http://www.w3.org/2000/svg"
                    width="6"
                    height="11"
                    viewBox="0 0 6 11"
                    fill="none"
                  >
                    <path
                      d="M5.5 0.5L0.5 5.5L5.5 10.5"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div> */}
            </section>

            {/* RIGHT BLOG (SLIDER) */}
            <div className="blog__list">
              <Slider {...settings}>
                {/* ITEM 1 */}
                <article className="blog-item">
                  <figure className="blog-item__wrap">
                    <img
                      src={vaccine1}
                      alt="Dentist"
                      class="blog-item__thumb"
                    />
                  </figure>

                  <section className="blog-item__body">
                    <h3>
                      <a href="#!" className="blog-item__heading">
                        Key Considerations for Regulatory Compliant.
                      </a>
                    </h3>
                    <p className="blog-item__desc">
                      It’s easy to think about medical care from a narrow
                      perspective. You go to the hospital.
                    </p>
                    <a href="#!" className="blog-item__more">
                      Learn More
                    </a>
                  </section>
                </article>

                {/* ITEM 2 */}
                <article className="blog-item">
                  <figure className="blog-item__wrap">
                    <img
                      src={vaccine2}
                      alt="Dentist"
                      class="blog-item__thumb"
                    />
                  </figure>

                  <section className="blog-item__body">
                    <h3>
                      <a href="#!" className="blog-item__heading">
                        What Is Population Health Management?
                      </a>
                    </h3>
                    <p className="blog-item__desc">
                      It’s easy to think about medical care from a narrow
                      perspective. You go to the hospital.
                    </p>
                    <a href="#!" className="blog-item__more">
                      Learn More
                    </a>
                  </section>
                </article>

                {/* ITEM 3 */}
                <article className="blog-item">
                  <figure className="blog-item__wrap">
                    <img
                      src={vaccine3}
                      alt="Dentist"
                      class="blog-item__thumb"
                    />
                  </figure>

                  <section className="blog-item__body">
                    <h3>
                      <a href="#!" className="blog-item__heading">
                        What Is Population Health Management?
                      </a>
                    </h3>
                    <p className="blog-item__desc">
                      It’s easy to think about medical care from a narrow
                      perspective. You go to the hospital.
                    </p>
                    <a href="#!" className="blog-item__more">
                      Learn More
                    </a>
                  </section>
                </article>

                {/* ITEM 4 */}
                <article className="blog-item">
                  <figure className="blog-item__wrap">
                    <img
                      src={vaccine1}
                      alt="Dentist"
                      class="blog-item__thumb"
                    />
                  </figure>

                  <section className="blog-item__body">
                    <h3>
                      <a href="#!" className="blog-item__heading">
                        What Is Population Health Management?
                      </a>
                    </h3>
                    <p className="blog-item__desc">
                      It’s easy to think about medical care from a narrow
                      perspective. You go to the hospital.
                    </p>
                    <a href="#!" className="blog-item__more">
                      Learn More
                    </a>
                  </section>
                </article>
              </Slider>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.user.isLoggedIn,
  language: state.app.language,
});

export default connect(mapStateToProps)(Blogs);
