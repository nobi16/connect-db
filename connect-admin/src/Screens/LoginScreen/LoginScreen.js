import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Col, Row, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading.js";
import ErrorMessage from "../../components/ErrorMessage.js";
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../actions/usersActions.js';


function LoginScreen() {
    const history = useHistory()
    const dispatch = useDispatch()
    const [userName, setuserName] = useState('');
    const [password, setpassword] = useState('');

    const userLogin = useSelector((state) => state.userLogin);
    const { loading, error, userInfo } = userLogin;

    useEffect(() => {
        if (userInfo) {
            history.push('/mynotes')
        }
    }, [history, userInfo])


    const submitHandler = (e) => {
        e.preventDefault();
        console.log(userName, password);
        dispatch(login(userName, password))
    }

    return (
        <div className="loginContainer">
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            {loading && <Loading />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>userName</Form.Label>
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
                        onChange={(e) => setpassword(e.target.value)}
                    />
                </Form.Group>
                <Row className="py-3">
                    <Col>
                        New Customer ? <Link to="/register">Register Here</Link>
                    </Col>
                </Row>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>

        </div>
    )
}

export default LoginScreen