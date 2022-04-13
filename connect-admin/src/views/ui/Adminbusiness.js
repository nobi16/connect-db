import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
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
import { deleteBusinessAction, listBusiness, updateBusinessRatingAction } from "../../actions/businesssActions";

import bg1 from "../../assets/images/bg/bg1.jpg";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";
import "../../css/local.css";

function Adminbusiness() {
  const [perPage, setPerPage] = useState(3);
  const [activepage, setActivepage] = useState(1);
  const [pagelength, setPagelength] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const businessList = useSelector((state) => state.businessList);
  const { loading, error, businesses } = businessList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  console.log(businesses);
  const businessDelete = useSelector((state) => state.businessDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = businessDelete;

  const businessCreate = useSelector((state) => state.businessCreate);
  const { success: successCreate } = businessCreate;

  const businessUpdate = useSelector((state) => state.businessUpdate);
  const { success: successUpdate } = businessUpdate;

  useEffect(() => {
    dispatch(listBusiness())

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
    if (businesses) {
      let pcount = Math.ceil(businesses.length / perPage);
    // console.log(businesses.length);
    // console.log(businesses);
    setPagelength(pcount)
    }
    ;
  }, [businesses])


  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteBusinessAction(id));
    }
  };

  // const pushHistoryToService = (id) => {
  //   history.push({
  //     pathname: '/services',
  //     business_id: id
  //   })
  //   localStorage.setItem("buid", id)
  // }

  // const pushHistoryToProducts = (id) => {
  //   history.push({
  //     pathname: '/products',
  //     business_id: id
  //   })
  //   localStorage.setItem("buid", id)
  // }

  // const ratingChanged = (rating, b_rating, bid, count) => {
  //   let updateCount = count + 1;
  //   let updateRating = (rating + b_rating) / updateCount;
  //   // setRating(rating);
  //   dispatch(updateBusinessRatingAction(updateRating, bid, updateCount))
  // }



  return (
    <Row>
      <Col lg="12">
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <i className="bi bi-card-text me-2"> </i>
            Your Businesses
            <Link
              to="/addbusiness"
              className="btn btn-outline-success float-end"
            >
              <span>Add</span>
            </Link>
          </CardTitle>
          {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
          {errorDelete && (
            <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
          )}
          {loading && <Loading />}.
          {loadingDelete && <Loading />}
          <CardBody className="">
            <Table bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Business</th>
                  <th>Category</th>
                  <th>Phone number</th>
                  <th>Logo</th>
                </tr>
              </thead>
              <tbody>
                {
                  businesses && businesses.map((business, i) => {
                    if (i < ((activepage * perPage)) && i > (((activepage - 1) * perPage) - 1)) {
                      return (
                        <tr>
                          <th scope="row">{i}</th>
                          <td onClick={() => navigate('/serviceandproduct', { state: { bid: business._id } })}>
                            {business.name}
                          </td>
                          <td onClick={() => navigate('/adminproduct', { state: { bid: business._id } })}>{business.category}</td>
                          <td>{business.mobile}</td>
                          <td>
                            <img
                              src={`${business.photo}`}
                              alt="Business logo"
                              className="my-businessimg"
                            />
                          </td>
                          <td>
                            <Button
                              className="btn btn-outline-info me-2"
                              outline
                              onClick={() => navigate('/updatebusiness', { state: { bid: business._id } })}
                            >
                              U
                            </Button>
                            <Button
                              className="btn"
                              outline
                              color="danger"
                              onClick={() => deleteHandler(business._id)}
                            >
                              D
                            </Button>
                          </td>
                        </tr>
                      )
                    }
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

export default Adminbusiness;
