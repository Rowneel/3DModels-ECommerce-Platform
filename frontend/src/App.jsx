import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
// Components
import Header from "./components/Header";
import CheckoutSteps from "./components/CheckoutSteps";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import Categories from "./components/Categories";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import RegisterScreen from "./screens/RegisterScreen";
import LoginScreen from "./screens/LoginScreen";
import ProfileScreen from "./screens/ProfileScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import FormContainer from "./components/FormContainer";
import Loader from "./components/Loader";
import Message from "./components/Message";
import Paginate from "./components/Paginate";
import Product from "./components/Product";
import Rating from "./components/Rating";
import Carousel from "react-bootstrap/Carousel";
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const options = [
  {
    name: "Enable backdrop (default)",
    scroll: false,
    backdrop: true,
  },
  {
    name: "Disable backdrop",
    scroll: false,
    backdrop: false,
  },
  {
    name: "Enable body scrolling",
    scroll: true,
    backdrop: false,
  },
  {
    name: "Enable both scrolling & backdrop",
    scroll: true,
    backdrop: true,
  },
];

function App() {
  const [count, setCount] = useState(0);

  return (
    <ThemeProvider theme={darkTheme}>
      <div style={{minHeight:"100vh"}}>
        <Router>
          <div style={{ position: "sticky", top: 0, zIndex: "100" }}>
            <Header />
          </div>
          {/* <Categories/> */}
          <Routes>
            <Route exact path="/" element={<HomeScreen />} />
            <Route path="/page/:pageNumber" element={<HomeScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/payment" element={<PaymentScreen />} />
            <Route path="/cart/:id?" element={<CartScreen />} />
            <Route path="/product/:id" element={<ProductScreen />} />
            <Route path="/placeorder" element={<PlaceOrderScreen />} />
            <Route path="/orderDetail/:id" element={<OrderScreen />} />
          </Routes>
        </Router>
      </div>
      <Footer/>
    </ThemeProvider>
  );
}

export default App;
