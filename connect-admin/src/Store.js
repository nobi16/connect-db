import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension'
import { userLoginReducer, userRegisterReducer, userUpdateReducer } from "./reducers/userReducer.js";
import { businessCreateReducer, businessDeleteReducer, businessListReducer, businessUpdateReducer } from "./reducers/businessReducers.js";
import { serviceCreateReducer, serviceDeleteReducer, serviceListReducer, serviceUpdateReducer } from "./reducers/serviceReducer.js";
import { productCreateReducer, productDeleteReducer, productListReducer, productUpdateReducer } from "./reducers/productReducers.js";

const reducer = combineReducers({
    // user Reducers
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userUpdate: userUpdateReducer,
    // business reducers
    businessList: businessListReducer,
    businessCreate: businessCreateReducer,
    businessUpdate: businessUpdateReducer,
    businessDelete: businessDeleteReducer,
    // service reducers
    servicesList : serviceListReducer,
    serviceCreate: serviceCreateReducer,
    serviceDelete: serviceDeleteReducer,
    serviceUpdate: serviceUpdateReducer,
    // product reducer
    productsList : productListReducer,
    productCreate: productCreateReducer,
    productDelete: productDeleteReducer,
    productUpdate: productUpdateReducer

});

const userInfoFromStorage = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null;
const initialState = {
    userLogin: { userInfo: userInfoFromStorage },
};
const middlewaare = [thunk];

const store = createStore(
    reducer, initialState, composeWithDevTools(applyMiddleware(...middlewaare))
);

export default store;