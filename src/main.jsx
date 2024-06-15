import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle";
import React from "react";
import ReactDOM from "react-dom/client";
import { pdfjs } from "react-pdf";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import "./App.css";
import App from "./App.jsx";
import { TransitionProvider } from "./contexts/TransitionContext";
import { CookiesProvider } from "./contexts/cookiesContext";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const client = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <TransitionProvider>
        <CookiesProvider>
          <QueryClientProvider client={client}>
            <App />
          </QueryClientProvider>
        </CookiesProvider>
      </TransitionProvider>
    </BrowserRouter>
  </React.StrictMode>
);
