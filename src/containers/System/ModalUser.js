import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class ModalUser extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}

  toggle = () => {
    this.props.toggleFromParent();
    // alert("me toggle");
  };

  render() {
    console.log("check child props", this.props);
    console.log("check child open modal", this.props.isOpen);
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
        <ModalHeader>Create a new user</ModalHeader>
        <ModalBody>
          <div className="modal-user-body">
            <div className="input-container full-width">
              <label>Email</label>
              <input
                type="email"
                value={this.state.email}
                onChange={(e) => this.handleOnChange(e, "email")}
              />
            </div>

            <div className="input-container full-width">
              <label>Password</label>
              <input
                type="password"
                value={this.state.password}
                onChange={(e) => this.handleOnChange(e, "password")}
              />
            </div>

            <div className="input-container">
              <label>First Name</label>
              <input
                type="text"
                value={this.state.firstName}
                onChange={(e) => this.handleOnChange(e, "firstName")}
              />
            </div>

            <div className="input-container">
              <label>Last Name</label>
              <input
                type="text"
                value={this.state.lastName}
                onChange={(e) => this.handleOnChange(e, "lastName")}
              />
            </div>

            <div className="input-container full-width">
              <label>Address</label>
              <input
                type="text"
                value={this.state.address}
                onChange={(e) => this.handleOnChange(e, "address")}
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
              this.toggle();
            }}
          >
            Do Something
          </Button>{" "}
          <Button
            color="secondary"
            onClick={() => {
              this.toggle();
            }}
          >
            Cancel
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
