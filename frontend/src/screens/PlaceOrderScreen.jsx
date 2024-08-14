import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createOrder, getOrderDetails } from "../redux/slices/orderSlice";
import CheckoutSteps from "../components/CheckoutSteps";
import Message from "../components/Message";
import { fetchUserDetails } from "../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";

function PlaceOrderScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const order = useSelector((state) => state.order);
  const { orderDetails, loading, error } = order;
  const cart = useSelector((state) => state.cart);
  const orderid = orderDetails?._id;
  //  console.log(cart )
  // PRICE CALCULATIONS
  const itemsPrice = cart.cartItems.reduce(
    (acc, item) => acc + Number(item.price),
    0
  );
  console.log(itemsPrice);
  const totalPrice = Number(itemsPrice).toFixed(2);

  if (!cart.paymentMethod) {
    navigate("/payment");
  }

  const data = {
    orderItems: cart.cartItems,
    paymentMethod: cart.paymentMethod,
    itemsPrice: itemsPrice.toFixed(2).toString(),
    totalPrice: totalPrice.toString(),
  };

  // console.log(data)
  // const placeOrder =async () => {
  //   const orderId = await dispatch(createOrder(data))
  //   navigate(`/profile`);
  // };

  const placeOrder = (event) => {
    event.preventDefault();
    dispatch(createOrder(data));
    // navigate(`/profile`);
    // .then(() => {
    //   setTimeout(() => {
    //     // console.log(orderDetails)

    //   }, 1000); // Delay of 1 second (1000 milliseconds)
    // })
    // .catch((error) => {
    //   // Handle any error that occurred during order creation
    // });
  };
  useEffect(() => {
    if (orderid) {
      // Redirect to the order screen with the new order ID
      navigate(`/orderDetail/${orderid}`);
    }
  }, [orderid, navigate]);

  return (
    <div>
      <Row className="mt-3">
        <div style={{ display: "flex", justifyContent: "center" }}>
          <CheckoutSteps step1 step2 step3 />
        </div>
        <Col md={8}>
          <ListGroup data-bs-theme="dark">
            {/* <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Shipping Address: </strong>
                {cart.shippingAddress.address}, {cart.shippingAddress.city},{" "}
                {cart.shippingAddress.postalCode},{" "}
                {cart.shippingAddress.country}
              </p>
            </ListGroup.Item> */}
            <ListGroup.Item variant="dark">
              <h2>Payment</h2>
              <p>
                <strong>Payment Method: </strong>
                {cart.paymentMethod}
              </p>
            </ListGroup.Item>
            <ListGroup.Item variant="dark">
              <h2>Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <Message variant="info">Your cart is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index} variant="dark">
                      <Row>
                        <Col md={1}>
                          <Image
                            src={`http://127.0.0.1:8000${item.image}`}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>Rs.{item.price}</Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items:</Col>
                  <Col>Rs.{itemsPrice.toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total:</Col>
                  <Col>Rs.{totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {error && <Message variant="danger">{error}</Message>}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="button"
                  className="w-100"
                  disabled={cart.cartItems.length === 0}
                  onClick={(event) => placeOrder(event)}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default PlaceOrderScreen;
