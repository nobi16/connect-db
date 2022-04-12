import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
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
import { deleteBusinessAction, updateBusinessAction } from '../../actions/businesssActions';

import bg1 from "../../assets/images/bg/bg1.jpg";
import "../../css/local.css";
import { storage } from '../../firebase';

function Updatebusiness() {

  const [name, setname] = useState();
  const [category, setCategory] = useState();
  const [mobile, setmobile] = useState();
  const [info, setinfo] = useState("")
  const [photo, setphoto] = useState("");
  const [longitude, setlongitude] = useState("");
  const [latitude, setlatitude] = useState('')
  const [value, setvalue] = useState(false);
  const [url, seturl] = useState("")
  const [id, setid] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const businessUpdate = useSelector((state) => state.businessUpdate);
  const { loading, error } = businessUpdate;

  // history.push("/mynotes");

  useEffect(async () => {
    setid(location.state.bid)
    const { data } = await axios.get(`http://localhost:5001/api/business/${id}`);
    console.log(data);

    setname(data.name);
    setCategory(data.category);
    setmobile(data.mobile);
    setinfo(data.info)
    // setphoto(data.photo);
    setlongitude(data.longitude);
    setlatitude(data.latitude);

    setTimeout(() => {
      setvalue(!value)
    }, 2000);
  }, [id]);

  const resetHandler = () => {
    setname("");
    setCategory("");
    setmobile("");
    setinfo("");
    setphoto("");
    setlongitude("");
    setlatitude("");
  };

  const updateHandler = async (e) => {
    e.preventDefault();
    if ( !photo) {
      alert("Select Photo");
      return false;
    }
    if (!name || !mobile || !info || !category || !photo || !longitude || !latitude) {
      alert("fill all value");
      return false;
    } else {
      const uploadTask = storage.ref(`/images/${photo.name}`).put(photo);
      uploadTask.on('state_changed',
        (snapShot) => {
          console.log(snapShot)
        }, (err) => {
          console.log(err)
        }, () => {
          storage.ref('images').child(photo.name).getDownloadURL()
            .then(fireBaseUrl => {
              seturl(fireBaseUrl)
              dispatch(updateBusinessAction(id, name, category, mobile, info, fireBaseUrl, longitude, latitude))
              navigate('/')
              resetHandler();
            }).catch((err) => console.log(err))
        })
    }

    resetHandler();
  };


  return (
    <Row>
      <Col>
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            Business Form
          </CardTitle>
          <CardBody>
            <Form onSubmit={updateHandler}>
              <FormGroup>
                <Label for="businessName">Business Name</Label>
                <Input id="b_name"
                  type="name"
                  value={name}
                  placeholder="Enter the name"
                  onChange={(e) => setname(e.target.value)} />
              </FormGroup>
              <FormGroup>
                <Label for="contactNumber">Contact Number</Label>
                <Input id="ph_no"
                  type="number"
                  value={mobile}
                  placeholder="Enter the Mobileno"
                  onChange={(e) => setmobile(e.target.value)} />
              </FormGroup>
              <FormGroup>
                <Label for="contactNumber">Business Info</Label>
                <Input id="ph_no"
                  type="text"
                  value={info}
                  placeholder="Enter the Info"
                  onChange={(e) => setinfo(e.target.value)} />
              </FormGroup>
              <FormGroup>
                <Label for="businessCategory">Category</Label>
                <Input id="b_cat"
                  value={category}
                  placeholder="Enter the category"
                  rows={4}
                  onChange={(e) => setCategory(e.target.value)} />
              </FormGroup>

              <FormGroup>
                <Label for="businessLatitude">Latitude</Label>
                <Input id="latitude"
                  value={latitude}
                  placeholder="Enter the Latitude"
                  onChange={(e) => setlatitude(e.target.value)} />
              </FormGroup>

              <FormGroup>
                <Label for="businessLongitude">Longitude</Label>
                <Input id="longitude"
                  value={longitude}
                  placeholder="Enter the Longitude"
                  onChange={(e) => setlongitude(e.target.value)} />
              </FormGroup>

              <FormGroup>
                <Label for="businessLogo">Logo</Label>
                <Input onChange={(e) => setphoto(e.target.files[0])}
                  type="file"
                  name="photo"
                  accept="image"
                  placeholder="choose a file" />
                  <br/>
                {/* <img src={photo} alt="Business logo" className="my-businessimg" /> */}
              </FormGroup>
              <Button>Update Business</Button>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </Row>
  )
}

export default Updatebusiness