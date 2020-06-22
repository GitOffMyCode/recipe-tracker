const recipes = [
  {
    id: 1,
    recipeTitle: "Banana Bread",
    slug: "banana-bread",
    chefId: 1,
    categoryId: 4,
  },
  {
    id: 2,
    recipeTitle: "Chocolate Soup",
    slug: "chocolate-soup",
    chefId: 2,
    categoryId: 3,
  },
  {
    id: 3,
    recipeTitle: "Lentil Stew",
    slug: "lentil-stew",
    chefId: 3,
    categoryId: 1,
  },
];

const chefs = [
  { id: 1, chefName: "Genevieve Heald" },
  { id: 2, chefName: "Ada Heald" },
  { id: 3, chefName: "Carl Heald" },
];

const categories = [
  { id: 1, name: "Vegetarian" },
  { id: 2, name: "Starters" },
  { id: 3, name: "Deserts" },
  { id: 4, name: "Baking" },
  { id: 5, name: "Soups" },
];

const newRecipe = {
  id: null,
  recipeTitle: "",
  chefId: null,
  categoryId: null,
};

// Using CommonJS style export so we can consume via Node (without using Babel-node)
module.exports = {
  recipes,
  chefs,
  categories,
  newRecipe,
};
