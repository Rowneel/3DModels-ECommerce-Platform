import { Breadcrumbs, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";

export default function CheckoutSteps({ step1, step2, step3 }) {
  const linkStyle = {
    display: "flex",
    color: "#C0C0C0", // Use your desired color for inactive links
    textDecoration: "none",
  };

  const activeLinkStyle = {
    color: "white", // Use your primary color for active links
    textShadow: "0 0 5px white",
  };

  return (
    <Breadcrumbs separator="›" aria-label="breadcrumbs">
      <Link to="/login" style={{ ...linkStyle, ...(step1 && activeLinkStyle) }}>
        {step1 ? "Login" : "Login (Incomplete)"}
      </Link>
      <Link
        to="/payment"
        style={{ ...linkStyle, ...(step2 && activeLinkStyle) }}
      >
        {step2 ? "Payment Option" : "Payment Option (Incomplete)"}
      </Link>

      <Typography
        color={step3 ? "textPrimary" : "textSecondary"}
        style={{ ...linkStyle, ...(step3 && activeLinkStyle) }}
      >
        {step3 ? "Place Order" : "Place Order (Incomplete)"}
      </Typography>
    </Breadcrumbs>
  );
}
