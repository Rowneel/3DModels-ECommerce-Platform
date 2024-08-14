import React, { useEffect } from "react";
import { Row, Col, Container, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import ProductCarousel from "../components/ProductCarousel";
import { fetchProductList } from "../redux/slices/productSlice";
import Paginate from "../components/Paginate";
import { useParams } from "react-router-dom";
import { useNavigate, Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Typography } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
  typography: {
    poster: {
      fontSize: "3rem",
      color: "orange",
    },
    // Disable h3 variant
    h3: undefined,
  },
  components: {
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          // Map the new variant to render a <h1> by default
          poster: "h1",
        },
      },
    },
  },
});

function HomeScreen() {
  let navigate = useNavigate();
  let location = useLocation();
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.product.productList);
  console.log(productList);
  // const topRatedProducts = useSelector((state) => state.product.topRatedProducts);
  const { products, loading, error, page, pages } = productList;
  const { pageNumber } = useParams();

  // const { products: topProducts, loading: topLoading, error: topError } = topRatedProducts;
  // console.log(productList)
  let keyword = location.search;
  console.log(location.search);
  useEffect(() => {
    dispatch(fetchProductList(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <Container>
      {!keyword && (
        <Row style={{ backgroundColor: "#120e1f" }}>
          {/* <div style={{ fontWeight: "bold", fontSize: "25px", color: "white", fontFamily: "MozAnimationDelay" }}>TOP-RATED PRODUCTS</div> */}
          <ProductCarousel />
        </Row>
      )}
      <Row>
        <div className="product-area section">
          {!keyword && (
            <div className="section-title">
              <h2>Trending Item</h2>
            </div>
          )}
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <div>
              <Row>
                {products.map((product) => (
                  <Col
                    key={product._id}
                    sm={6}
                    md={4}
                    lg={3}
                    xl={3}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginBottom: 10,
                    }}
                  >
                    <Product product={product} />
                  </Col>
                ))}
              </Row>
            </div>
          )}
          <div className="d-flex justify-content-center">
            <Paginate page={page} pages={pages} keyword={keyword} />
          </div>
        </div>
      </Row>
    </Container>
  );
}

export default HomeScreen;

//  <Paginate page={page} pages={pages} keyword={keyword} />
