import React, { useEffect, useState } from "react";
import { Link, useNavigation } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Card,
  Form,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchProductDetails,
  createReview,
} from "../redux/slices/productSlice";

import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { addToCart } from "../redux/slices/cartSlice";
import { useNavigate } from "react-router-dom";

import DocumentMeta from "../components/DocumentMeta";
function ProductScreen() {
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.product.productDetails);
  const { product, loading, error } = productDetails;
  console.log(product.reviews[0]);

  const userLogin = useSelector((state) => state.user);
  const { userDetails } = userLogin;

  const productReviewCreate = useSelector(
    (state) => state.product.createReview
  );
  const {
    loading: loadingProductReview,
    error: errorProductReview,
    success: successProductReview,
  } = productReviewCreate;
  let { id } = useParams();

  useEffect(() => {
    // IF REVIEW SUCCESSFULLY SUBMITTED, RESET
    if (successProductReview) {
      setRating(0);
      setComment("");
    }
    dispatch(fetchProductDetails(id));
  }, [dispatch, id, successProductReview]);

  // console.log(match.params.id);
  const addToCartHandler = () => {
    navigate(`/cart/${id}`);
    dispatch(addToCart(id));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createReview(id, { rating, comment }));
  };

  return (
    <>
    <DocumentMeta title={product.name} description={product.description} />
      <div className="container">
        <Link to="/" className="btn btn-dark my-3">
          Go Back
        </Link>
        <div className="row">
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <div>
              <Row>
                <Col
                  md={6}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Image
                    src={`http://127.0.0.1:8000${product.image}`}
                    alt={product.name}
                    style={{ maxHeight: 420 }}
                    fluid
                  />
                </Col>
                <Col md={6} style={{ display: "flex", alignItems: "center" }}>
                  <ListGroup
                    data-bs-theme="dark"
                    variant="flush"
                    style={{ width: "100%" }}
                  >
                    <ListGroup.Item style={{ backgroundColor: "#1d1d1d" }}>
                      <h3>{product.name}</h3>
                    </ListGroup.Item>
                    <ListGroup.Item style={{ backgroundColor: "#1d1d1d" }}>
                      <Rating
                        value={product.rating}
                        text={`${product.numReviews} reviews`}
                        color={"#f8e825"}
                      />
                    </ListGroup.Item>

                    <ListGroup.Item style={{ backgroundColor: "#1d1d1d" }}>
                      Price: Rs.{product.price}
                    </ListGroup.Item>

                    <ListGroup.Item
                      style={{ height: 100, backgroundColor: "#1d1d1d" }}
                    >
                      Description: {product.description}
                    </ListGroup.Item>
                    <ListGroup.Item
                      style={{ height: 100, backgroundColor: "#1d1d1d" }}
                    >
                      <Button
                        onClick={addToCartHandler}
                        className="btn-block"
                        type="button"
                      >
                        Add to Cart
                      </Button>
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
              </Row>

              <Row>
                <Col className="mt-5">
                  <ListGroup data-bs-theme="dark" variant="flush">
                    <ListGroup.Item variant="dark">
                      <h4>Reviews</h4>
                    </ListGroup.Item>
                    {product.reviews.length === 0 && (
                      <Message>No reviews</Message>
                    )}
                    {product.reviews.map((review) => (
                      <ListGroup.Item key={review._id} variant="secondary">
                        <strong>{review.name}</strong>
                        <Rating color={"#f8e825"} value={review.rating} />
                        <p>{review.created_at.substring(0, 10)}</p>
                        <p>{review.comment}</p>
                      </ListGroup.Item>
                    ))}
                    <ListGroup.Item>
                      <h4>Write a Review</h4>
                      {loadingProductReview && <Loader />}
                      {successProductReview && (
                        <Message variant="success">Review submitted</Message>
                      )}
                      {errorProductReview && (
                        <Message variant="danger">{errorProductReview}</Message>
                      )}
                      {userDetails ? (
                        <Form onSubmit={submitHandler}>
                          <Form.Group controlId="rating">
                            <Form.Label>Rating</Form.Label>
                            <Form.Control
                              as="select"
                              value={rating}
                              onChange={(e) => setRating(e.target.value)}
                            >
                              <option value="">Select...</option>
                              <option value="1">1 - Poor</option>
                              <option value="2">2 - Fair</option>
                              <option value="3">3 - Good</option>
                              <option value="4">4 - Very Good</option>
                              <option value="5">5 - Excellent</option>
                            </Form.Control>
                          </Form.Group>
                          <Form.Group controlId="comment">
                            <Form.Label>Comment</Form.Label>
                            <Form.Control
                              as="textarea"
                              rows="3"
                              value={comment}
                              onChange={(e) => setComment(e.target.value)}
                            ></Form.Control>
                          </Form.Group>
                          <Button
                            disabled={loadingProductReview}
                            type="submit"
                            variant="primary"
                          >
                            Submit
                          </Button>
                        </Form>
                      ) : (
                        <Message>
                          Please <Link to="/login">sign in</Link> to write a
                          review
                        </Message>
                      )}
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
              </Row>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ProductScreen;
