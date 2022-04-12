import axios from "axios";
import { sendreq, getdata, error_occur } from "./movieType";

export const movieapicall = () => {
  return {
    type: sendreq,
  };
};
const movieapirespond = (movie) => {
  return {
    type: getdata,
    payload: movie,
  };
};
const movieapierror = (error) => {
  return {
    type: error_occur,
    payload: error,
  };
};

export const fetchmovies = (searchValue) => {
    let url="https://api.themoviedb.org/3/search/movie?api_key=0afe62fed02732f087073fdd43fa0b13&query=fast"
    
    if(!!searchValue && searchValue !=="")
        url= `https://api.themoviedb.org/3/search/movie?api_key=0afe62fed02732f087073fdd43fa0b13&query=${searchValue}`
  return (dispatch) => {
    dispatch(movieapicall());
    axios
      .get(url)
      .then((res) => {
        const movie = res.data.results;
        dispatch(movieapirespond(movie));
      })
      .catch((e) => {
        const errormsg = e.message
        dispatch(movieapierror(errormsg));
      });
  };
};