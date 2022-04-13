const redux = require("redux")
const loggerthunk = require("redux-thunk").default
const axios = require("axios")

const middleware = redux.applyMiddleware
const createStore = redux.createStore

const initState = {
  loading: false,
  error: "",
  user: [],
};

const sendreq = "sendreq";
const getdata = "getdata";
const error_occur = "error";

const apicall = () => {
  return {
    type: sendreq,
  };
};
const apirespond = (user) => {
  return {
    type: getdata,
    payload: user,
  };
};
const apierror = (error) => {
  return {
    type: error_occur,
    payload: error,
  };
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
        user: action.payload,
        error: "",
      };
    case error_occur:
      return {
        loading: false,
        user: [],
        error: action.payload,
      };
  }
};

const fetchuserdata =()=>{
	return function(dispatch){
		dispatch(apicall());
		axios.get("https://jsonplaceholder.typicode.com/users")
		.then(res=>{
			const user=res.data.map(user=>user.id)
			dispatch(apirespond(user))
		})
		.catch(e=>{
			dispatch(apierror(e.message))
		})
	}
}

const store = createStore(reducer,middleware(loggerthunk))
store.subscribe(()=>{
	console.log(store.getState());
})
store.dispatch(fetchuserdata())