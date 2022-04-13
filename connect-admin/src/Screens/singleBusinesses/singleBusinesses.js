import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen";
import axios from "axios";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteBusinessAction, updateBusinessAction } from "../../actions/businesssActions";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";
import ReactMarkdown from "react-markdown";
import { storage } from '../../firebase.js';

function SingleBusinesses({ match, history }) {
    const [name, setname] = useState();
    const [category, setCategory] = useState();
    const [mobile, setmobile] = useState();
    const [photo, setphoto] = useState("");
    const [longitude, setlongitude] = useState("");
    const [latitude, setlatitude] = useState('')
    const [value, setvalue] = useState(false);
    const [url, seturl] = useState("")
    const [id, setid] = useState("");

    const dispatch = useDispatch();

    const businessUpdate = useSelector((state) => state.businessUpdate);
    const { loading, error } = businessUpdate;

    const businessDelete = useSelector((state) => state.businessDelete);
    const { loading: loadingDelete, error: errorDelete } = businessDelete;

    const deleteHandler = (id) => {
        if (window.confirm("Are you sure?")) {
            dispatch(deleteBusinessAction(id));
        }
        history.push("/mynotes");
    };

    useEffect(() => {
    
        const { data } = await axios.get(`http://localhost:5001/api/business/${match.params.id}`);

        console.log(data);
        setid(match.params.id)
        setname(data.name);
        setCategory(data.category);
        setmobile(data.mobile);
        setphoto(data.photo);
        setlongitude(data.longitude);
        setlatitude(data.latitude);
        //   setDate(data.date)

    }, [match.params.id]);

    const resetHandler = () => {
        setname("");
        setCategory("");
        setmobile("");
        setphoto("");
        setlongitude("");
        setlatitude("");
    };

    const updateHandler = async (e) => {
        e.preventDefault();
        if (!name || !mobile || !category || !photo || !longitude || !latitude) {
            alert("fill all value");
            return false;
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
                            seturl(fireBaseUrl)
                            dispatch(updateBusinessAction(id, name, category, mobile, fireBaseUrl, longitude, latitude))
                            setvalue(false)
                            history.push("/mynotes");
                            resetHandler();
                        }).catch((err) => console.log(err))
                })
        }

        resetHandler();
        history.push("/mynotes");
    };

    return (
        <MainScreen name="Create a Note">
            <Card>
                <Card.Header>Edit your Business</Card.Header>
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
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                as="textarea"
                                value={category}
                                placeholder="Enter the category"
                                rows={4}
                                onChange={(e) => setCategory(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="mobile">
                            <Form.Label>mobile</Form.Label>
                            <Form.Control
                                type="number"
                                value={mobile}
                                placeholder="Enter the Mobileno"
                                onChange={(e) => setmobile(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="mobile">
                            <Form.Label>Longitude</Form.Label>
                            <Form.Control
                                type="number"
                                value={longitude}
                                placeholder="Enter the Mobileno"
                                onChange={(e) => setlongitude(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="mobile">
                            <Form.Label>Latitude</Form.Label>
                            <Form.Control
                                type="number"
                                value={latitude}
                                placeholder="Enter the Mobileno"
                                onChange={(e) => setlatitude(e.target.value)}
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
                            Update Note
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

export default SingleBusinesses