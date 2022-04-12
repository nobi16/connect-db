import React, { useEffect, useState } from "react";
import { Accordion, Badge, Button, Card } from "react-bootstrap";
import MainScreen from "../../components/MainScreen.js";
import ReactStars from 'react-stars'
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import { deleteProductAction, listProduct, updatePoductAction, updateProductRatingAction } from "../../actions/productsActions";

function MyProducts({ history, location }) {
  const dispatch = useDispatch();
  const [pid, setpid] = useState("")
  const [services_ls, setservices_ls] = useState([])

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
    let localStoragePid = localStorage.getItem("buid");
    setpid(localStoragePid)
    dispatch(listProduct(localStoragePid));
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
      dispatch(deleteProductAction(id));
    }
  };

  const pushHistory = (id) => {
    history.push({
      pathname: '/createproduct',
      business_id: id
    });
  };

  const ratingChanged = (rating, pid, p_rating, count) => {
    let updateCount = count + 1;
    let updateRating = (rating + p_rating) / updateCount;
    dispatch(updateProductRatingAction(pid, updateRating, updateCount))
  }

  return (
    <MainScreen title={`Welcome Back ${userInfo && userInfo.user.name}..`}>
      <Button onClick={() => pushHistory(location.business_id)} style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
        Create new product
      </Button>
      <div style={{ display: "flex", justifyContent: "space-between" }}>


        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {errorDelete && (
          <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
        )}
        {loadingDelete && <Loading />}
        {
          products && products.map((product) => {
            return (
              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={product.photo} />
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>
                    info: {product.info}
                  </Card.Text>
                  <Card.Text>
                    Price: {product.price}
                  </Card.Text>
                  <Button variant="primary" onClick={() => history.push(`/product/${product._id}`)}>edit</Button> &nbsp;
                  <Button variant="danger" onClick={() => deleteHandler(product._id)}>Delete</Button>
                </Card.Body>
                <ReactStars
                  count={5}
                  value={product.rating}
                  onChange={(e) => ratingChanged(e, product._id, product.rating, product.count)}
                  size={24}
                  color2={'#ffd700'} />
                ({product.count})
              </Card>
            )
          })
        }
      </div>
    </MainScreen>
  );
}

export default MyProducts;
