import React, { useEffect, useState } from "react";
import { Accordion, Badge, Button, Card } from "react-bootstrap";
import MainScreen from "../../components/MainScreen.js";
import ReactStars from 'react-stars'
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import { deleteServiceAction, listServices, updateServiceRatingAction } from "../../actions/servicesActions.js";

function MyServices({ history, location }) {
  const dispatch = useDispatch();
  const [bid, setbid] = useState("")
  const [services_ls, setservices_ls] = useState([])

  const servicesList = useSelector((state) => state.servicesList);
  const { loading, error, services } = servicesList;
  // const filteredNotes = notes.filter((note) =>
  //   note.title.toLowerCase().includes(search.toLowerCase())
  // );

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  console.log(services);
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
    let localStorageBid = localStorage.getItem("buid");
    setbid(localStorageBid)
    dispatch(listServices(localStorageBid));
    //  let servicess =  localStorage.getItem("services");
    // servicess = JSON.parse(servicess);
    // setservices_ls(servicess);
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
      dispatch(deleteServiceAction(id));
    }
  };

  const pushHistory = (id) => {
    history.push({
      pathname: '/createservice',
      business_id: id
    });
  };

  const ratingChanged = (rating, bid, b_rating, count) => {
    let updateCount = count + 1;
    let updateRating = (rating + b_rating) / updateCount;
    dispatch(updateServiceRatingAction(bid, updateRating, updateCount))
  }

  return (
    <MainScreen title={`Welcome Back ${userInfo && userInfo.user.name}..`}>
      <Button onClick={() => pushHistory(location.business_id)} style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
        Create new services
      </Button>
      <div style={{ display: "flex", justifyContent: "space-between" }}>


        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {errorDelete && (
          <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
        )}
        {loadingDelete && <Loading />}
        {
          services && services.map((service) => {
            return (
              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={service.photo} />
                <Card.Body>
                  <Card.Title>{service.name}</Card.Title>
                  <Card.Text>
                    info: {service.info}
                  </Card.Text>
                  <Card.Text>
                    Price: {service.price}
                  </Card.Text>
                  <Card.Text>
                    Duration: {service.duration}
                  </Card.Text>
                  <Button variant="primary" onClick={() => history.push(`/service/${service._id}`)}>edit</Button> &nbsp;
                  <Button variant="danger" onClick={() => deleteHandler(service._id)}>Delete</Button>
                </Card.Body>
                <ReactStars
                  count={5}
                  value={service.rating}
                  onChange={(e) => ratingChanged(e, service._id, service.rating, service.count)}
                  size={24}
                  color2={'#ffd700'} />
                ({service.count})
              </Card>
            )
          })
        }
      </div>
    </MainScreen>
  );
}

export default MyServices;
