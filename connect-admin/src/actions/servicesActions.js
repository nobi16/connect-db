import {
    SERVICES_CREATE_FAIL,
    SERVICES_CREATE_REQUEST,
    SERVICES_CREATE_SUCCESS,
    SERVICES_DELETE_FAIL,
    SERVICES_DELETE_REQUEST,
    SERVICES_DELETE_SUCCESS,
    SERVICES_LIST_FAIL,
    SERVICES_LIST_REQUEST,
    SERVICES_LIST_SUCCESS,
    SERVICES_UPDATE_FAIL,
    SERVICES_UPDATE_REQUEST,
    SERVICES_UPDATE_SUCCESS,
} from "../constants/servicesContants";
import axios from "axios";

export const listOwnServices = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: SERVICES_LIST_REQUEST,
        });

        let userinfo = localStorage.getItem("userInfo")
        let str = JSON.parse(userinfo);
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${str.token}`,
            },
        };
        const { data } = await axios.get(`http://localhost:5001/api/service/getownservicesbyuid`, config);
        console.log(data);
        await localStorage.setItem("servicesByUid", JSON.stringify(data))
        dispatch({
            type: SERVICES_LIST_SUCCESS,
            payload: data,
        });


    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({
            type: SERVICES_LIST_FAIL,
            payload: message,
        });
    }
};

export const listServices = (business_id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: SERVICES_LIST_REQUEST,
        });

        const {
            userLogin: { userInfo },
        } = getState();
        
        let userinfo = localStorage.getItem("userInfo")
        let str = JSON.parse(userinfo);
        
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${str.token}`,
            },
        };
        
        const { data } = await axios.post(`http://localhost:5001/api/service`, { business_id: `${business_id}` }, config);
        await localStorage.setItem("services", JSON.stringify(data))
        dispatch({
            type: SERVICES_LIST_SUCCESS,
            payload: data,
        });


    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({
            type: SERVICES_LIST_FAIL,
            payload: message,
        });
    }
};


export const listAllServices = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: SERVICES_LIST_REQUEST,
        });

        const config = {
            headers: {
                "Content-Type": "application/json"
            },
        };

        const { data } = await axios.post(`http://localhost:5001/api/service/getallservice`, config);
        await localStorage.setItem("services", JSON.stringify(data))
        dispatch({
            type: SERVICES_LIST_SUCCESS,
            payload: data,
        });


    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({
            type: SERVICES_LIST_FAIL,
            payload: message,
        });
    }
};


export const createServiceAction = (name, price, info, duration, photo, business_id) => async (
    dispatch,
    getState
) => {
    try {
        dispatch({
            type: SERVICES_CREATE_REQUEST,
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

        const { data } = await axios.post(
            `http://localhost:5001/api/service/createservice`,
            { name, price, info, duration, photo, business_id },
            config
        );

        dispatch({
            type: SERVICES_CREATE_SUCCESS,
            payload: data,
        });

        // dispatch(listServices(business_id));
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({
            type: SERVICES_CREATE_FAIL,
            payload: message,
        });
    }
};

export const deleteServiceAction = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: SERVICES_DELETE_REQUEST,
        });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.delete(`http://localhost:5001/api/service/${id}`, config);

        dispatch({
            type: SERVICES_DELETE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({
            type: SERVICES_DELETE_FAIL,
            payload: message,
        });
    }
};

export const updateServiceAction = (name, price, info, duration, photo, business_id, sid) => async (
    dispatch,
    getState
) => {
    try {
        dispatch({
            type: SERVICES_UPDATE_REQUEST,
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
            `http://localhost:5001/api/service/${sid}`,
            { name, price, info, duration, photo },
            config
        );

        dispatch({
            type: SERVICES_UPDATE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({
            type: SERVICES_UPDATE_FAIL,
            payload: message,
        });
    }
};


export const updateServiceRatingAction = (sid, rating, count) => async (
    dispatch,
) => {
    try {
        dispatch({
            type: SERVICES_UPDATE_REQUEST,
        });

        const config = {
            headers: {
                "Content-Type": "application/json"
            },
        };

        const { data } = await axios.put(
            `http://localhost:5001/api/service`,
            { sid, rating, count },
            config
        );

        dispatch({
            type: SERVICES_UPDATE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({
            type: SERVICES_UPDATE_FAIL,
            payload: message,
        });
    }
};
