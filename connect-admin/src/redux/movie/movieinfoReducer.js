import { popup } from "./movieType";

const initState = {
  movieinfo:[],
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case popup:
      return {
        loading: false,
        movieinfo: action.payload,
        error: "",
      };
    default:
      return state;
  }
};
export default reducer;
