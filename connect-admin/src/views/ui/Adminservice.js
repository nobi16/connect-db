import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteServiceAction, listOwnServices, listServices, updateServiceRatingAction } from "../../actions/servicesActions.js";

import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Button,
  Row,
  Col,
  Table,
  Card,
  CardTitle,
  CardBody,
} from "reactstrap";

import bg1 from "../../assets/images/bg/bg1.jpg";
import "../../css/local.css";
import ErrorMessage from "../../components/ErrorMessage.js";
import Loading from "../../components/Loading.js";

function Adminservice() {

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [bid, setbid] = useState("");
  const [services_ls, setservices_ls] = useState([]);
  const [perPage, setPerPage] = useState(3);
  const [activepage, setActivepage] = useState(1);
  const [pagelength, setPagelength] = useState(0);

  const servicesList = useSelector((state) => state.servicesList);
  const { loading, error, services } = servicesList;
  // const filteredNotes = notes.filter((note) =>
  //   note.title.toLowerCase().includes(search.toLowerCase())
  // );

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const serviceDelete = useSelector((state) => state.serviceDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = serviceDelete;

  const serviceCreate = useSelector((state) => state.serviceCreate);
  const { success: successCreate } = serviceCreate;

  const serviceUpdate = useSelector((state) => state.serviceUpdate);
  const { success: successUpdate } = serviceUpdate;


  useEffect(() => {
    if (location.state) {
      // dispatch(listOwnServices());
      dispatch(listServices(location.state.bid));
    } else {
      dispatch(listOwnServices());
    }

    //  let servicess =  localStorage.getItem("services");
    // servicess = JSON.parse(servicess);
    // setservices_ls(servicess);
    // if (!userInfo) {
    //   history.push("/");
    // }

  }, [
    dispatch,
    // history,
    userInfo,
    successDelete,
    successCreate,
    successUpdate,
  ]);
  
  useEffect(() => {
    if (services) {
      let pcount = Math.ceil(services.length / perPage);
    // console.log(services.length);
    // console.log(services);
    setPagelength(pcount)
    }
    ;
  }, [services])

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteServiceAction(id));
    }
  };


  // const ratingChanged = (rating, bid, b_rating, count) => {
  //   let updateCount = count + 1;
  //   let updateRating = (rating + b_rating) / updateCount;
  //   dispatch(updateServiceRatingAction(bid, updateRating, updateCount))
  // }



  return (
    <Row>
      <Col lg="12">
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <i className="bi bi-card-text me-2"> </i>
            Your Services
            <Link
              to="/addservice"
              className="btn btn-outline-success float-end"
            >
              Add
            </Link>
          </CardTitle>

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
                    if (i < ((activepage * perPage)) && i > (((activepage - 1) * perPage) - 1)) {
                    return (
                      <tr>
                        <th scope="row">{i}</th>
                        <td>{service.name}</td>
                        <td style={{width:"250px"}}>{service.info}</td>
                        <td>{service.price}/-</td>
                        <td style={{width:"100px"}}>minimum {service.duration} mins</td>
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
                            onClick={() => navigate('/updateservice', {state: {sid: service._id}})}
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
                    )}
                  })
                }
              </tbody>
            </Table>
            {Array.apply(null, Array(pagelength)).map(function (data, i) {
              console.log(i)
              return (
                <button
                  className="btn btn-outline-info me-1"
                  onClick={() => {
                    setActivepage(i + 1);
                  }}
                  key={i}
                >
                  {i + 1}
                </button>
              );
            })}
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
}

export default Adminservice;
