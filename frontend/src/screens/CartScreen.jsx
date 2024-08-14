import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Button, Card, Form,Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import {   removeFromCart } from "../redux/slices/cartSlice";
import { useNavigate } from "react-router-dom";

function CartScreen() {
 const navigate = useNavigate();

  const dispatch = useDispatch();

   

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  console.log(cartItems)
  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=payment");
  };

  return (
    <Container>
    <div className="row mt-3">
      <Col md={8}>
        {cartItems.length === 0 ? (
          <ListGroup data-bs-theme="dark">
          <ListGroup.Item variant="dark">
          <h1 style={{color:"white"}}>Shopping Cart</h1>
          </ListGroup.Item>
          <Message variant="info">
            Your cart is empty. <Link to="/">Go Back</Link>
          </Message>
          </ListGroup>
        ) : (
          <ListGroup data-bs-theme="dark">
            <ListGroup.Item variant="dark">
            <h1 style={{color:"white"}}>Shopping Cart</h1>
            </ListGroup.Item>
            {cartItems.map((item,index) => (
              <ListGroup.Item key={index} action variant="dark">
                <Row style={{alignItems:"center"}}>
                  <Col >
                    <Image src={`http://127.0.0.1:8000${item.image}`} alt={item.name} fluid rounded width={100}/>
                  </Col>
                  <Col >
                    <Link to={`/product/${item._id}`} style={{textDecoration:"None"}}>{item.name}</Link>
                  </Col>
                  <Col >Rs.{item.price}</Col>
                  <Col style={{textAlign:"center"}}>
                    <Button
                      type="button"
                      variant="dark"
                      onClick={() => removeFromCartHandler(item._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>

      <Col md={4}>
        <Card data-bs-theme="dark">
          <ListGroup data-bs-theme="dark" variant="flush">
            <ListGroup.Item variant="secondary">
              <h2>
                Subtotal ({cartItems.length})
                items
              </h2>
              Rs.
              {cartItems.reduce((acc, item) => acc + Number(item.price), 0)}
            </ListGroup.Item>
          </ListGroup>
          <ListGroup.Item>
            <Button
              type="button"
              className="w-100"
              disabled={cartItems.length === 0}
              onClick={checkoutHandler}
            >
              Proceed To Checkout
            </Button>
          </ListGroup.Item>
        </Card>
      </Col>
    </div>
    </Container>
  );
}

export default CartScreen;