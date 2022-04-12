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
import {BASE_URL} from '../config.json'

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

    const { data } = await axios.get(`${BASE_URL}/business`, config);

    await localStorage.setItem("businesses", JSON.stringify(data))
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

// export const createBusinessAction = (business) => async (
//   dispatch,
//   getState
// ) => {
//   console.log(business);
//   try {
//     dispatch({
//       type: BUSINESS_CREATE_REQUEST,
//     });

//     const {
//       userLogin: { userInfo },
//     } = getState();

//     const config = {
//       headers: {
//         "Content-Type": "multipart/form-data",
//         Authorization: `Bearer ${userInfo.token}`,
//       },
//     };
//     debugger

//     const { data } = await axios.post(
//       "${BASE_URL}/business/createbusiness",
//       business,
//       config
//     );

//     // const { data } = await fetch(
//     //   "${BASE_URL}/business/createbusiness",
//     //   {
//     //     method: 'post',
//     //     body: business,
//     //     headers: {
//     //       'Content-Type': 'multipart/form-data; ',
//     //        "Authorization": `Bearer ${userInfo.token}`,
//     //     },
//     //   }
//     // );
//     dispatch({
//       type: BUSINESS_CREATE_SUCCESS,
//       payload: data,
//     });
//   } catch (error) {
//     const message =
//       error.response && error.response.data.message
//         ? error.response.data.message
//         : error.message;
//     dispatch({
//       type: BUSINESS_CREATE_FAIL,
//       payload: message,
//     });
//   }
// };


export const createBusinessAction = (name, category, mobile, photo, longitude, latitude) => async (
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
      `${BASE_URL}/business/createbusiness`,
      { name, category, mobile, photo, longitude, latitude },
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

    const { data } = await axios.delete(`${BASE_URL}/business/${id}`, config);

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

export const updateBusinessAction =  (id, name, category, mobile, photo, longitude, latitude) => async (
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
      `${BASE_URL}/business/${id}`,
      { name, category, mobile, photo, longitude, latitude },
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

export const updateBusinessRatingAction =  (rating, bid, count) => async (
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
      `${BASE_URL}/business`,
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
