import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./app/store.ts";
import { Toaster } from "sonner";
import { ThemeProvider } from "./Components/ThemeProvider";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <Provider store={store}>
      <BrowserRouter><Toaster richColors position="top-right" toastOptions={{ className: "quiz-toast" }} /><App /></BrowserRouter>
    </Provider>
  </ThemeProvider>
);
