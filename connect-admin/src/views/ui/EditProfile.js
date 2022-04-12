import React, { useEffect, useState } from "react";
import { Redirect, useNavigate, useRoutes } from "react-router-dom";
import Themeroutes from "../../routes/Router";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from "../../actions/usersActions";
import Loading from "../../components/Loading.js";
import ErrorMessage from "../../components/ErrorMessage.js";

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

function EditProfile({ history }) {
    const routing = useRoutes(Themeroutes);

    const [userName, setuserName] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("")
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const userUpdate = useSelector((state) => state.userUpdate);
    const { loading, error, success } = userUpdate;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        let localsUser = localStorage.getItem("userInfo");
        let user2 = JSON.parse(localsUser)
        console.log(user2);
        if (!user2) {
            history.push("/");
        } else {
            setName(user2.user.name);
            setuserName(user2.user.userName);
            setPassword(user2.user.password);
            setConfirmPassword(user2.user.password)

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
                setTimeout(() => {
                    setMessage("")
                }, 2000);
            } else {
                dispatch(updateProfile({ name, userName, password }));
                // navigate("/")
            }
        }
    };


    const resetHadler = () => {
        setuserName("");
        setName("");
        setPassword("");
        setConfirmPassword("");
    }

    return (
        <>
            {/* {success ? <App /> : null} */}
            <Row>
                <Col>
                    <Card className="mt-5 offset-3 col-5">
                        <CardTitle tag="h6" className="border-bottom p-3 mb-0 text-center">
                            Edit Your Profile
                        </CardTitle>
                        {loading && <Loading />}
                        {success && (
                            <ErrorMessage variant="success">
                                Updated Successfully
                            </ErrorMessage>
                        )}
                        {message && (
                            <ErrorMessage variant="danger">
                                {message}
                            </ErrorMessage>
                        )}
                        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
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

                                <Button
                                    className="btn-info border-3 col-12"
                                    type="submit"
                                >
                                    Update Profile
                                </Button>
                            </Form>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </>
    );
}

export default EditProfile;
