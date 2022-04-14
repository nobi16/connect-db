import axios from "axios";
import { USER_LOGIN_CLOSE, USER_LOGIN_FAIL, USER_LOGIN_OPEN, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_REGISTER_CLOSE, USER_REGISTER_FAIL, USER_REGISTER_OPEN, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_UPDATE_FAIL, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS } from "../constants/userConstants.js";

export const login = (userName, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST })

    const config = {
      headers: {
        "Content-type": "application/json",
      }
    };

    const { data } = await axios.post(
      "/api/user/signin",
      { userName, password },
      config
    );

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data })

    localStorage.setItem("userInfo", JSON.stringify(data));

  } catch (error) {
    dispatch({ type: USER_LOGIN_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message })
  }
}


export const logout = () => async (dispatch) => {
  localStorage.removeItem('userInfo');
  dispatch({ type: USER_LOGOUT });
  // dispatch(SHOW_LOGIN_MENU())
}


export const register = (name, userName, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const { data } = await axios.post(
      "/api/user/signup",
      { name, userName, password },
      config
    );

    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    localStorage.setItem("userInfo", JSON.stringify(data));

  } catch (error) {
    console.log(error);
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_UPDATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/user/updateuser`, user, config);

    dispatch({ type: USER_UPDATE_SUCCESS, payload: data });

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const SHOW_LOGIN_MENU = () => async (dispatch) => {
  dispatch({ type: USER_LOGIN_OPEN })
}

export const HIDE_LOGIN_MENU = () => async (dispatch) => {
  dispatch({ type: USER_LOGIN_CLOSE })
}

export const SHOW_REGISTER_MENU = () => async (dispatch) => {
  dispatch({ type: USER_REGISTER_OPEN })
}

export const HIDE_REGISTER_MENU = () => async (dispatch) => {
  dispatch({ type: USER_REGISTER_CLOSE })
}