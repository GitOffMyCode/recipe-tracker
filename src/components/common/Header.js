import React from "react";
import { Container, Box, Typography, makeStyles } from "@material-ui/core";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles({
  header: {
    paddingTop: "20px",
    backgroundColor: "#3961CB",
    height: "180px",
  },
  link: {
    color: "#ffffff",
    fontSize: "1.3rem",
    textDecoration: "none",
  },
});

const Header = () => {
  const classes = useStyles();
  return (
    <div>
      <Box className={classes.header}>
        <Container>
          <NavLink to="/" exact className={classes.link}>
            <Typography variant="h1" color="primary">
              recipe tracker
            </Typography>
          </NavLink>
          <NavLink to="/" exact className={classes.link}>
            home
          </NavLink>
          {" | "}
          <NavLink to="/about" exact className={classes.link}>
            about
          </NavLink>
          {" | "}
          <NavLink to="/recipes" exact className={classes.link}>
            recipes
          </NavLink>
        </Container>
      </Box>
    </div>
  );
};

export default Header;
