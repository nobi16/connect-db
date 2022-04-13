const redux = require("redux")
const logger = require("redux-logger")

const middleware = redux.applyMiddleware
const createStore = redux.createStore
const mixreducer = redux.combineReducers
const log = logger.createLogger 
const buycake = "buying cake";
const buyice = "buying ice";
// console.log(buy);
function buyingCake() {
  return {
    type: buycake,
    info: "buying cake",
  };
}
function buyingIce() {
  return {
    type: buyice,
    info: "buying ice",
  };
}

// (prevstate, action) => newstate     what reducer work

const cakeinitstate = {
  total_cakes: 10
};
const iceinitstate = {
  total_ice: 15
};

const cakereducer = (state = cakeinitstate, action) => {
  switch (action.type) {
    case buycake:
      return {
        ...state,
        total_cakes: state.total_cakes - 1,
      };
    default:
      return state;
  }
};
const icereducer = (state = iceinitstate, action) => {
  switch (action.type) {
    case buyice:
      return {
        ...state,
        total_ice: state.total_ice - 1,
      };
    default:
      return state;
  }
};
const allrounder = mixreducer({
  cake: cakereducer,
  ice: icereducer
})

// const store = createStore(allrounder, applyMiddleware(log))

// const store = createStore(allrounder)
console.log("init state", store.getState());
const unsub = store.subscribe(()=> console.log("updated store",store.getState()))
store.dispatch(buyingCake())
store.dispatch(buyingCake())
store.dispatch(buyingCake())
store.dispatch(buyingIce())
store.dispatch(buyingIce())
unsub()