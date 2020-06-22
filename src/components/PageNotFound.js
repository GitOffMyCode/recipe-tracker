import React from "react";
import { Container, Box, Typography } from "@material-ui/core";

const PageNotFound = () => {
  return (
    <div>
      <Container>
        <Box my={2}>
          <Typography variant="h3">Oops! Page Not Found</Typography>
        </Box>
      </Container>
    </div>
  );
};

export default PageNotFound;
