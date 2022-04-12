import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen";
import axios from "axios";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteProductAction, updatePoductAction } from "../../actions/productsActions";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";
import { storage } from '../../firebase.js';

function SingleProduct({ match, history }) {
    const [name, setname] = useState();
    const [price, setprice] = useState();
    const [info, setinfo] = useState();
    const [photo, setphoto] = useState("");
    const [bid, setbid] = useState("");
    const [pid, setpid] = useState("")
    const [value, setvalue] = useState(false);
    const [url, seturl] = useState("")
    const dispatch = useDispatch();

    const productUpdate = useSelector((state) => state.productUpdate);
    const { loading, error } = productUpdate;

    const productDelete = useSelector((state) => state.productDelete);
    const { loading: loadingDelete, error: errorDelete } = productDelete;

    const deleteHandler = (id) => {
        if (window.confirm("Are you sure?")) {
            dispatch(deleteProductAction(id));
        }
        history.push("/products");
    };

    useEffect(() => {
        let buid = localStorage.getItem("buid");
        setbid(buid);
        setpid(match.params.id)
        const fetching = async () => {
            const { data } = await axios.get(`http://localhost:5001/api/product/${match.params.id}`);
            setname(data.name);
            setprice(data.price);
            setinfo(data.info);
            setphoto(data.photo);
        };

        fetching();
    }, [match.params.id]);

    const resetHandler = () => {
        setname("");
        setprice("");
        setinfo("");
        setphoto("");
    };

    const updateHandler = async (e) => {
        e.preventDefault();
        if (!name || !price || !info || !photo) {
            alert("fill all value");
            return false;
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
                            dispatch(updatePoductAction(name, price, info, fireBaseUrl, bid, pid))
                            setvalue(false)
                            history.push("/products");
                            resetHandler();
                        }).catch((err) => console.log(err))
                })
        }

        resetHandler();
        history.push("/products");
    };

    return (
        <MainScreen name="Create a Note">
            <Card>
                <Card.Header>Edit your Product</Card.Header>
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
                            Update Product
                        </Button>
                        <Button
                            className="mx-2"
                            variant="danger"
                            onClick={() => deleteHandler(match.params.id)}
                        >
                            Delete Products
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

export default SingleProduct