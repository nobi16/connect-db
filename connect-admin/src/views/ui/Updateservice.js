import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Button,
  Row,
  Col,
  Card,
  CardTitle,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { deleteServiceAction, updateServiceAction } from "../../actions/servicesActions";

import bg1 from "../../assets/images/bg/bg1.jpg";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";
import "../../css/local.css";
import { storage } from "../../firebase";

function Updateservice() {

  const [name, setname] = useState();
  const [price, setprice] = useState();
  const [info, setinfo] = useState();
  const [duration, setduration] = useState("");
  const [photo, setphoto] = useState("");
  const [bid, setbid] = useState("");
  const [sid, setsid] = useState("")
  const [value, setvalue] = useState(false);
  const [renderValue, setrenderValue] = useState(true)
  const [url, seturl] = useState("")
  const dispatch = useDispatch();
  const location = useLocation();
  const naviate = useNavigate();

  const serviceUpdate = useSelector((state) => state.serviceUpdate);
  const { loading, error } = serviceUpdate;

  const serviceDelete = useSelector((state) => state.serviceDelete);
  const { loading: loadingDelete, error: errorDelete } = serviceDelete;

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteServiceAction(id));
    }
    // history.push("/services");
  };

  useEffect(async () => {
    // let buid = localStorage.getItem("buid");
    // setsid(location.state.sid);
    // setsid(match.params.id)
    const { data } = await axios.get(`/service/${location.state.sid}`);
    setname(data.name);
    setprice(data.price);
    setinfo(data.info);
    setduration(data.duration)
    // setphoto(data.photo);
    // setTimeout(() => {
    //   setrenderValue(!renderValue)
    // }, 3000);
  }, []);

  const resetHandler = () => {
    setname("");
    setprice("");
    setduration("");
    setinfo("");
    setphoto("");
  };

  const updateHandler = async (e) => {
    e.preventDefault();
    if (!photo) {
      alert("Select Photo");
      return false;
    }
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
              dispatch(updateServiceAction(name, price, info, duration, fireBaseUrl, sid))
              setvalue(false)
              naviate("/adminservice")
              // history.push("/services");
              resetHandler();
            }).catch((err) => console.log(err))
        })
    }

    resetHandler();
    // history.push("/services");
  };

  return (
    <Row>
      <Col>
        <Card>
          {value && <Loading />}
          {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
          {errorDelete && (
            <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
          )}
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            Service Form
          </CardTitle>
          <CardBody>
            <Form onSubmit={updateHandler}>
              <FormGroup>
                {/* <Input value="bid" id="b_id" name="b_id" type="text" disabled />
                <Input value="sid" id="s_id" name="s_id" type="text" disabled /> */}
                <Label for="businessName">Service Name</Label>
                <Input
                  id="s_name"
                  type="name"
                  value={name}
                  placeholder="Enter the name"
                  onChange={(e) => setname(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="servicePrice">Price</Label>
                <Input id="s_price"
                  type="Number"
                  value={price}
                  placeholder="Enter the price"
                  onChange={(e) => setprice(e.target.value)} />
              </FormGroup>
              <FormGroup>
                <Label for="serviceInfo">Info</Label>
                <Input
                  id="s_info"
                  type="text"
                  value={info}
                  placeholder="Enter the info"
                  onChange={(e) => setinfo(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="serviceInfo">Duration</Label>
                <Input
                  id="s_info"
                  type="number"
                  value={duration}
                  placeholder="Enter the duration"
                  onChange={(e) => setduration(e.target.value)} />
              </FormGroup>

              <FormGroup>
                <Label for="businessLogo">Service photo</Label>
                <Input onChange={(e) => setphoto(e.target.files[0])}
                  type="file"
                  name="photo"
                  accept="image"
                  placeholder="choose a file" />
                <br />
                {/* <img src={photo} alt="Business logo" className="my-businessimg" /> */}
              </FormGroup>

              {loading && <Loading size={50} />}
              <Button type="submit">Update Service</Button>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
}

export default Updateservice;
