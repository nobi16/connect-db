import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import { createProductAction } from "../../actions/productsActions";
import { storage } from '../../firebase.js';

function CreateProduct({ history, location }) {
    const [value, setvalue] = useState(false);
    const [pid, setpid] = useState("")
    const [values, setValues] = useState({
        name: "",
        price: "",
        info: "",
        photo: ""

    });
    const { name, price, info, photo } = values;

    const dispatch = useDispatch();

    const productCreate = useSelector((state) => state.productCreate);
    const { error } = productCreate;



    useEffect(() => {
        setValues({ ...values });
        let localStorageBid = localStorage.getItem("buid");
        setpid(localStorageBid)
    }, []);

    const resetHandler = () => {
        setValues({ ...values, name: "" });
        setValues({ ...values, price: "" });
        setValues({ ...values, info: "" });
        setValues({ ...values, photo: "" });
    };

    const submitHandler = (e) => {
        e.preventDefault();
        if (!name || !price || !info || !photo) {
            alert("fill all value")
        } else {

            const uploadTask = storage.ref(`/productsimages/${photo.name}`).put(photo);
            setvalue(true)
            uploadTask.on('state_changed',
                (snapShot) => {
                    //takes a snap shot of the process as it is happening
                    console.log(snapShot)
                }, (err) => {
                    //catches the errors
                    console.log(err)
                }, () => {
                    storage.ref('productsimages').child(photo.name).getDownloadURL()
                        .then(fireBaseUrl => {
                            dispatch(createProductAction(name, price, info, fireBaseUrl, pid))
                            setvalue(false)
                            history.push("/products");
                            resetHandler();
                        }).catch((err) => console.log(err))
                })

        }

    };


    return (
        <MainScreen name="Create a Note">
            <Card>
                <Card.Header>Create a new Product</Card.Header>
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
                            <Form.Label>price</Form.Label>
                            <Form.Control
                                type="Number"
                                value={price}
                                placeholder="Enter the price"
                                onChange={(e) => setValues({ ...values, price: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="mobile">
                            <Form.Label>info</Form.Label>
                            <Form.Control
                                type="text"
                                value={info}
                                placeholder="Enter the info"
                                onChange={(e) => setValues({ ...values, info: e.target.value })}
                            />
                        </Form.Group>

                        {/* <Form.Group controlId="mobile">
                            <Form.Label>Latitude</Form.Label>
                            <Form.Control
                                type="number"
                                value={latitude}
                                placeholder="Enter the Mobileno"
                                onChange={(e) => setValues({ ...values, latitude: e.target.value })}
                            />
                        </Form.Group> */}

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
                            Create Product
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


export default CreateProduct