import React from "react";
import { Typography, Button, Box, Container } from "@material-ui/core";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      <Container>
        <Box my={2}>
          <Typography variant="h3">home</Typography>
        </Box>

        <Box my={2}>
          <Button variant="outlined" color="primary" size="large">
            <Link to="about" style={{ textDecoration: "none", color: "#000" }}>
              find out more
            </Link>
          </Button>
        </Box>
      </Container>
    </div>
  );
};

export default HomePage;
