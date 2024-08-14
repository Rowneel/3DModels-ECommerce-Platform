import React from "react";
import { Link } from "react-router-dom";
import { Card, CardActionArea, CardContent, CardMedia, Paper, Typography } from "@mui/material";
import Rating from "./Rating";

function Product({ product }) {
  return (
    <Paper sx={{width: 250, margin: "5px"}} elevation={6}>
      <CardActionArea component={Link} to={`/product/${product._id}`}>
        <CardMedia
          component="img"
          sx={{ objectFit: "cover", height: 200, borderRadius:"4px"}}
          image={`http://127.0.0.1:8000${product.image}`}
          alt={product.name}
        />
        <CardContent style={{textAlign:"center", backgroundColor:"#252525"}}>
          <Typography variant="h6" component="div">
            {product.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{display:'flex',flexDirection:"column", alignItems:'center' }} component="div">
            <Rating 
              value={product.rating}
              text={`${product.numReviews} reviews`}
              color="#f8e825"
            />
          </Typography>
          <Typography variant="h6" component="div">
            Rs.{product.price}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Paper>
  );
}

export default Product;