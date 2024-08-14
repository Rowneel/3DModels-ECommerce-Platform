import React from "react";
import { Container, Grid, Typography } from "@mui/material";

function Footer() {
  return (
    <footer>
      <Container>
        <Grid container justifyContent="center">
          <Grid item>
            <Typography variant="body1" color="textSecondary" align="center">
              Copyright &copy; CreativeAayam
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
}

export default Footer;