import {
    PRODUCT_CREATE_FAIL,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_DELETE_FAIL,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_UPDATE_FAIL,
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
} from "../constants/productsConstants";
import axios from "axios";

export const listProduct = (business_id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_LIST_REQUEST,
        });

        const {
            userLogin: { userInfo },
        } = getState();

        // const config = {
        //     headers: {
        //         "Content-Type": "application/json",
        //         Authorization: `Bearer ${userInfo.token}`,
        //     },
        // };
        let userinfo = localStorage.getItem("userInfo")
        let str = JSON.parse(userinfo);
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${str.token}`,
            },
        };
        const { data } = await axios.post(`/api/product/getOwnProducts`, { business_id: `${business_id}` }, config);
        await localStorage.setItem("product", JSON.stringify(data))
        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data,
        });


    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: message,
        });
    }
};


export const listAllProduct = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_LIST_REQUEST,
        });

        let userinfo = localStorage.getItem("userInfo")
        let str = JSON.parse(userinfo);
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${str.token}`,
            },
        };

        const { data } = await axios.get(`/api/product/getOwnProducts`, config);
        await localStorage.setItem("product", JSON.stringify(data))
        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data,
        });


    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: message,
        });
    }
};

export const listOwnProduct = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_LIST_REQUEST,
        });

        let userinfo = localStorage.getItem("userInfo")
        let str = JSON.parse(userinfo);
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${str.token}`,
            },
        };

        const { data } = await axios.get(`/api/product/getOwnProductByUid`, config);
        await localStorage.setItem("product", JSON.stringify(data))
        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data,
        });


    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: message,
        });
    }
};


export const createProductAction = (name, price, info, photo, business_id) => async (
    dispatch,
    getState
) => {
    try {
        dispatch({
            type: PRODUCT_CREATE_REQUEST,
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
            `/api/product/createproduct`,
            { name, price, info, photo, business_id },
            config
        );

        dispatch({
            type: PRODUCT_CREATE_SUCCESS,
            payload: data,
        });

        // dispatch(listPRODUCT(business_id));
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({
            type: PRODUCT_CREATE_FAIL,
            payload: message,
        });
    }
};

export const deleteProductAction = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_DELETE_REQUEST,
        });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.delete(`/api/product/${id}`, config);

        dispatch({
            type: PRODUCT_DELETE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({
            type: PRODUCT_DELETE_FAIL,
            payload: message,
        });
    }
};

export const updatePoductAction = (name, price, info, photo, business_id, sid) => async (
    dispatch,
    getState
) => {
    try {
        dispatch({
            type: PRODUCT_UPDATE_REQUEST,
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
            `/api/product/${sid}`,
            { name, price, info, photo, business_id },
            config
        );

        dispatch({
            type: PRODUCT_UPDATE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({
            type: PRODUCT_UPDATE_FAIL,
            payload: message,
        });
    }
};


export const updateProductRatingAction = (pid, rating, count) => async (
    dispatch,
) => {
    try {
        dispatch({
            type: PRODUCT_UPDATE_REQUEST,
        });

        const config = {
            headers: {
                "Content-Type": "application/json"
            },
        };

        const { data } = await axios.put(
            `/api/product`,
            { pid, rating, count },
            config
        );

        dispatch({
            type: PRODUCT_UPDATE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({
            type: PRODUCT_UPDATE_FAIL,
            payload: message,
        });
    }
};
