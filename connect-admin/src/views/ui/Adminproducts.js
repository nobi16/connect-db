import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProductAction, listOwnProduct, listProduct, updatePoductAction, updateProductRatingAction } from "../../actions/productsActions";

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

function AdminProducts() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [pid, setpid] = useState("")
  const [services_ls, setservices_ls] = useState([])
  const [perPage, setPerPage] = useState(3);
  const [activepage, setActivepage] = useState(1);
  const [pagelength, setPagelength] = useState(0);


  const productsList = useSelector((state) => state.productsList);
  const { loading, error, products } = productsList;
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


  useEffect(() => {
    if (location.state) {
      // dispatch(listOwnServices());
      dispatch(listProduct(location.state.bid));
    } else {
      dispatch(listOwnProduct());
    }
    //  let servicess =  localStorage.getItem("services");
    // servicess = JSON.parse(servicess);
    // setservices_ls(servicess);
    //   if (!userInfo) {
    //     history.push("/");
    //   }

  }, [
    dispatch,
    //   history,
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
  
  useEffect(() => {
    if (products) {
      let pcount = Math.ceil(products.length / perPage);
    // console.log(products.length);
    // console.log(products);
    setPagelength(pcount)
    }
    ;
  }, [products])

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
            Your Product
            <Link
              to="/addproduct"
              className="btn btn-outline-success float-end"
            >
              Add
            </Link>
          </CardTitle>

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
                    if (i < ((activepage * perPage)) && i > (((activepage - 1) * perPage) - 1)) {
                    return (
                      <tr>
                        <th scope="row">{i}</th>
                        <td>{service.name}</td>
                        <td style={{width:"300px"}}>{service.info}</td>
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

export default AdminProducts;
