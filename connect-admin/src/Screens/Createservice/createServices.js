import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import ReactMarkdown from "react-markdown";
import { createBusinessAction } from "../../actions/businesssActions";

function CreateNote({ history }) {
  const [name, setname] = useState("");
  const [mobile, setmobile] = useState("");
  const [category, setCategory] = useState("");

  const dispatch = useDispatch();

  const businessCreate = useSelector((state) => state.businessCreate);
  const { loading, error, business } = businessCreate;

  console.log(business);

  const resetHandler = () => {
    setname("");
    setCategory("");
    setmobile("");
  };

  const submitHandler = (e) => {
    e.preventDefault();
   
    if (!name || !mobile || !category) {
      alert("fill all value")
    }else{
	  dispatch(createBusinessAction(name, category, mobile))
      resetHandler();
      debugger
      history.push("/mynotes");
    }

  };

  useEffect(() => {}, []);

  return (
    <MainScreen name="Create a Note">
      <Card>
        <Card.Header>Create a new Business</Card.Header>
        <Card.Body>
          <Form onSubmit={submitHandler}>
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            <Form.Group controlId="name">
              <Form.Label>name</Form.Label>
              <Form.Control
                type="name"
                value={name}
                placeholder="Enter the name"
                onChange={(e) => setname(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="mobile">
              <Form.Label>mobile</Form.Label>
              <Form.Control
                as="textarea"
                value={mobile}
                placeholder="Enter the mobile"
                rows={4}
                onChange={(e) => setmobile(e.target.value)}
              />
            </Form.Group>
            {mobile && (
              <Card>
                <Card.Header>Note Preview</Card.Header>
                <Card.Body>
                  <ReactMarkdown>{mobile}</ReactMarkdown>
                </Card.Body>
              </Card>
            )}

            <Form.Group controlId="mobile">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="mobile"
                value={category}
                placeholder="Enter the Category"
                onChange={(e) => setCategory(e.target.value)}
              />
            </Form.Group>
            {loading && <Loading size={50} />}
            <Button type="submit" variant="primary">
              Create Note
            </Button>
            <Button className="mx-2" onClick={resetHandler} variant="danger">
              Reset Feilds
            </Button>
          </Form>
        </Card.Body>

        <Card.Footer className="text-muted">
          Creating on - {new Date().toLocaleDateString()}
        </Card.Footer>
      </Card>
    </MainScreen>
  );
}

export default CreateNote;
