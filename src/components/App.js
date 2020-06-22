import React from "react";
import { ThemeProvider, createMuiTheme, CssBaseline } from "@material-ui/core";
import { Switch, Route } from "react-router-dom";
import Header from "./common/Header";
import HomePage from "./home/HomePage";
import AboutPage from "./about/AboutPage";
import PageNotFound from "./PageNotFound";
import RecipesPage from "./recipes/RecipesPage";
import ManageRecipePage from "./recipes/ManageRecipePage";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#F7682E",
    },
    secondary: {
      main: "#666666",
    },
  },

  typography: {
    h1: {
      fontSize: 56,
      fontWeight: 200,
      lineHeight: "96px",
    },
    h3: {
      fontSize: 38,
      fontWeight: 200,
      lineHeight: "76px",
    },
    body1: {
      fontSize: "16px",
      fontWeight: 500,
      lineHeight: "16px",
    },
    body2: {
      fontSize: "14px",
      fontWeight: 500,
      lineHeight: "24px",
    },
    button: {
      textTransform: "none",
    },
  },
});

const App = () => {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/about" component={AboutPage} />
          <Route path="/recipes" component={RecipesPage} />
          <Route path="/recipe/:slug" component={ManageRecipePage} />
          <Route path="/recipe" component={ManageRecipePage} />
          <Route component={PageNotFound} />
        </Switch>
      </ThemeProvider>
    </div>
  );
};

export default App;
