import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProductAction, listOwnProduct, listProduct, updatePoductAction, updateProductRatingAction } from "../../actions/productsActions";
import ReactStars from 'react-stars'
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
    Button,
    Row,
    Col,
    Table,
    Card,
    CardTitle,
    CardBody,
    Label,
} from "reactstrap";

import bg1 from "../../assets/images/bg/bg1.jpg";
import "../../css/local.css";
import ErrorMessage from "../../components/ErrorMessage.js";
import Loading from "../../components/Loading.js";
import { listServices } from "../../actions/servicesActions";

function ServiceProduct() {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const [pid, setpid] = useState(true)
    const [toggleItem, setToggleItem] = useState("Services")
    const [data, setdata] = useState();

    const productsList = useSelector((state) => state.productsList);
    const { loading, error, products } = productsList;

    const servicesList = useSelector((state) => state.servicesList);
    const { loading: sloading, error: serror, services } = servicesList;

    // const filteredNotes = notes.filter((note) =>
    //   note.title.toLowerCase().includes(search.toLowerCase())
    // );   

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;


    const productDelete = useSelector((state) => state.productDelete);
    const {
        loading: loadingDelete,
        error: errorDelete,
        success: successDelete,
    } = productDelete;

    const productCreate = useSelector((state) => state.productCreate);
    const { success: successCreate } = productCreate;

    const productUpdate = useSelector((state) => state.productUpdate);
    const { success: successUpdate } = productUpdate;


    useEffect(async () => {
        if (location.state) {
            if (toggleItem === "Services") {
                await dispatch(listServices(location.state.bid));
                await setdata(services);
                console.log(data);
            } else {
                if (toggleItem === "Products") {
                    dispatch(listProduct(location.state.bid));
                    setdata(products);
                    console.log(data);
                }
            }
        }
        setTimeout(() => {
            setpid(!pid)
        }, 4000);
    }, [
        dispatch,
        toggleItem,
        // data,
        userInfo,
        successDelete,
        successCreate,
        successUpdate,
    ]);

    const deleteHandler = (id) => {
        if (window.confirm("Are you sure?")) {
            dispatch(deleteProductAction(id));
        }
    };

    // const pushHistory = (id) => {
    //   history.push({
    //     pathname: '/createproduct',
    //     business_id: id
    //   });
    // };

    // const ratingChanged = (rating, pid, p_rating, count) => {
    //   let updateCount = count + 1;
    //   let updateRating = (rating + p_rating) / updateCount;
    //   dispatch(updateProductRatingAction(pid, updateRating, updateCount))
    // }

    return (
        <Row>
            <Col lg="12">
                <Card>
                    <CardTitle tag="h6" className="border-bottom p-3 mb-0">
                        <i className="bi bi-card-text me-2"> </i>
                        <Label onClick={() => setToggleItem("Services")}>
                            Services
                        </Label>  /
                        <Label onClick={() => setToggleItem("Products")}>
                            Products
                        </Label>
                        <Link
                            to="/addproduct"
                            className="btn btn-outline-success float-end"
                        >
                            Add
                        </Link>
                    </CardTitle>


                    {
                        toggleItem == "Products" ?
                            <CardBody className="vertical-center">
                                {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
                                <Table bordered hover>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Service</th>
                                            <th>Info</th>
                                            <th>Price</th>
                                            <th>Image</th>
                                            {/* <th>Medical</th> */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            products && products.map((service, i) => {
                                                return (
                                                    <tr>
                                                        <th scope="row">1</th>
                                                        <td>{service.name}</td>
                                                        <td>{service.info}</td>
                                                        <td>{service.price}/-</td>
                                                        <td>
                                                            <img
                                                                src={service.photo}
                                                                alt="Business logo"
                                                                className="my-serviceimg"
                                                            />
                                                        </td>
                                                        <td>
                                                            <Button
                                                                className="btn btn-outline-info me-2"
                                                                outline
                                                                onClick={() => navigate('/updateproduct', { state: { pid: service._id } })}
                                                            >
                                                                U
                                                            </Button>
                                                            <Button
                                                                className="btn"
                                                                outline
                                                                color="danger"
                                                                onClick={() => deleteHandler(service._id)}
                                                            >
                                                                D
                                                            </Button>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </Table>
                            </CardBody>
                            :
                            <CardBody className="vertical-center">
                                {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
                                {errorDelete && (
                                    <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
                                )}
                                {loadingDelete && <Loading />}
                                <Table bordered hover>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Service</th>
                                            <th>Info</th>
                                            <th>Price</th>
                                            <th>Duration</th>
                                            <th>Image</th>
                                            {/* <th>Medical</th> */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            services && services.map((service, i) => {
                                                return (
                                                    <tr>
                                                        <th scope="row">1</th>
                                                        <td>{service.name}</td>
                                                        <td>{service.info}</td>
                                                        <td>{service.price}/-</td>
                                                        <td>minimum {service.duration} mins</td>
                                                        <td>
                                                            <img
                                                                src={service.photo}
                                                                alt="Business logo"
                                                                className="my-serviceimg"
                                                            />
                                                        </td>
                                                        <td>
                                                            <Button
                                                                className="btn btn-outline-info me-2"
                                                                outline
                                                                onClick={() => navigate('/updateservice', { state: { sid: service._id } })}
                                                            >
                                                                U
                                                            </Button>
                                                            <Button
                                                                className="btn"
                                                                outline
                                                                color="danger"
                                                                onClick={() => deleteHandler(service._id)}
                                                            >
                                                                D
                                                            </Button>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </Table>
                            </CardBody>
                    }


                </Card>
            </Col>
        </Row>
    );
}

export default ServiceProduct;
