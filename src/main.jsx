import ReactDOM from "react-dom/client";
import React from "react";

import App from "./routes";
import "./styles/index.css";
import { ThemeProvider } from "./utils/contexts/theme";
import { TokenProvider } from "./utils/contexts/token";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <TokenProvider>
        <App />
      </TokenProvider>
    </ThemeProvider>
  </React.StrictMode>
);
