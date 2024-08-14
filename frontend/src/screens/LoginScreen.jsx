import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Grid, TextField, Button, Typography } from "@mui/material";
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from "react-redux";
import {
  login
 
} from "../redux/slices/userSlice";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

function LoginScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();


  const redirect = location.search ? location.search.split("=")[1] : "";
  console.log(typeof(redirect))
  const userLogin = useSelector((state) => state.user);
  const { userDetails, loading, error } = userLogin;

  useEffect(() => {
    if (userDetails) {
      navigate(`/${redirect}`, { replace: true });
    }
  }, [navigate, userDetails,redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(email, password)
    dispatch(login(email, password));
  };


  return (
    // <Form onSubmit={submitHandler}>
    //   <Form.Group className="mb-3" controlId="email">
    //     <Form.Label style={{color:"white"}}>Email address</Form.Label>
    //     <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)}/>
    //   </Form.Group>

    //   <Form.Group className="mb-3" controlId="password">
    //     <Form.Label style={{color:"white"}}>Password</Form.Label>
    //     <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
    //   </Form.Group>
    //   <Button variant="primary" type="submit" style={{color:"white"}}>
    //     Sign In
    //   </Button>
    // </Form>
    <div className="row mt-5">
    <FormContainer>
      <Typography component="h1" style={{ fontWeight: "bold", color:"white" ,textAlign:"Center"}} variant="h4">
        Sign In
      </Typography>
      {error && <Message variant="error">Wrong Email or Password!</Message>}
      {loading && <Loader />}
      <form onSubmit={submitHandler}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              variant="filled"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="filled"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="outlined"
          color="primary"
          style={{padding:"10px",marginTop:"15px"}}
        >
          Sign In
        </Button>
        <Grid container justify="flex-start">
          <Grid item style={{color:"white"}}>
            New Customer?{" "}
            <Link
              to={redirect ? `/register?redirect=${redirect}` : "/register"}
              variant="body2"
              style={{textDecoration:"None"}}
            >
              Register
            </Link>
          </Grid>
        </Grid>
      </form>
    </FormContainer>
    </div>
  );
}

export default LoginScreen;