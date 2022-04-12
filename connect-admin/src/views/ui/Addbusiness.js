import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import bg1 from "../../assets/images/bg/bg1.jpg";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";
import "../../css/local.css";
import { storage } from "../../firebase";

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
import { createBusinessAction } from "../../actions/businesssActions";
import { useNavigate } from "react-router-dom";

function Addbusiness({ history }) {
  const [longitude, setLongitude] = useState(0);
  const [latitude, setLatitude] = useState(0);
  const [value, setvalue] = useState(false)
  const [values, setValues] = useState({
    name: "",
    mobile: "",
    info: "",
    category: "",
    photo: ""
  });


  const { name, mobile, category, photo, info } = values;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const businessCreate = useSelector((state) => state.businessCreate);
  const { error } = businessCreate;

  useEffect(() => {
    const location = window.navigator && window.navigator.geolocation;
    if (location) {
      location.getCurrentPosition(
        (position) => {
          setLongitude(position.coords.latitude);
          setLatitude(position.coords.longitude);
        },
        (error) => {
          this.setState({
            latitude: "err-latitude",
            longitude: "err-longitude",
          });
        }
      );
    }
  }, []);

  const resetHandler = () => {
    setValues({ ...values, name: "" });
    setValues({ ...values, category: "" });
    setValues({ ...values, mobile: "" });
    setValues({ ...values, info: "" });
    setValues({ ...values, photo: "" });
    setValues({ ...values, longitude: "" });
    setValues({ ...values, latitude: "" });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!name || !mobile || !info || !category || !photo || !longitude || !latitude) {
      alert("fill all value")
    } else {

      const uploadTask = storage.ref(`/images/${photo.name}`).put(photo);
      setvalue(true)
      uploadTask.on('state_changed',
        (snapShot) => {
          console.log(snapShot)
        }, (err) => {
          console.log(err)
        }, () => {
          storage.ref('images').child(photo.name).getDownloadURL()
            .then(fireBaseUrl => {
              dispatch(createBusinessAction(name, category, mobile, info, fireBaseUrl, longitude, latitude))
              setvalue(false)
              navigate("/")
              // history.push("/mynotes");
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
            Business Form
          </CardTitle>
          <CardBody>
            <Form onSubmit={submitHandler}>
              {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
              <FormGroup>
                <Label for="businessName">Business Name</Label>
                <Input id="b_name"
                  value={name}
                  placeholder="Enter the name"
                  onChange={(e) => setValues({ ...values, name: e.target.value })} />
              </FormGroup>
              <FormGroup>
                <Label for="contactNumber">Contact Number</Label>
                <Input id="ph_no"
                  value={mobile}
                  placeholder="Enter the Mobileno"
                  onChange={(e) => setValues({ ...values, mobile: e.target.value })} />
              </FormGroup>
              <FormGroup>
                <Label for="contactNumber">businss Info</Label>
                <Input id="ph_no"
                  value={info}
                  placeholder="Enter the Info"
                  onChange={(e) => setValues({ ...values, info: e.target.value })} />
              </FormGroup>
              <FormGroup>
                <Label for="businessCategory">Category</Label>
                <Input id="b_cat" name="b_cat" type="select" onChange={(e) => setValues({ ...values, category: e.target.value })}>
                  <option value="" selected disabled hidden>Select Business</option>
                  <option value={"Saloon"}>Saloon</option>
                  <option value={"Garage"}>Garage</option>
                  <option value={"Electronics"}>Electronics</option>
                  <option value={"Cleaning"}>Cleaning</option>
                  <option value={"Other"}>Other</option>
                </Input>
              </FormGroup>

              <FormGroup>
                <Label for="businessLatitude">Latitude</Label>
                <Input id="latitude"
                  value={latitude}
                  placeholder="Enter the Latitude"
                // onChange={(e) => setValues({ ...values, latitude: e.target.value })} 
                />
              </FormGroup>

              <FormGroup>
                <Label for="businessLongitude">Longitude</Label>
                <Input id="longitude"
                  value={longitude}
                  placeholder="Enter the Longitude"
                // onChange={(e) => setValues({ ...values, longitude: e.target.value })} 
                />
              </FormGroup>

              <FormGroup>
                <Label for="businessLogo">Logo</Label>
                <Input onChange={(e) => setValues({ ...values, photo: e.target.files[0] })}
                  type="file"
                  name="photo"
                  accept="image"
                  placeholder="choose a file" />
                <FormText>Add your business logo here!!</FormText>
              </FormGroup>
              {value && <Loading size={50} />}
              <Button type="submit">Add Business</Button>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
}

export default Addbusiness;
