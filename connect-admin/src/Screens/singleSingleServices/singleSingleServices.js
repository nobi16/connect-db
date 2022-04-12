import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen";
import axios from "axios";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteServiceAction, updateServiceAction } from "../../actions/servicesActions";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";
import { storage } from '../../firebase.js';

function SingleService({ match, history }) {
    const [name, setname] = useState();
    const [price, setprice] = useState();
    const [info, setinfo] = useState();
    const [duration, setduration] = useState("");
    const [photo, setphoto] = useState("");
    const [bid, setbid] = useState("");
    const [sid, setsid] = useState("")
    const [value, setvalue] = useState(false);
    const [url, seturl] = useState("")
    const dispatch = useDispatch();

    const serviceUpdate = useSelector((state) => state.serviceUpdate);
    const { loading, error } = serviceUpdate;

    const serviceDelete = useSelector((state) => state.serviceDelete);
    const { loading: loadingDelete, error: errorDelete } = serviceDelete;

    const deleteHandler = (id) => {
        if (window.confirm("Are you sure?")) {
            dispatch(deleteServiceAction(id));
        }
        history.push("/services");
    };

    useEffect(() => {
        let buid = localStorage.getItem("buid");
        setbid(buid);
        setsid(match.params.id)
        const fetching = async () => {
            const { data } = await axios.get(`http://localhost:5001/api/service/${match.params.id}`);
            setname(data.name);
            setprice(data.price);
            setinfo(data.info);
            setduration(data.duration)
            setphoto(data.photo);
        };

        fetching();
    }, [match.params.id]);

    const resetHandler = () => {
        setname("");
        setprice("");
        setduration("");
        setinfo("");
        setphoto("");
    };

    const updateHandler = async (e) => {
        e.preventDefault();
        if (!name || !price || !info || !duration || !photo) {
            alert("fill all value");
            return false;
        } else {
            const uploadTask = storage.ref(`/servicesimages/${photo.name}`).put(photo);
            setvalue(true)
            uploadTask.on('state_changed',
                (snapShot) => {
                    //takes a snap shot of the process as it is happening
                    console.log(snapShot)
                }, (err) => {
                    //catches the errors
                    console.log(err)
                }, () => {
                    storage.ref('servicesimages').child(photo.name).getDownloadURL()
                        .then(fireBaseUrl => {
                            dispatch(updateServiceAction(name, price, info, duration, fireBaseUrl, bid, sid))
                            setvalue(false)
                            history.push("/services");
                            resetHandler();
                        }).catch((err) => console.log(err))
                })
        }

        resetHandler();
        history.push("/services");
    };

    return (
        <MainScreen name="Create a Note">
            <Card>
                <Card.Header>Edit your Service</Card.Header>
                <Card.Body>
                    <Form onSubmit={updateHandler}>
                        {value && <Loading />}
                        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
                        {errorDelete && (
                            <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
                        )}
                        <Form.Group controlId="name">
                            <Form.Label>name</Form.Label>
                            <Form.Control
                                type="name"
                                value={name}
                                placeholder="Enter the name"
                                onChange={(e) => setname(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="mobile">
                            <Form.Label>price</Form.Label>
                            <Form.Control
                                type="Number"
                                value={price}
                                placeholder="Enter the price"
                                onChange={(e) => setprice(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="mobile">
                            <Form.Label>info</Form.Label>
                            <Form.Control
                                type="text"
                                value={info}
                                placeholder="Enter the info"
                                onChange={(e) => setinfo(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="mobile">
                            <Form.Label>duration</Form.Label>
                            <Form.Control
                                type="number"
                                value={duration}
                                placeholder="Enter the duration"
                                onChange={(e) => setduration(e.target.value)}
                            />
                        </Form.Group>

                       <br />
                       <img src={`${photo || url}`} />

                        <Form.Group controlId="mobile">
                            <Form.Label>Pic</Form.Label>
                            <input
                                onChange={(e) => setphoto(e.target.files[0])}
                                type="file"
                                name="photo"
                                accept="image"
                                placeholder="choose a file"
                            />
                        </Form.Group>

                        {loading && <Loading size={50} />}
                        <Button variant="primary" type="submit">
                            Update Service
                        </Button>
                        <Button
                            className="mx-2"
                            variant="danger"
                            onClick={() => deleteHandler(match.params.id)}
                        >
                            Delete Note
                        </Button>
                    </Form>
                </Card.Body>

                <Card.Footer className="text-muted">
                    Creating on - {new Date().toLocaleDateString()}
                </Card.Footer>
            </Card>
        </MainScreen>


    )
}

export default SingleService