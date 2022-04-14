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
import { deleteProductAction, updatePoductAction } from "../../actions/productsActions";

import bg1 from "../../assets/images/bg/bg1.jpg";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";
import "../../css/local.css";
import { storage } from "../../firebase";

function Updateservice() {
  const [name, setname] = useState();
  const [price, setprice] = useState();
  const [info, setinfo] = useState();
  const [photo, setphoto] = useState("");
  const [bid, setbid] = useState("");
  const [pid, setpid] = useState("")
  const [value, setvalue] = useState(false);
  const [url, seturl] = useState("")
  const dispatch = useDispatch();
  const naviate = useNavigate();
  const location = useLocation();

  const productUpdate = useSelector((state) => state.productUpdate);
  const { loading, error } = productUpdate;

  const productDelete = useSelector((state) => state.productDelete);
  const { loading: loadingDelete, error: errorDelete } = productDelete;

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteProductAction(id));
    }
    // history.push("/products");
  };

  useEffect(async () => {
    // let buid = localStorage.getItem("buid");
    // setbid(buid);
    // setpid(match.params.id)
    const fetching = async () => {
      const { data } = await axios.get(`/api/product/${location.state.pid}`);
      setname(data.name);
      setprice(data.price);
      setinfo(data.info);
      // setphoto(data.photo);
    };

    fetching();
  });

  const resetHandler = () => {
    setname("");
    setprice("");
    setinfo("");
    setphoto("");
  };

  const updateHandler = async (e) => {
    e.preventDefault();
    if ( !photo) {
      alert("Select Photo");
      return false;
    }
    if (!name || !price || !info || !photo) {
      alert("fill all value");
      return false;
    } else {
      const uploadTask = storage.ref(`/productsimages/${photo.name}`).put(photo);
      setvalue(true)
      uploadTask.on('state_changed',
        (snapShot) => {
          //takes a snap shot of the process as it is happening
          console.log(snapShot)
        }, (err) => {
          //catches the errors
          console.log(err)
        }, () => {
          storage.ref('productsimages').child(photo.name).getDownloadURL()
            .then(fireBaseUrl => {
              dispatch(updatePoductAction(name, price, info, fireBaseUrl, bid, pid))
              setvalue(false)
              naviate("/adminproduct")
              // history.push("/products");
              resetHandler();
            }).catch((err) => console.log(err))
        })
    }

    resetHandler();
    // history.push("/products");
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
            Product Form
          </CardTitle>
          <CardBody>
            <Form onSubmit={updateHandler}  >
              <FormGroup>
                {/* <Input value="bid" id="b_id" name="b_id" type="text" disabled />
                <Input value="sid" id="s_id" name="s_id" type="text" disabled /> */}
                <Label for="businessName">Product Name</Label>
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
                <Label for="businessLogo">Product photo</Label>
                <Input onChange={(e) => setphoto(e.target.files[0])}
                  type="file"
                  name="photo"
                  accept="image"
                  placeholder="choose a file" />
                  <br/>
                {/* <img src={photo} alt="Business logo" className="my-businessimg" /> */}
              </FormGroup>

              {loading && <Loading size={50} />}
              <Button type="submit">Update Product</Button>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
}

export default Updateservice;
