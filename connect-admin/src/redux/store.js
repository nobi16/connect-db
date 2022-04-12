import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";
import multipleReducer from "./multipleReducer";

const store = createStore(
  multipleReducer,
  composeWithDevTools(applyMiddleware(logger, thunk))
);

export default store;
