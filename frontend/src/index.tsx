import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "styled-components";
import theme from "styles/theme";
import App from "./App";
import { GlobalStyles } from "styles/GlobalStyles";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { store } from "appRedux/store";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
          <App />
        <GlobalStyles />
      </ThemeProvider>
    </BrowserRouter>
  </Provider>
);
