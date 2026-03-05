import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
// import { emitter } from "../../utils/emitter";
import _ from "lodash";

class ModalEditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
    };
  }

  componentDidMount() {
    let user = this.props.currentUser;
    // let {currentUser} = this.props;
    if (user && !_.isEmpty(user)) {
      this.setState({
        id: user.id,
        email: user.email,
        password: "hashcode",
        firstName: user.firstName,
        lastName: user.lastName,
        address: user.address,
      });
    }
    console.log("didmount edit modal", this.props.currentUser);
  }

  toggle = () => {
    this.props.toggleFromParent();
    // alert("me toggle");
  };

  handleOnChangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;

    this.setState({ ...copyState });
  };

  checkValidateInput = () => {
    let isValid = true;
    let arrInput = ["email", "password", "firstName", "lastName", "address"];
    for (let i = 0; i < arrInput.length; i++) {
      // console.log("check inside loop: ", this.state[arrInput[i]], arrInput[i]);

      if (!this.state[arrInput[i]]) {
        isValid = false;
        alert("Missing parameter: ", +arrInput[i]);
        break;
      }
    }
    return isValid;
  };

  handleSaveUser = () => {
    let isValid = this.checkValidateInput();
    if (isValid === true) {
      // call API edit user modal

      this.props.editUser(this.state);
    }
  };

  render() {
    // console.log("check props from parent: ", this.props);
    // console.log("check child props", this.props);
    // console.log("check child open modal", this.props.isOpen);
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={() => {
          this.toggle();
        }}
        className={"modal-user-container"}
        size="md"
        centered
      >
        <ModalHeader>Edit a user</ModalHeader>
        <ModalBody>
          <div className="modal-user-body">
            <div className="input-container full-width">
              <label>Email</label>
              <input
                type="email"
                value={this.state.email}
                disabled
                onChange={(event) => this.handleOnChangeInput(event, "email")}
              />
            </div>

            <div className="input-container full-width">
              <label>Password</label>
              <input
                type="password"
                value={this.state.password}
                disabled
                onChange={(event) =>
                  this.handleOnChangeInput(event, "password")
                }
              />
            </div>

            <div className="input-container">
              <label>First Name</label>
              <input
                type="text"
                value={this.state.firstName}
                onChange={(event) =>
                  this.handleOnChangeInput(event, "firstName")
                }
              />
            </div>

            <div className="input-container">
              <label>Last Name</label>
              <input
                type="text"
                value={this.state.lastName}
                onChange={(event) =>
                  this.handleOnChangeInput(event, "lastName")
                }
              />
            </div>

            <div className="input-container full-width">
              <label>Address</label>
              <input
                type="text"
                value={this.state.address}
                onChange={(event) => this.handleOnChangeInput(event, "address")}
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            className="px-3"
            onClick={() => {
              this.handleSaveUser();
            }}
          >
            Save changes
          </Button>{" "}
          <Button
            color="secondary"
            className="px-3"
            onClick={() => {
              this.toggle();
            }}
          >
            Close
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
