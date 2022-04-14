import {
  BUSINESS_CREATE_FAIL,
  BUSINESS_CREATE_REQUEST,
  BUSINESS_CREATE_SUCCESS,
  BUSINESS_DELETE_FAIL,
  BUSINESS_DELETE_REQUEST,
  BUSINESS_DELETE_SUCCESS,
  BUSINESS_LIST_FAIL,
  BUSINESS_LIST_REQUEST,
  BUSINESS_LIST_SUCCESS,
  BUSINESS_UPDATE_FAIL,
  BUSINESS_UPDATE_REQUEST,
  BUSINESS_UPDATE_SUCCESS,
} from "../constants/businessConstants.js";
import axios from "axios";

export const listBusiness = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: BUSINESS_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/business`, config);

    await localStorage.setItem("Own_businesses", JSON.stringify(data))
    dispatch({
      type: BUSINESS_LIST_SUCCESS,
      payload: data,
    });

  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: BUSINESS_LIST_FAIL,
      payload: message,
    });
  }
};


export const listAllBusiness = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: BUSINESS_LIST_REQUEST,
    });


    const config = {
      headers: {
        "Content-Type": "application/json"
      },
    };

    const { data } = await axios.get(`/business/getallbusiness`, config);

    await localStorage.setItem("Own_businesses", JSON.stringify(data))
    dispatch({
      type: BUSINESS_LIST_SUCCESS,
      payload: data,
    });

  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: BUSINESS_LIST_FAIL,
      payload: message,
    });
  }
};



export const createBusinessAction = (name, category, mobile, info, photo, longitude, latitude) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: BUSINESS_CREATE_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    debugger

    const { data } = await axios.post(
      "/business/createbusiness",
      { name, category, mobile, info, photo, longitude, latitude },
      config
    );

    dispatch({
      type: BUSINESS_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: BUSINESS_CREATE_FAIL,
      payload: message,
    });
  }
};



export const deleteBusinessAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: BUSINESS_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(`/business/${id}`, config);

    dispatch({
      type: BUSINESS_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: BUSINESS_DELETE_FAIL,
      payload: message,
    });
  }
};

export const updateBusinessAction = (id, name, category, mobile, info, photo, longitude, latitude) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: BUSINESS_UPDATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/business/${id}`,
      { name, category, mobile, info, photo, longitude, latitude },
      config
    );

    dispatch({
      type: BUSINESS_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: BUSINESS_UPDATE_FAIL,
      payload: message,
    });
  }
};

export const updateBusinessRatingAction = (rating, bid, count) => async (
  dispatch,
) => {
  try {
    dispatch({
      type: BUSINESS_UPDATE_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json"
      },
    };

    const { data } = await axios.put(
      `/business`,
      { rating, bid, count },
      config
    );

    dispatch({
      type: BUSINESS_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: BUSINESS_UPDATE_FAIL,
      payload: message,
    });
  }
};
