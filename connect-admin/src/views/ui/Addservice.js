import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
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
  FormText,
} from "reactstrap";
import { createServiceAction } from "../../actions/servicesActions";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";

import "../../css/local.css";
import { storage } from "../../firebase";

function Addservice() {

  const [value, setvalue] = useState(false);
  // const [businesses, setbusinesses] = useState([])
  const [bid, setbid] = useState("")
  const [values, setValues] = useState({
    name: "",
    price: "",
    info: "",
    duration: "",
    photo: ""

  });
  const { name, price, info, duration, photo } = values;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const serviceCreate = useSelector((state) => state.serviceCreate);
  const { error } = serviceCreate;

  const businessList = useSelector((state) => state.businessList);
  const { businesses } = businessList;

  useEffect(() => {
    // setValues({ ...values });
    // let localStorageB = localStorage.getItem("Own_businesses");
    // JSON.parse(localStorageB)
    // setbusinesses(localStorageB)
  }, []);

  const resetHandler = () => {
    setValues({ ...values, name: "" });
    setValues({ ...values, price: "" });
    setValues({ ...values, info: "" });
    setValues({ ...values, duration: "" });
    setValues({ ...values, photo: "" });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!name || !price || !info || !duration || !photo) {
      alert("fill all value")
    } else {

      const uploadTask = storage.ref(`/servicesimages/${photo.name}`).put(photo);
      setvalue(true)
      uploadTask.on('state_changed',
        (snapShot) => {
          console.log(snapShot)
        }, (err) => {
          console.log(err)
        }, () => {
          storage.ref('servicesimages').child(photo.name).getDownloadURL()
            .then(fireBaseUrl => {
              dispatch(createServiceAction(name, price, info, duration, fireBaseUrl, bid))
              setvalue(false)
              navigate('/adminservice')
              resetHandler();
            }).catch((err) => console.log(err))
        })

    }

  };



  return (
    <Row>
      <Col>
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            Service Form
          </CardTitle>
          {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
          <CardBody>
            <Form onSubmit={submitHandler}>
              <FormGroup>
                <Label for="businessCategory">Business</Label>
                <Input id="b_cat" name="b_cat" type="select" onChange={(e) => setbid(e.target.value)}>
                  <option value="" selected disabled hidden>Select Business</option>
                  {
                    businesses && businesses.map((business) => {
                      return (
                        <option value={business._id}>{business.name}</option>
                      )
                    })
                  }
                </Input>
              </FormGroup>
              <FormGroup>
                {/* <Input value="bid" id="b_id" name="b_id" type="text" disabled /> */}
                <Label for="businessName">Service Name</Label>
                <Input id="s_name"
                  value={name}
                  placeholder="Enter the name"
                  onChange={(e) => setValues({ ...values, name: e.target.value })}
                />
              </FormGroup>
              <FormGroup>
                <Label for="servicePrice">Price</Label>
                <Input id="s_price"
                  type="Number"
                  value={price}
                  placeholder="Enter the price"
                  onChange={(e) => setValues({ ...values, price: e.target.value })} />
              </FormGroup>
              <FormGroup>
                <Label for="servicePrice">Duration</Label>
                <Input id="s_price"
                  type="Number"
                  value={duration}
                  placeholder="Enter the duartion"
                  onChange={(e) => setValues({ ...values, duration: e.target.value })} />
              </FormGroup>
              <FormGroup>
                <Label for="serviceInfo">Info</Label>
                <Input
                  type="text"
                  value={info}
                  placeholder="Enter the info"
                  onChange={(e) => setValues({ ...values, info: e.target.value })}
                />
              </FormGroup>
              <FormGroup>
                <Label for="serviceImage">Service photo</Label>
                <Input id="s_img"
                  onChange={(e) => setValues({ ...values, photo: e.target.files[0] })}
                  type="file"
                  name="photo"
                  accept="image"
                  placeholder="choose a file" />
                <FormText>Add photo which describes your service</FormText>
              </FormGroup>
              {value && <Loading size={50} />}
              <Button type="submit" >Add Service</Button>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
}

export default Addservice;
