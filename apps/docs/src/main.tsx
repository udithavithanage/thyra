import { StrictMode } from "react";

import { createRoot } from "react-dom/client";

import App from "./App.tsx";

import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

// Remove splash screen after React renders
setTimeout(() => {
  const splashScreen = document.getElementById("splash-screen");
  if (splashScreen) {
    splashScreen.classList.add("fade-out");
    splashScreen.remove();
  }
}, 1000);
