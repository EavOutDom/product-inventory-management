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
import ProductPage from "./routes/product/ProductPage";
import CategoryPage from "./routes/category/CategoryPage";
import { ConfigProvider } from "antd";
import AppContextProvider from "./context/appContext";
import Loader from "./components/loader/Loader";
import CustomerPage from "./routes/customer/CustomerPage";
import SupplierPage from "./routes/Supplier/SupplierPage";
import UserSystemPage from "./routes/user/UserSystemPage";
import DashboardPage from "./routes/dashboard/DashboardPage";

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
                <Route path="/dashboard" index element={<DashboardPage />} />
                <Route path="/product" index element={<ProductPage />} />
                <Route path="/category" element={<CategoryPage />} />
                <Route path="/customer" element={<CustomerPage />} />
                <Route path="/supplier" element={<SupplierPage />} />
                <Route path="/user" element={<UserSystemPage />} />
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
