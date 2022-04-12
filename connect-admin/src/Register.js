import React, { useEffect, useState } from "react";
import { Redirect, useNavigate, useRoutes } from "react-router-dom";
import Themeroutes from "./routes/Router";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { HIDE_REGISTER_MENU, register, SHOW_LOGIN_MENU } from "./actions/usersActions";
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
  Input
} from "reactstrap";

function Register({history}) {
  const routing = useRoutes(Themeroutes);
  const [success, setSuccess] = useState(false);

  const [userName, setuserName] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
      if (userInfo) {
         navigate("/")
      }
  }, [userInfo]);



  const submitHandler = (e) => {
      e.preventDefault();

      if (!name || !userName || !password || !confirmpassword) {
          setMessage("Fill all value");
          setTimeout(() => {
              setMessage("")
          }, 2000);
      } else {
          if (password !== confirmpassword) {
              setMessage("Passwords do not match");
          } else {
              dispatch(register(name, userName, password))
          }
      }
  };

  const showLoginMenu = () => {
    dispatch(HIDE_REGISTER_MENU());
    dispatch(SHOW_LOGIN_MENU())
  }


  return (
    <>
      {/* {success ? <App /> : null} */}
      <Row>
        <Col>
          <Card className="mt-5 offset-3 col-5">
            <CardTitle tag="h6" className="border-bottom p-3 mb-0 text-center">
              Register
            </CardTitle>
            {loading && <Loading />}
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
            <CardBody>
              <Form onSubmit={submitHandler}>

                <FormGroup>
                  <Label for="username">Name</Label>
                  <Input id="username" value={name}
                    placeholder="Enter userName"
                    onChange={(e) => setName(e.target.value)} />
                </FormGroup>

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
                    onChange={(e) => setPassword(e.target.value)}
                    type="password" />
                </FormGroup>

                <FormGroup>
                  <Label for="password">confirm password</Label>
                  <Input id="pwd" value={confirmpassword}
                    placeholder="Password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    type="password" />
                </FormGroup>

                <h6 onClick={() => showLoginMenu()} className="text-end">Already User?</h6>

                <Button
                  className="btn-info border-3 col-12"
                  type="submit"
                >
                  Register
                </Button>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default Register;
