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
import Category from "./routes/category/Category";
import { ConfigProvider } from "antd";
import AppContextProvider from "./context/appContext";
import Loader from "./components/loader/Loader";

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route
                path="/"
                element={<LoginPage />}
                errorElement={<ErrorPage />}
            >
                <Route path="/login" element={<LoginPage />} />
            </Route>
            <Route errorElement={<ErrorPage />} element={<App />}>
                <Route path="/product" index element={<Product />} />
                <Route path="/category" element={<Category />} />
            </Route>
        </>
    )
);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <AppContextProvider>
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimaryBg: "#000",
                        colorPrimary: "#000",
                    },
                }}
            >
                <Loader />
                <RouterProvider router={router} />
            </ConfigProvider>
        </AppContextProvider>
    </React.StrictMode>
);
