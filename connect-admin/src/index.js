import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "./assets/scss/style.scss";
import App from "./App";
import { HashRouter } from "react-router-dom";
import Loader from "./layouts/loader/Loader";
import store from "./Store.js";
import { Provider } from "react-redux";

ReactDOM.render(
  <>
<Suspense fallback={<Loader />}>
    <HashRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </HashRouter>
  </Suspense>
  </>,
  

  document.getElementById("root")
);
