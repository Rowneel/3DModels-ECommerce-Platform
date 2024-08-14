import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {Button,TextField,Grid,Typography,Container} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../redux/slices/userSlice";

import Message from "../components/Message";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";


function RegisterScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const redirect = location.search ? location.search.split("=")[1] : "/";
  const { userDetails, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    if (userDetails) {
      navigate(redirect);
    }
  }, [history, userDetails, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(createUser( name, email, password ));
    }
  };

  return (
    <div className="row">
    <Container component="main" maxWidth="xs">
      <div>
        <Typography component="h1" style={{ fontWeight: "bold" ,color:"white"}} variant="h5">
          Register
        </Typography>

        {message && <Message variant="danger">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}
        <form onSubmit={submitHandler}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="filled"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="filled"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="filled"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="outlined"
            color="primary"
          >
            Register
          </Button>
          <Grid container justifyContent="flex-start">
            <Grid item>
            Already have an account? 
              <Link
                to={redirect ? `/login?redirect=${redirect}` : "/login"}
                variant="body2"
              >
                 Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
    </div>
  );
}

export default RegisterScreen;