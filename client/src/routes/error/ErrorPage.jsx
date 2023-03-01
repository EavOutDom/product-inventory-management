import { Button } from "antd";
import React from "react";
import { useNavigate, useRouteError } from "react-router-dom";

const ErrorPage = () => {
    const error = useRouteError();
    const navigator = useNavigate();

    const handleGoBack = () => {
        navigator(-1);
    };

    return (
        <div
            style={{ height: "100vh", width: "100%", gap: 10 }}
            className="content_center flex_col"
        >
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
            <Button onClick={handleGoBack} type="primary" size="large">
                Go back
            </Button>
        </div>
    );
};

export default ErrorPage;
