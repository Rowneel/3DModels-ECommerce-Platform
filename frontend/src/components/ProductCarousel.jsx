import React, { useEffect } from "react";
import { Carousel, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "./Loader";
import Message from "./Message";
import { fetchTopRatedProducts } from "../redux/slices/productSlice";

function ProductCarousel() {
  const dispatch = useDispatch();
  const topRatedProducts = useSelector((state) => state.product.topRatedProducts)
  const { error, loading, products } = topRatedProducts ;
  // console.log(topRatedProducts)
  
  useEffect(() => {
    dispatch(fetchTopRatedProducts());
  }, [dispatch]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <Carousel pause="hover" interval={5000}>
      {products.map((product) => (
        <Carousel.Item key={product._id}>
          <div className="text-container">
            <Link to={`/product/${product._id}`}>
              <Image src={`http://127.0.0.1:8000${product.image}`} style={{height:"200px"}} alt={product.name}/>
              {/* <Carousel.Caption>
                <h4>{product.name} (Rs.{product.price})</h4>
              </Carousel.Caption> */}
            </Link>
            <div className="styled-text">
              <h1>TOP PRODUCTS</h1>
            </div>
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default ProductCarousel;