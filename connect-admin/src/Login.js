import React, { useEffect, useState } from "react";
import { Redirect, useNavigate, useRoutes } from "react-router-dom";
// import Themeroutes from "./routes/Router";
import { useDispatch, useSelector } from 'react-redux';
import { HIDE_LOGIN_MENU, login, SHOW_LOGIN_MENU, SHOW_REGISTER_MENU } from './actions/usersActions.js';
import Loading from "./components/Loading.js";
import ErrorMessage from "./components/ErrorMessage.js";

import {
  Button,
  Row,
  Col,
  Card,
  CardTitle,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";


function Login() {
  // const routing = useRoutes(Themeroutes);
  const [success, setSuccess] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userName, setuserName] = useState('');
  const [password, setpassword] = useState('');
  const [message, setMessage] = useState(null);


  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;


  const submitHandler = (e) => {
    e.preventDefault();
    if (!userName || !password) {
      setMessage("Provide each value");
      setTimeout(() => {
        setMessage(null)
      }, 2000);
    } else {
      dispatch(login(userName, password));
      setTimeout(() => {
        setMessage(null);

      }, 2000);
    }
  }

  const showRegisterMenu = () => {
    dispatch(HIDE_LOGIN_MENU());
    dispatch(SHOW_REGISTER_MENU());
  }

  return (
    <>
      <Row>
        <Col>
          <Card className="mt-5 offset-3 col-5">
            <CardTitle tag="h6" className="border-bottom p-3 mb-0 text-center">
              Login
            </CardTitle>
            {loading && <Loading />}
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
            <CardBody>
              <Form onSubmit={submitHandler}>

                <FormGroup>
                  <Label for="username">Username</Label>
                  <Input id="username" value={userName}
                    placeholder="Enter userName"
                    onChange={(e) => setuserName(e.target.value)} />
                </FormGroup>

                <FormGroup>
                  <Label for="password">Password</Label>
                  <Input id="pwd" value={password}
                    placeholder="Password"
                    onChange={(e) => setpassword(e.target.value)}
                    type="password" />
                </FormGroup>

                <h6 className="text-end" onClick={() => showRegisterMenu()}>Not User,Register Now ?</h6>

                <Button
                  className="btn-info border-3 col-12"
                  type="submit"
                >
                  Login
                </Button>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default Login;
