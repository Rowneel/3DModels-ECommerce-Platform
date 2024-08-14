import React, { useState, useEffect } from "react";
import { Row, Col, Button, Form, Table,Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {deleteUser , updateUser } from "../redux/slices/userSlice";
import { listMyOrders , getOrderDetails} from "../redux/slices/orderSlice";
import Message from "../components/Message";
import Loader from "../components/Loader";
import CancelIcon from '@mui/icons-material/Cancel';
import { useNavigate, Link } from "react-router-dom";
function ProfileScreen() {
    const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { userDetails, loading, error } = user;
  const userData = {
    id: userDetails._id,
    name: name,
    email: email,
    password: password,
  };

  const order = useSelector((state) => state.order);
  const { listorder, loading: loadingOrders, error: errorOrders } = order;
  useEffect(() => {
    if (!userDetails) {
      navigate("/login");
    } else {
      dispatch(listMyOrders());
        setName(userDetails.name);
        setEmail(userDetails.username);
    }
  }, [dispatch, navigate, userDetails, error]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(updateUser(userDetails.id, userData));
      setMessage("");
    }
  };
  
  const handleDeleteUser = () => {
    // Call the deleteUser action from userSlice
    dispatch(deleteUser(userDetails.id));
    navigate('/');
    window.location.reload(); // Reload the page

  };
  
  return (
    <Container className="mt-5">
    <Row style={{backgroundColor:"#25263b", padding:50}}>
      <Col md={3}>
        <h2>User Profile</h2>
        {message && <Message variant="danger">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}
        <Form  data-bs-theme="dark" onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              required
              type="name"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              required
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="passwordConfirm">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>

          <Button type="submit" variant="primary" className="mt-3">
            Update
          </Button>

        </Form>
        <Button type="submit" variant="danger" className="mt-3" onClick={handleDeleteUser}>
         <div style={{fontSize:"7px" }}><CancelIcon />  Account </div> 
          </Button>
      </Col>

      <Col md={9}>
        <h2>My Orders</h2>
        {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Message variant="danger">{errorOrders}</Message>
        ) : (
          <Table striped responsive className="table-sm" data-bs-theme="dark">
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Total</th>
                <th>Paid</th>
                <th>Delivered</th>
              </tr>
            </thead>

            <tbody>
            {listorder.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt ? order.createdAt.substring(0, 10) : null}</td>
                  <td>Rs.{order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt ? (
                        order.paidAt.substring(0, 10)
                      ) : null
                    ) : (
                      <i className="fas fa-times"
                        style={{ color: "red" }}></i>
                    )}
                  </td>
                  <td>
                    {/* <LinkContainer to={`/orderDetail`}>
                      <Button className="btn" onClick={(e) => {dispatch(getOrderDetails(order._id))}}>Details</Button>
                    </LinkContainer>
                    <Button onClick={() => console.log("hi")}>he</Button> */}
                    <Link to={`/orderDetail/${order._id}`} style={{textDecoration:"none"}}>Details</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row >
    </Container>
  );
}

export default ProfileScreen;