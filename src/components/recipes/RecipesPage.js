import React, { useEffect, useState } from "react";
import {
  Container,
  Box,
  Typography,
  Button,
  Snackbar,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { connect } from "react-redux";
import * as recipeActions from "../../redux/actions/recipeActions";
import * as chefActions from "../../redux/actions/chefActions";
import * as categoryActions from "../../redux/actions/categoryActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import RecipeList from "./RecipeList";
import { Redirect } from "react-router-dom";
import Spinner from "../common/Spinner";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const RecipesPage = props => {
  const [redirectToAddRecipePage, setRedirectToAddRecipePage] = useState(false);
  const [open, setOpen] = useState(false);

  // when the component first mounts this hook will LOAD THE DATA via the ACTIONS mapped in mapDispatchToProps
  useEffect(() => {
    props.actions.loadRecipes().catch(error => {
      alert("loading recipes failed" + error);
    });

    props.actions.loadChefs().catch(error => {
      alert("loading chefs failed" + error);
    });

    props.actions.loadCategories().catch(error => {
      alert("loading categories failed" + error);
    });
  }, []);

  // original verion of handleDeleteRecipe:
  // const handleDeleteRecipe = recipe => {
  //   setOpen(true); // Snackbar - success alert
  //   props.actions.deleteRecipe(recipe).catch(error => console.log(error));
  // };

  // async await version of handleDeleteRecipe:
  const handleDeleteRecipe = async recipe => {
    setOpen(true); // Snackbar - success alert
    try {
      await props.actions
        .deleteRecipe(recipe)
        .catch(error => console.log(error));
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <Container>
      {redirectToAddRecipePage && <Redirect to="/recipe" />}
      <Box my={2}>
        <Typography variant="h3">recipes</Typography>
      </Box>

      {props.loading ? (
        <Spinner />
      ) : (
        <>
          <Box my={2}>
            <Button
              variant="outlined"
              color="primary"
              size="large"
              onClick={() => setRedirectToAddRecipePage(true)}
            >
              add a recipe
            </Button>
          </Box>
          <RecipeList
            recipes={props.recipes}
            onDeleteClick={handleDeleteRecipe}
          />
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="info">
              Recipe deleted
            </Alert>
          </Snackbar>
        </>
      )}
    </Container>
  );
};

// PropTypes tells the component what data type is expected for each prop. Also a handy ref list of props.
RecipesPage.propTypes = {
  recipes: PropTypes.array.isRequired,
  chefs: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
};

// passes STATE to the component - could be all state or just bits of it. This is the place to filter or shape it.
const mapStateToProps = state => {
  return {
    recipes:
      state.chefs.length === 0 || state.categories.length === 0
        ? []
        : state.recipes.map(recipe => {
            return {
              ...recipe,
              chefName: state.chefs.find(c => c.id === recipe.chefId).chefName,
              categoryName: state.categories.find(
                c => c.id === recipe.categoryId
              ).name,
            };
          }),
    chefs: state.chefs,
    categories: state.categories,
    loading: state.apiCallsInProgress > 0,
  };
};

// passes ACTIONS to the component
const mapDispatchToProps = dispatch => {
  return {
    actions: {
      loadRecipes: bindActionCreators(recipeActions.loadRecipes, dispatch),
      loadChefs: bindActionCreators(chefActions.loadChefs, dispatch),
      loadCategories: bindActionCreators(
        categoryActions.loadCategories,
        dispatch
      ),
      deleteRecipe: bindActionCreators(recipeActions.deleteRecipe, dispatch),
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RecipesPage);
// The connect() function connects the component to the Redux store...
// providing the state and the functions it can use to dispatch actions to the store.
