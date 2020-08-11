import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { blueGrey } from "@material-ui/core/colors";

import store from "./store/configureStore";
import App from "./App";

const mountNode = document.getElementById("root");

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: blueGrey,
    // type: "dark",
    background: { default: "#000" },
  },
});

ReactDOM.render(
  <Suspense fallback={<div>Error! Please refresh the page</div>}>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  </Suspense>,
  mountNode
);
