import {
    SERVICES_UPDATE_REQUEST,
    SERVICES_UPDATE_SUCCESS,
    SERVICES_UPDATE_FAIL,
    SERVICES_CREATE_FAIL,
    SERVICES_CREATE_REQUEST,
    SERVICES_CREATE_SUCCESS,
    SERVICES_DELETE_FAIL,
    SERVICES_DELETE_REQUEST,
    SERVICES_DELETE_SUCCESS,
    SERVICES_LIST_FAIL,
    SERVICES_LIST_REQUEST,
    SERVICES_LIST_SUCCESS,
  } from "../constants/servicesContants"
  
  export const serviceListReducer = (state = { services: [] }, action) => {
    switch (action.type) {
      case SERVICES_LIST_REQUEST:
        return { loading: true };
      case SERVICES_LIST_SUCCESS:
        return { loading: false, services: action.payload };
      case SERVICES_LIST_FAIL:
        return { loading: false, error: action.payload };
  
      default:
        return state;
    }
  };
  
  export const serviceCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case SERVICES_CREATE_REQUEST:
        return { loading: true };
      case SERVICES_CREATE_SUCCESS:
        return { loading: false, success: true };
      case SERVICES_CREATE_FAIL:
        return { loading: false, error: action.payload };
  
      default:
        return state;
    }
  };
  
  export const serviceDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case SERVICES_DELETE_REQUEST:
        return { loading: true };
      case SERVICES_DELETE_SUCCESS:
        return { loading: false, success: true };
      case SERVICES_DELETE_FAIL:
        return { loading: false, error: action.payload, success: false };
  
      default:
        return state;
    }
  };
  
  export const serviceUpdateReducer = (state = {}, action) => {
    switch (action.type) {
      case SERVICES_UPDATE_REQUEST:
        return { loading: true };
      case SERVICES_UPDATE_SUCCESS:
        return { loading: false, success: true };
      case SERVICES_UPDATE_FAIL:
        return { loading: false, error: action.payload, success: false };
  
      default:
        return state;
    }
  };
  