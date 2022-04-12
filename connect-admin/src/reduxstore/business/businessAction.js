import axios from "axios";
import { sendreq, getdata, error_occur } from "./businessType";

export const businessapicall = () => {
  return {
    type: sendreq,
  };
};
const businessapirespond = (business) => {
  return {
    type: getdata,
    payload: business,
  };
};
const businessapierror = (error) => {
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
    dispatch(businessapicall());
    axios
      .get(url)
      .then((res) => {
        const business = res.data.results;
        dispatch(businessapirespond(business));
      })
      .catch((e) => {
        const errormsg = e.message
        dispatch(businessapierror(errormsg));
      });
  };
};