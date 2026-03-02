import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserManage.scss";
import { getAllUsers } from "../../services/userService";
import ModalUser from "./ModalUser";

class UserManage extends Component {
  //   state = {};

  constructor(props) {
    super(props);
    this.state = {
      arrUsers: [],
      isOpenModalUser: false,
    };
  }

  async componentDidMount() {
    let response = await getAllUsers("All");
    if (response && response.errCode === 0) {
      this.setState(
        {
          arrUsers: response.users,
        },
        () => {
          // console.log("check state user 2", this.state.arrUsers); // []
        },
      );
      // console.log("check state user 1", this.state.arrUsers); // []
    }
  }

  handleAddNewUser = () => {
    this.setState({
      isOpenModalUser: true,
    });
  };

  toggleUserModal = () => {
    this.setState({
      isOpenModalUser: !this.state.isOpenModalUser,
    });
  };

  render() {
    console.log("check render:", this.state);
    let arrUsers = this.state.arrUsers;
    // properties ; nested
    return (
      <div className="users-container">
        <ModalUser
          isOpen={this.state.isOpenModalUser}
          toggleFromParent={this.toggleUserModal}
          test={"abc"}
        />
        <div className="title text-center">Manage users with Reactjs</div>
        <div className="mx-1 d-flex justify-content-end mb-3">
          <button
            className="btn btn-primary px-3 rounded-pill"
            onClick={() => this.handleAddNewUser()}
          >
            <i className="fas fa-user-plus pe-1"></i>Add
          </button>
        </div>

        <div className="users-table mt-3 mx-1">
          <table>
            <tr>
              <th>Email</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>

            {arrUsers &&
              arrUsers.map((item, index) => {
                // console.log("Check map", item, index);
                return (
                  <tr>
                    <td>{item.email}</td>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.address}</td>
                    <td>
                      <button className="btn-edit">
                        <i className="fas fa-edit"></i>
                      </button>
                      <button className="btn-delete">
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
