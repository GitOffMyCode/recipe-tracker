import React from "react";
import {
  Typography,
  Box,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import PropTypes from "prop-types";

const RecipeForm = ({
  recipe,
  chefs,
  categories,
  errors = {},
  onSave,
  onChange,
  saving = false,
}) => {
  return (
    <form onSubmit={onSave}>
      <Box my={2}>
        <Typography variant="h3">
          {recipe.id ? "Edit" : "Add"} recipe
        </Typography>
      </Box>
      {errors.onSave && (
        <Alert variant="filled" severity="error">
          {errors.onSave}
        </Alert>
      )}
      {/* ----------- */}
      {/* recipeTitle */}
      {/* ----------- */}
      <Box my={2}>
        <TextField
          name="recipeTitle"
          label="Recipe Title"
          value={recipe.recipeTitle}
          fullWidth
          onChange={onChange}
        />
      </Box>
      {/* client side validation: */}
      {errors.recipeTitle && (
        <Alert variant="filled" severity="error">
          {errors.recipeTitle}
        </Alert>
      )}
      {/* ----------- */}
      {/*    chefId   */}
      {/* ----------- */}
      <Box my={5}>
        <InputLabel id="chef">select chef:</InputLabel>
        <Select
          name="chefId"
          labelId="chef"
          fullWidth
          value={recipe.chefId || ""}
          onChange={onChange}
        >
          {chefs.map(c => {
            return (
              <MenuItem key={c.id} value={c.id}>
                {c.chefName}
              </MenuItem>
            );
          })}
        </Select>
      </Box>
      {/* client side validation: */}
      {errors.chefId && (
        <Alert variant="filled" severity="error">
          {errors.chefId}
        </Alert>
      )}
      {/* ----------- */}
      {/* categoryId  */}
      {/* ----------- */}
      <Box my={2}>
        <InputLabel id="category">select category:</InputLabel>
        <Select
          name="categoryId"
          labelId="category"
          fullWidth
          value={recipe.categoryId || ""}
          onChange={onChange}
        >
          {categories.map(c => {
            return (
              <MenuItem key={c.id} value={c.id}>
                {c.name}
              </MenuItem>
            );
          })}
        </Select>
      </Box>
      {/* client side validation: */}
      {errors.categoryId && (
        <Alert variant="filled" severity="error">
          {errors.categoryId}
        </Alert>
      )}
      {/*  */}
      {/*  */}
      {/*  */}
      <Box my={2}>
        <Button
          variant="outlined"
          color="primary"
          value="save"
          type="submit"
          disabled={saving}
        >
          {saving ? "Saving..." : "save"}
        </Button>
      </Box>
    </form>
  );
};

RecipeForm.propTypes = {
  recipe: PropTypes.object.isRequired,
  chefs: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
  errors: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  saving: PropTypes.bool,
};

export default RecipeForm;
