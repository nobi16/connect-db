import { sendreq, getdata, error_occur, popup } from "./movieType";

const initState = {
  loading: false,
  error: "",
  movies: [],
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case sendreq:
      return {
        ...state,
        loading: true,
      };
    case getdata:
      return {
        loading: false,
        movies: action.payload,
        error: "",
      };
    case error_occur:
      return {
        loading: false,
        movies: [],
        error: action.payload,
      };
    // case popup:
    //   return {
    //     loading: false,
    //     movieinfo: action.payload,
    //     error: "",
    //   };
    default:
      return state;
  }
};
export default reducer;
