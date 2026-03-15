import actionTypes from "./actionTypes";
import {
  getAllCodeService,
  createNewUserService,
  getAllUsers,
  deleteUserService,
  editUserService,
} from "../../services/userService";

import { toast } from "react-toastify";

// export const fetchGenderstart = () => ({
//   type: actionTypes.FETCH_GENDER_START,
// });

// Cách viết số 2 : return function

export const fetchGenderstart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: actionTypes.FETCH_GENDER_START,
      });
      let res = await getAllCodeService("GENDER");
      if (res && res.errCode === 0) {
        dispatch(fetchGenderSuccess(res.data));
      } else {
        dispatch(fetchGenderFailed());
      }
    } catch (e) {
      dispatch(fetchGenderFailed());
      console.log("fetchGenderstart error", e);
    }
  };
};

export const fetchGenderSuccess = (genderData) => ({
  type: actionTypes.FETCH_GENDER_SUCCESS,
  data: genderData,
});

export const fetchGenderFailed = () => ({
  type: actionTypes.FETCH_GENDER_FAILED,
});

export const fetchPositionSuccess = (positionData) => ({
  type: actionTypes.FETCH_POSITION_SUCCESS,
  data: positionData,
});

export const fetchPositionFailed = () => ({
  type: actionTypes.FETCH_POSITION_FAILED,
});

export const fetchRoleSuccess = (roleData) => ({
  type: actionTypes.FETCH_ROLE_SUCCESS,
  data: roleData,
});

export const fetchRoleFailed = () => ({
  type: actionTypes.FETCH_ROLE_FAILED,
});

// =====================
export const fetchPositionstart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("POSITION");
      if (res && res.errCode === 0) {
        dispatch(fetchPositionSuccess(res.data));
      } else {
        dispatch(fetchPositionFailed());
      }
    } catch (e) {
      dispatch(fetchPositionFailed());
      console.log("fetchPositionstart error", e);
    }
  };
};

// ====================

// =====================
export const fetchRolestart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("ROLE");
      if (res && res.errCode === 0) {
        dispatch(fetchRoleSuccess(res.data));
      } else {
        dispatch(fetchRoleFailed());
      }
    } catch (e) {
      dispatch(fetchRoleFailed());
      console.log("fetchRolestart error", e);
    }
  };
};

// ====================

export const createNewUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await createNewUserService(data);
      console.log(" check create User Redux: ", res);
      if (res && res.errCode === 0) {
        toast.success("Create A New User Succeed!");
        dispatch(saveUserSuccess());
        dispatch(fetchAllUsersstart());
      } else {
        dispatch(saveUserFailed());
      }
    } catch (e) {
      dispatch(saveUserFailed());
      console.log("saveUserFailed error", e);
    }
  };
};

export const saveUserSuccess = () => ({
  type: actionTypes.CREATE_USER_SUCCESS,
});

export const saveUserFailed = () => ({
  type: actionTypes.CREATE_USER_FAILED,
});

// ========================== All User
export const fetchAllUsersstart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllUsers("All");
      console.log("check API return : ", res);
      if (res && res.errCode === 0) {
        dispatch(fetchAllUsersSuccess(res.users.reverse()));
      } else {
        toast.error("Fetch All User Error!");
        dispatch(fetchAllUsersFailed());
      }
    } catch (e) {
      toast.error("Fetch All User Error!");
      dispatch(fetchAllUsersFailed());
      console.log("fetchAllUsersstart error", e);
    }
  };
};

export const fetchAllUsersSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_USERS_SUCCESS,
  users: data,
});

export const fetchAllUsersFailed = (data) => ({
  type: actionTypes.FETCH_ALL_USERS_FAILED,
});

// ====================== DELETE USER

export const deleteAUser = (userId) => {
  return async (dispatch, getState) => {
    try {
      let res = await deleteUserService(userId);
      console.log(" check delete User Redux: ", res);
      if (res && res.errCode === 0) {
        toast.success("Delete The User Succeed!");
        dispatch(deleteUserSuccess());
        dispatch(fetchAllUsersstart());
      } else {
        // toast.error("Delete The User Error!");
        dispatch(deleteUserFailed());
      }
    } catch (e) {
      // toast.error("Delete The User Error!");
      dispatch(deleteUserFailed());
      console.log("deleteUserFailed error", e);
    }
  };
};

export const deleteUserSuccess = () => ({
  type: actionTypes.DELELE_USER_SUCCESS,
});

export const deleteUserFailed = () => ({
  type: actionTypes.DELELE_USER_FAILED,
});

// ================== Edit User

export const editAUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await editUserService(data);
      console.log(" check Edit User Redux: ", res);
      if (res && res.errCode === 0) {
        toast.success("Update The User Succeed!");
        dispatch(editUserSuccess());
        dispatch(fetchAllUsersstart());
      } else {
        toast.error("Update The User Error!");
        dispatch(editUserFailed());
      }
    } catch (e) {
      toast.error("Update The User Error!");
      dispatch(editUserFailed());
      console.log("deleteUserFailed error", e);
    }
  };
};

export const editUserSuccess = () => ({
  type: actionTypes.EDIT_USER_SUCCESS,
});

export const editUserFailed = () => ({
  type: actionTypes.EDIT_USER_FAILED,
});
