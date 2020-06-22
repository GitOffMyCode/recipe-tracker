import React from "react";
import { Container, Box, Typography } from "@material-ui/core";

const AboutPage = () => {
  return (
    <div>
      <Container>
        <Box my={2}>
          <Typography variant="h3">about</Typography>
        </Box>
        <Box my={2}>
          <Typography variant="body1">
            welcome to these wonderful recipes yum yum.
          </Typography>
        </Box>
      </Container>
    </div>
  );
};

export default AboutPage;
