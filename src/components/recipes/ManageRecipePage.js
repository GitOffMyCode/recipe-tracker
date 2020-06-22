import React, { useEffect, useState } from "react";
import { Container, Box, Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { connect } from "react-redux";
import { loadRecipes, saveRecipe } from "../../redux/actions/recipeActions";
import { loadChefs } from "../../redux/actions/chefActions";
import { loadCategories } from "../../redux/actions/categoryActions";
import PropTypes from "prop-types";
import RecipeForm from "./RecipeForm";
import { newRecipe } from "../../../tools/mockData";
import Spinner from "../common/Spinner";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function ManageRecipePage({
  recipes,
  chefs,
  categories,
  loadRecipes,
  loadChefs,
  loadCategories,
  saveRecipe,
  history,
  ...props // rest operator - allows us to access props.recipe
}) {
  const [recipe, setRecipe] = useState({ ...props.recipe });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (recipes.length === 0) {
      loadRecipes().catch(error => {
        alert("loading recipes failed" + error);
      });
    } else {
      setRecipe({ ...props.recipe });
    }

    if (chefs.length === 0) {
      loadChefs().catch(error => {
        alert("loading chefs failed" + error);
      });
    }

    if (categories.length === 0) {
      loadCategories().catch(error => {
        alert("loading categories failed" + error);
      });
    }
  }, [props.recipe]);

  const handleChange = event => {
    const { name, value } = event.target;
    setRecipe(prevRecipe => ({
      ...prevRecipe,
      [name]:
        name === "chefId" || name === "categoryId"
          ? parseInt(value, 10)
          : value,
    }));
  };

  function formIsValid() {
    const { recipeTitle, chefId, categoryId } = recipe;
    const errors = {};

    if (!recipeTitle) errors.recipeTitle = "Title is required.";
    if (!chefId) errors.chefId = "Chef is required.";
    if (!categoryId) errors.categoryId = "Category is required.";

    setErrors(errors);
    // form is valid if errors object has no properties
    return Object.keys(errors).length === 0;
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  function handleSave(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    setSaving(true);
    setOpen(true); // Snackbar - success alert
    saveRecipe(recipe)
      .then(() => {
        history.push("/recipes");
      })
      .catch(error => {
        setSaving(false);
        // setting an onSave property on the errors object:
        setErrors({ onSave: error.message });
      });
  }

  return recipes.length === 0 ||
    chefs.length === 0 ||
    categories.length === 0 ? (
    <Container>
      <Box my={2}>
        <Spinner />
      </Box>
    </Container>
  ) : (
    <Container>
      <RecipeForm
        recipe={recipe}
        chefs={chefs}
        categories={categories}
        errors={errors}
        onChange={handleChange}
        onSave={handleSave}
        saving={saving}
      />
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Recipe saved
        </Alert>
      </Snackbar>
    </Container>
  );
}

ManageRecipePage.propTypes = {
  recipe: PropTypes.object.isRequired,
  recipes: PropTypes.array.isRequired,
  chefs: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
  loadRecipes: PropTypes.func.isRequired,
  loadChefs: PropTypes.func.isRequired,
  loadCategories: PropTypes.func.isRequired,
  saveRecipe: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

// THIS IS A SELECTOR
export function getRecipeBySlug(recipes, slug) {
  return recipes.find(recipe => recipe.slug === slug) || null;
}

function mapStateToProps(state, ownProps) {
  const slug = ownProps.match.params.slug;
  const recipe =
    slug && state.recipes.length > 0
      ? getRecipeBySlug(state.recipes, slug)
      : newRecipe;
  return {
    recipe,
    recipes: state.recipes,
    chefs: state.chefs,
    categories: state.categories,
  };
}

const mapDispatchToProps = {
  loadRecipes,
  loadChefs,
  loadCategories,
  saveRecipe,
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageRecipePage);
