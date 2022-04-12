import React, { useEffect, useState } from "react";
import { Accordion, Badge, Button, Card } from "react-bootstrap";
import MainScreen from "../../components/MainScreen.js";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { Buffer } from 'buffer';
import { useDispatch, useSelector } from "react-redux";
import { deleteBusinessAction, listBusiness, updateBusinessRatingAction } from "../../actions/businesssActions.js";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import ReactStars from 'react-stars'
function MyBusinesses({ history, search }) {
  const dispatch = useDispatch();
  const businessList = useSelector((state) => state.businessList);
  const { loading, error, businesses } = businessList;
  // const filteredNotes = notes.filter((note) =>
  //   note.title.toLowerCase().includes(search.toLowerCase())
  // );

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
    dispatch(listBusiness());
    if (!userInfo) {
      history.push("/");
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    successUpdate,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteBusinessAction(id));
    }
  };

  const pushHistoryToService = (id) => {
    history.push({
      pathname: '/services',
      business_id: id
    })
    localStorage.setItem("buid", id)
  }

  const pushHistoryToProducts = (id) => {
    history.push({
      pathname: '/products',
      business_id: id
    })
    localStorage.setItem("buid", id)
  }

  const ratingChanged = (rating, b_rating, bid, count) => {
    let updateCount = count + 1;
    let updateRating = (rating + b_rating) / updateCount;
    // setRating(rating);
    dispatch(updateBusinessRatingAction(updateRating, bid, updateCount))
  }


  return (
    <MainScreen title={`Welcome Back ${userInfo && userInfo.user.name}..`}>
      <Link to="/createbusiness">
        <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
          Create new business
        </Button>
      </Link>
      <br />
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {errorDelete && (
        <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
      )}
      {loading && <Loading />}.
      {loadingDelete && <Loading />}
      <div style={{ display: "flex", justifyContent: "space-between" }}>

        {
          businesses && businesses.map((business) => {
            console.log(business)
            return (
              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={`${business.photo}`} />
                <Card.Body>
                  <Card.Title>{business.name}</Card.Title>
                  <Button onClick={() => history.push(`/business/${business._id}`)}>Edit</Button>
                  <Card.Text>
                    Category: {business.category}
                  </Card.Text>
                  <Button onClick={() => pushHistoryToService(business._id)} variant="primary">see services</Button>
                  <Button onClick={() => pushHistoryToProducts(business._id)} variant="primary">see Products</Button>
              <button onClick={() => deleteHandler(business._id)}>Delete</button>
                </Card.Body>
                <ReactStars
                  count={5}
                  value={business.rating}
                  onChange={(e) => ratingChanged(e, business.rating, business._id, business.count)}
                  size={24}
                  color2={'#ffd700'} />
                  ({business.count})

              </Card>
            )
          })
        }
      </div>
    </MainScreen>
  );
}

export default MyBusinesses;
