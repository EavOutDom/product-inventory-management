import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
} from "react-router-dom";
import App from "./App";
import LoginPage from "./routes/login/LoginPage";
import ErrorPage from "./routes/error/ErrorPage";
import Product from "./routes/product/Product";

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route errorElement={<ErrorPage />}>
                <Route path="/" index element={<LoginPage />} />
            </Route>
            <Route errorElement={<ErrorPage />} element={<App />}>
                <Route path="/product" index element={<Product />} />
            </Route>
        </>
    )
);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
