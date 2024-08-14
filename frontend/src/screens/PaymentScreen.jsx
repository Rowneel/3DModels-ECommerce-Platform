import React, { useState } from "react";

/* REACT BOOTSTRAP */
import { Button, Form, Col } from "react-bootstrap";

/* COMPONENTS */
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";

/* REACT - REDUX */
import { useDispatch, useSelector } from "react-redux";

/* ACTION CREATORS */
import { savePaymentMethod } from "../redux/slices/cartSlice";
import { useNavigate } from "react-router-dom";

function PaymentScreen({ history }) {
  const navigate = useNavigate();
  // PULLING OUT SHIPPING ADDRESS FROM CART
  const cart = useSelector((state) => state.cart);

  // STATE
  const [paymentMethod, setPaymentMethod] = useState("Khalti");

  // HANDLERS

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(savePaymentMethod(paymentMethod));

    // AFTER CHOSING THE PAYMENT METHOD REDIRECT USER TO PlaceOrder SCREEN
    navigate("/placeorder");
  };

  return (
    <div className="row mt-3">
      <FormContainer>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <CheckoutSteps step1 step2 />
        </div>
        <Form onSubmit={submitHandler}>
          <Form.Group>
            <Form.Label as="legend" style={{ color: "white" }}>
              Select Method
            </Form.Label>
            <Col>
              <Form.Check
                type="radio"
                label="Khalti or Credit Card"
                id="khalti"
                name="paymentMethod"
                checked
                onChange={(e) => setPaymentMethod(e.target.value)}
                style={{ color: "white" }}
              ></Form.Check>
            </Col>
          </Form.Group>
          <Button type="submit" variant="primary" className="my-3">
            Continue
          </Button>
        </Form>
      </FormContainer>
    </div>
  );
}

export default PaymentScreen;
