import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";

import { LANGUAGES } from "../../../utils";

import "./ManageDoctor.scss";

import * as actions from "../../../store/actions";

// ====================
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";

import "react-markdown-editor-lite/lib/index.css";
// ====================
import Select from "react-select";

const mdParser = new MarkdownIt(/* Markdown it options */);

class ManageDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentMarkdown: "",
      contentHTML: "",
      selectedOption: "",
      description: "",
      listDoctors: [],
    };
  }

  componentDidMount() {
    this.props.fetchAllDoctorsRedux();
  }

  buildDataInputSelect = (inputData) => {
    let result = [];

    let { language } = this.props;

    if (inputData && inputData.length > 0) {
      inputData.map((item, index) => {
        let object = {};
        let labelVi = `${item.lastName} ${item.firstName}`;
        let labelEn = `${item.firstName} ${item.lastName} `;

        object.label = language === LANGUAGES.VI ? labelVi : labelEn;
        object.value = item.id;
        result.push(object);
      });
    }
    return result;
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allDoctors !== this.props.allDoctors) {
      let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
      this.setState({
        listDoctors: dataSelect,
      });
    }

    if (prevProps.language !== this.props.language) {
      let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
      this.setState({
        listDoctors: dataSelect,
      });
    }
  }

  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentMarkdown: text,
      contentHTML: html,
    });
    // console.log("handleEditorChange", html, text);
  };

  handleSaveContentMarkdown = () => {
    this.props.saveDetailDoctorRedux({
      contentHTML: this.state.contentHTML,
      contentMarkdown: this.state.contentMarkdown,
      description: this.state.description,
      doctorId: this.state.selectedOption.value,
    });
  };

  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    // console.log("Option selected:", selectedOption);
  };

  handleOnChangeDesc = (event) => {
    this.setState({
      description: event.target.value,
    });
  };

  render() {
    console.log(" check all doctors state: ", this.state);
    return (
      <div className="manage-doctor-container">
        <div className="manage-doctor-title">Tạo thêm thông tin Bác Sĩ</div>
        <div className="manage-doctor-editor">
          <div className="more-infor">
            <div className="content-left">
              <label> Chọn Bác Sĩ</label>
              <Select
                value={this.state.selectedOption}
                onChange={this.handleChange}
                options={this.state.listDoctors}
              />
            </div>
            <div className="content-right form-group">
              <label>Thông tin giới thiệu:</label>
              <textarea
                className="form-control"
                rows="4"
                onChange={(event) => this.handleOnChangeDesc(event)}
                value={this.state.description}
              ></textarea>
            </div>
          </div>
          <MdEditor
            style={{ height: "500px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={this.handleEditorChange}
          />
        </div>
        <button
          className="btn btn-primary btn-submit"
          //   type="submit"
          //   className={
          //     this.state.action === CRUD_ACTIONS.EDIT
          //       ? "btn btn-warning btn-submit"
          //       : "btn btn-primary btn-submit"
          //   }
          onClick={() => this.handleSaveContentMarkdown()}
        >
          {/* {this.state.action === CRUD_ACTIONS.EDIT ? (
            <FormattedMessage id="manageuser-form.edit" />
          ) : (
            <FormattedMessage id="manageuser-form.submit" />
          )} */}
          Lưu thông tin
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    allDoctors: state.admin.allDoctors,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctorsRedux: (id) => dispatch(actions.fetchAllDoctors()),
    saveDetailDoctorRedux: (data) => dispatch(actions.saveDetailDoctor(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
