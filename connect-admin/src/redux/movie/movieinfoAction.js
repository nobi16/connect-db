import axios from "axios";
import { popup } from "./movieType";


const getMovieDetail = (movies) => {
  return {
    type: popup,
    payload: movies,
  };
};


export const getMovieInfo = (movie)=>{
  return(dispatch)=>{
    dispatch(getMovieDetail(movie))
  }
}
