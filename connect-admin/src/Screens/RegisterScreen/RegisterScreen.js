import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading";
import { register } from "../../actions/usersActions";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "../../components/ErrorMessage";
import "./RegisterScreen.css";

function RegisterScreen({ history }) {
    const [userName, setuserName] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState(null);

    const userRegister = useSelector((state) => state.userRegister);
    const { loading, error, userInfo } = userRegister;

    const dispatch = useDispatch();

    useEffect(() => {
        if (userInfo) {
            history.push("/");
        }
    }, [history, userInfo]);



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

    return (
        <div className="loginContainer">

            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
            {loading && <Loading />}

            <Form onSubmit={submitHandler}>
                <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="name"
                        value={name}
                        placeholder="Enter name"
                        onChange={(e) => setName(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formBasicuserName">
                    <Form.Label>userName </Form.Label>
                    <Form.Control
                        type="userName"
                        value={userName}
                        placeholder="Enter userName"
                        onChange={(e) => setuserName(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="confirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={confirmpassword}
                        placeholder="Confirm Password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </Form.Group>

                <Button variant="primary" type="submit" style={{ marginTop: '15px' }}>
                    Register
                </Button>
            </Form>

            <Row className="py-3">
                <Col>
                    Have an Account ? <Link to="/login">Login</Link>
                </Col>
            </Row>

        </div>
    );
}

export default RegisterScreen;
