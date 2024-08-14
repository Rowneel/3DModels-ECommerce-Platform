import React, { useState, useEffect } from "react";

/* REACT ROUTER */
import { Link } from "react-router-dom";

/* REACT BOOTSTRAP */
import { Row, Col, ListGroup, Image, Card, Button,Container } from "react-bootstrap";

/* PAYPAL BUTTONS */
// import { PayPalButton } from "react-paypal-button-v2";

/* COMPONENTS */
import Message from "../components/Message";
import Loader from "../components/Loader";

/* REACT - REDUX */
import { useDispatch, useSelector } from "react-redux";

/* ACTION CREATORS */
import { getOrderDetails, payOrder } from "../redux/slices/orderSlice";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

function OrderScreen() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [sdkReady, setSdkReady] = useState(false);
  let { id } = useParams();
  /* PULLING A PART OF STATE FROM THE ACTUAL STATE IN THE REDUX STORE */
  const order = useSelector((state) => state.order);
  const { orderDetails, error, loading } = order;
  console.log(order);
  // const orderPay = useSelector((state) => state.orderPay);
  // const { loading: loadingPay, success: successPay } = orderPay;

  // const orderDeliver = useSelector((state) => state.orderDeliver);
  // const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  const userLogin = useSelector((state) => state.user);
  console.log(userLogin);
  const { userDetails } = userLogin;

  let updatedOrderDetails = orderDetails;

  if (
    updatedOrderDetails &&
    updatedOrderDetails.orderItems &&
    updatedOrderDetails.orderItems.length > 0
  ) {
    const itemsPrice = updatedOrderDetails.orderItems
      .reduce((acc, item) => acc + Number(item.price), 0)
      .toFixed(2);

    updatedOrderDetails = { ...updatedOrderDetails, itemsPrice };
  }

  // Calculate the total price of each individual item
  const calculateItemsPrice = () => {
    if (orderDetails.orderItems && orderDetails.orderItems.length > 0) {
      return orderDetails.orderItems.reduce((total, item) => {
        const itemPrice = parseFloat(item.price);
        return total + itemPrice;
      }, 0);
    }
    return 0;
  };

  // Call the calculateItemsPrice method to get the total price
  const itemsPrice = calculateItemsPrice();

  //   /* HANDLERS */
  //   const successPaymentHandler = (paymentResult) => {
  //     dispatch(payOrder(orderDetails._id, paymentResult));
  //     console.log(orderDetails._id)

  //   };

  useEffect(() => {
    // IF REVIEW SUCCESSFULLY SUBMITTED, RESET
    console.log(id);
    dispatch(getOrderDetails(id));
  }, [dispatch]);

  // const handlePayment = async (orderDetails) => {
  //   console.log(orderDetails);
  //   const payload = {
  //     "return_url": "https://example.com/payment/",
  //     "website_url": "https://example.com/",
  //     "amount": orderDetails?.totalPrice * 100,
  //     "purchase_order_id": orderDetails._id,
  //     "purchase_order_name": "test",
  //     "customer_info": {
  //         "name": "Khalti Bahadur",
  //         "email": "example@gmail.com",
  //         "phone": "9800000123"
  //     },
  //   }

  //   const res = await axios.post('http://127.0.0.1:8000/api/pay/',payload);
  //   if (res){
  //     window.location.href = `${res?.data?.payment_url}`;
  //   }
  // }

  return (
    <Container>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        orderDetails && orderDetails.User && (
        <>
          <h1>Order: {orderDetails._id}</h1>
        <Row>
            <Col md={8}>
            <ListGroup variant="flush">
                <ListGroup.Item>
                <h2>To</h2>

                <p>
                    <strong>Name: {orderDetails.User.name}</strong>
                </p>

                <p>
                    <strong>Email: </strong>
                    <a href={`mailto:${orderDetails.User.username}`}>
                    {orderDetails.User.username}
                    </a>
                </p>

                {orderDetails.isDeliver ? (
                    <Message variant="success">
                    Delivered on{" "}
                    {orderDetails.deliveredAt
                        ? orderDetails.deliveredAt.substring(0, 10)
                        : null}
                    </Message>
                ) : (
                    <Message variant="warning">Not Delivered</Message>
                )}
                </ListGroup.Item>

                <ListGroup.Item>
                <h2>Payment</h2>

                <p>
                    <strong>Payment Method: </strong>
                    {orderDetails.paymentMethod}
                </p>

                {orderDetails.isPaid ? (
                    <Message variant="success">
                    Paid{" "}
                    {orderDetails.paidAt
                        ? orderDetails.paidAt.substring(0, 10)
                        : null}
                    </Message>
                ) : (
                    <Message variant="warning">Not Paid</Message>
                )}
                </ListGroup.Item>

                <ListGroup.Item>
                <h2>Order Items</h2>

                {orderDetails.orderItems.length === 0 ? (
                    <Message variant="info">Order is empty</Message>
                ) : (
                    <ListGroup variant="flush">
                    {orderDetails.orderItems.map((item, index) => (
                        <ListGroup.Item key={index}>
                        <Row>
                            <Col md={1}>
                            <Image
                                src={`http://127.0.0.1:8000${item.image}`}
                                alt={item.name}
                                width={100}
                                fluid
                                rounded
                            />
                            </Col>

                            <Col>
                            <Link to={`/product/${item.product}`}>
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
                    <Col>Products Cost:</Col>

                    <Col>Rs.{itemsPrice}</Col>
                    </Row>
                </ListGroup.Item>


                

                <ListGroup.Item>
                    <Row>
                    <Col>Total:</Col>

                    <Col>Rs. {orderDetails.totalPrice}</Col>
                    </Row>
                </ListGroup.Item>

                {!orderDetails.isPaid && (
                    <ListGroup.Item>
                    {loading && <Loader />}
                    
                        {/* // <PayPalButton
                        //   amount={orderDetails.totalPrice}
                        //   onSuccess={successPaymentHandler}
                        // /> */}
                    {/* <button
                      type="button"
                      onClick={() => handlePayment(orderDetails)}
                    >Pay Order</button> */}
                    <p>Pay Order</p>
                    </ListGroup.Item>
                )}
                </ListGroup>
            </Card>
            </Col>
        </Row>
        </>
        )
      )}
    </Container>
  );
}

export default OrderScreen;
