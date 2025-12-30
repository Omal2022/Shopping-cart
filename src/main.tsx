import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { ShoppingCartProvider } from "./context/ShoppingCartProvider.tsx";
import { AuthState } from "./context/AuthContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthState>
        <ShoppingCartProvider>
          <App />
        </ShoppingCartProvider>
      </AuthState>
    </BrowserRouter>
  </StrictMode>
);
