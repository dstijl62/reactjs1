// import { stringify } from "react-auth-wrapper/helpers";
import axios from "../axios";

const handleLogin = (userEmail, userPassword) => {
  return axios.post("/api/login", {
    email: userEmail,
    password: userPassword,
  });
};

const getAllUsers = (inputId) => {
  return axios.get(`/api/get-all-users?id=${inputId}`);
};

const createNewUserService = (data) => {
  return axios.post("/api/create-new-user", data);
};

const deleteUserService = (userId) => {
  return axios.delete("/api/delete-user", {
    data: {
      id: userId,
    },
  });
};

const editUserService = (inputData) => {
  return axios.put("/api/edit-user", inputData);
};

export {
  handleLogin,
  getAllUsers,
  createNewUserService,
  deleteUserService,
  editUserService,
};
