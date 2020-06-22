import React from "react";
import {
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Button,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const RecipeList = ({ recipes, onDeleteClick }) => {
  const classes = useStyles();
  return (
    <div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="h6">Recipe Name</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="h6">Chef</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="h6">Category</Typography>
              </TableCell>
              <TableCell>{/*  */}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* ----------------------------- */}
            {recipes.map(recipe => (
              <TableRow key={recipe.id}>
                <TableCell component="th" scope="row">
                  <Link to={"/recipe/" + recipe.slug}>
                    {recipe.recipeTitle}
                  </Link>
                </TableCell>
                <TableCell align="right">{recipe.chefName}</TableCell>
                <TableCell align="right">{recipe.categoryName}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    onClick={() => onDeleteClick(recipe)}
                  >
                    delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {/* ----------------------------- */}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

RecipeList.propTypes = {
  recipes: PropTypes.array.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
};

export default RecipeList;
