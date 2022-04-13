import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useRoutes, Router, Route, Routes } from "react-router-dom";
import { register } from './actions/usersActions';
import Login from "./Login";
import Register from './Register';
import Roues from './Roues';
import Themeroutes from "./routes/Router";
import WithOutThemeRoutes from "./routes/Router";

const App = ({ history }) => {
  const routing = useRoutes(Themeroutes);
  const [redirectValue, setredirectValue] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const toggleLoginMenu = useSelector((state) => state.toggleLoginMenu);
  // const {loginMenuValue} = toggleLoginMenu;

  const toggleRegisterMenu = useSelector((state) => state.toggleRegisterMenu);
  // const {registerMenuValue} = toggleRegisterMenu;

  useEffect(() => {
    if (userInfo) {
      setredirectValue(true);
    }
  }, [userInfo, history]);

  console.log("loginMenuValue", toggleLoginMenu);
  console.log("registerMenuValue", toggleRegisterMenu);

  return (
    <>
        {/* <Routes>
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
        </Routes> */}
        {/* <div className="dark">{routing}</div>  */}
      {
        redirectValue ? <div className="dark">{routing}</div> : toggleLoginMenu ?  <Login /> : toggleRegisterMenu ?  <Register/> : <Login/>
      }
    </>)
};

export default App;
