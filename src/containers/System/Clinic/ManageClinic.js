import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManageClinic.scss";
import { LANGUAGES, CommonUtils } from "../../../utils";
import { FormattedMessage } from "react-intl";
import Select from "react-select";

import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";

import "react-markdown-editor-lite/lib/index.css";
import { createNewClinic } from "../../../services/userService";
import { toast } from "react-toastify";

const mdParser = new MarkdownIt(/* Markdown it options */);

class ManageClinic extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      address: "",
      imageBase64: "",
      descriptionHTML: "",
      descriptionMarkdown: "",
    };
  }

  async componentDidMount() {}

  async componentDidUpdate(prevProps) {
    if (this.props.language !== prevProps.language) {
    }
  }

  handleOnChangeInput = (event, id) => {
    let stateCopy = { ...this.state };
    stateCopy[id] = event.target.value;
    this.setState({
      ...stateCopy,
    });
  };

  handleEditorChange = ({ html, text }) => {
    this.setState({
      descriptionMarkdown: text,
      descriptionHTML: html,
    });
    // console.log("handleEditorChange", html, text);
  };

  handleOnchangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      //   console.log("check base64 image: ", base64);
      //   let objectUrl = URL.createObjectURL(file);
      this.setState({
        // previewImgURL: objectUrl,
        imageBase64: base64,
      });
    }
  };

  handleSaveNewClinic = async () => {
    let res = await createNewClinic(this.state);
    if (res && res.errCode === 0) {
      toast.success("Add new clinic Succeed!");
      this.setState({
        name: "",
        address: "",
        imageBase64: "",
        descriptionHTML: "",
        descriptionMarkdown: "",
      });
    } else {
      toast.error("Add new clinic Error!");
      console.log(" >>>>> Check res: ", res);
    }
  };

  render() {
    let { hasOldData } = this.state;

    // console.log("check state:", this.state);

    return (
      <div className="manage-clinic-container">
        <div className="manage-clinic-title">
          Quản Lý Phòng Khám
          {/* <FormattedMessage id="admin.manage-specialty.title" /> */}
        </div>
        <div className="manage-clinic-editor">
          <div className="more-infor row">
            <div className="col-8 content-left">
              <label>
                Tên Phòng Khám
                {/* <FormattedMessage id="admin.manage-specialty.select-specialty" /> */}
              </label>
              <input
                className="form-control"
                type="text"
                value={this.state.name}
                onChange={(event) => this.handleOnChangeInput(event, "name")}
              ></input>
            </div>

            <div className="col-4 content-right form-group">
              <label>
                Ảnh Phòng Khám
                {/* <FormattedMessage id="admin.manage-doctor.intro" /> */}
              </label>
              <input
                className="form-control"
                type="file"
                onChange={(event) => this.handleOnchangeImage(event)}
              ></input>
            </div>
          </div>

          <div className="col-8 pb-5 content-left">
            <label>
              Địa chỉ Phòng Khám:
              {/* <FormattedMessage id="admin.manage-specialty.select-specialty" /> */}
            </label>
            <input
              className="form-control"
              type="text"
              value={this.state.address}
              onChange={(event) => this.handleOnChangeInput(event, "address")}
            ></input>
          </div>

          <MdEditor
            style={{ height: "500px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={this.handleEditorChange}
            value={this.state.descriptionMarkdown}
          />
        </div>
        <button
          className={
            hasOldData === true
              ? "btn btn-primary btn-save-clinic"
              : "btn btn-primary btn-create-clinic"
          }
          onClick={() => this.handleSaveNewClinic()}
        >
          {hasOldData === true ? (
            <span>
              <FormattedMessage id="admin.manage-clinic.save-info" />
            </span>
          ) : (
            <span>
              <FormattedMessage id="admin.manage-clinic.create-info" />
            </span>
          )}
        </button>
      </div>
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
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
