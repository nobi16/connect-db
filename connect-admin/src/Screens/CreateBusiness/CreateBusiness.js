import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import { createBusinessAction } from "../../actions/businesssActions";
import { storage } from '../../firebase.js';

function CreateNote({ history }) {
    const [value, setvalue] = useState(false)
    const [values, setValues] = useState({
        name: "",
        mobile: "",
        category: "",
        photo: "",
        longitude: "",
        latitude: ""

    });
    const { name, mobile, category, photo, longitude, latitude } = values;

    const dispatch = useDispatch();

    const businessCreate = useSelector((state) => state.businessCreate);
    const { error } = businessCreate;



    useEffect(() => {
        setValues({ ...values })
    }, []);

    const resetHandler = () => {
        setValues({ ...values, name: "" });
        setValues({ ...values, category: "" });
        setValues({ ...values, mobile: "" });
        setValues({ ...values, photo: "" });
        setValues({ ...values, longitude: "" });
        setValues({ ...values, latitude: "" });
    };

    const submitHandler = (e) => {
        e.preventDefault();
        if (!name || !mobile || !category || !photo || !longitude || !latitude) {
            alert("fill all value")
        } else {

            const uploadTask = storage.ref(`/images/${photo.name}`).put(photo);
            setvalue(true)
            uploadTask.on('state_changed',
                (snapShot) => {
                    //takes a snap shot of the process as it is happening
                    console.log(snapShot)
                }, (err) => {
                    //catches the errors
                    console.log(err)
                }, () => {
                    storage.ref('images').child(photo.name).getDownloadURL()
                        .then(fireBaseUrl => {
                            dispatch(createBusinessAction(name, category, mobile, fireBaseUrl, longitude, latitude))
                           setvalue(false)
                            history.push("/mynotes");
                            resetHandler();
                        }).catch((err) => console.log(err))
                })

        }

    };


    return (
        <MainScreen name="Create a Note">
            <Card>
                <Card.Header>Create a new Business</Card.Header>
                <Card.Body>
                    <Form onSubmit={submitHandler}>
                        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
                        <Form.Group controlId="name">
                            <Form.Label>name</Form.Label>
                            <Form.Control
                                type="name"
                                value={name}
                                placeholder="Enter the name"
                                onChange={(e) => setValues({ ...values, name: e.target.value })}
                            />
                        </Form.Group>

                        <Form.Group controlId="mobile">
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                as="textarea"
                                value={category}
                                placeholder="Enter the category"
                                rows={4}
                                onChange={(e) => setValues({ ...values, category: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="mobile">
                            <Form.Label>mobile</Form.Label>
                            <Form.Control
                                type="number"
                                value={mobile}
                                placeholder="Enter the Mobileno"
                                onChange={(e) => setValues({ ...values, mobile: e.target.value })}
                            />
                        </Form.Group>

                        <Form.Group controlId="mobile">
                            <Form.Label>Longitude</Form.Label>
                            <Form.Control
                                type="number"
                                value={longitude}
                                placeholder="Enter the Mobileno"
                                onChange={(e) => setValues({ ...values, longitude: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="mobile">
                            <Form.Label>Latitude</Form.Label>
                            <Form.Control
                                type="number"
                                value={latitude}
                                placeholder="Enter the Mobileno"
                                onChange={(e) => setValues({ ...values, latitude: e.target.value })}
                            />
                        </Form.Group>

                        <br />
                        <Form.Group controlId="mobile">
                            <Form.Label>Pic</Form.Label>
                            <input
                                onChange={(e) => setValues({ ...values, photo: e.target.files[0] })}
                                type="file"
                                name="photo"
                                accept="image"
                                placeholder="choose a file"
                            />
                        </Form.Group>
                        {value && <Loading size={50} />}
                        <Button type="submit" variant="primary">
                            Create Business
                        </Button>
                        <Button className="mx-2" onClick={resetHandler} variant="danger">
                            Reset Feilds
                        </Button>
                    </Form>
                </Card.Body>

                <Card.Footer className="text-muted">
                    Creating on - {new Date().toLocaleDateString()}
                </Card.Footer>
            </Card>
        </MainScreen>
    );
}

export default CreateNote;
