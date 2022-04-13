import { combineReducers } from "redux";
import cakeReducer from "./cake/cakeReducer";
import iceReducer from "./ice/iceReducer";
import userReducer from "./user/userReducer";
import colorReducer from "./colorchange/colorReducer"
import movieReducer from "./movie/movieReducer";
import movieinfoReducer from "./movie/movieinfoReducer";

const allrounder = combineReducers({
  cake: cakeReducer,
  ice: iceReducer,
  user: userReducer,
  randomcolor: colorReducer,
  movielist: movieReducer,
  movieinfo: movieinfoReducer,
});

export default allrounder;
