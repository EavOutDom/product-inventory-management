import { Button, Card, Form, Input } from "antd";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/appContext";

const LoginPage = () => {
    const navigator = useNavigate();
    const {
        appState: { is_login },
    } = useContext(AppContext);

    //   useEffect(() => {
    //     if (is_login === null) return;
    //     if (is_login) navigator("/role", { replace: true });
    //   }, [is_login]);

    const handleLogin = (value) => {
        navigator("/product");
    };

    return (
        <div
            className="content_center"
            style={{ height: "100vh", width: "100%" }}
        >
            <Card>
                <h1>Inventory management</h1>
                <Form
                    colon={false}
                    labelCol={{ span: 24 }}
                    onFinish={handleLogin}
                >
                    <Form.Item label={<p>Username</p>} name="username">
                        <Input size="large" />
                    </Form.Item>
                    <Form.Item label={<p>Password</p>} name="password">
                        <Input.Password size="large" />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            htmlType="submit"
                            type="primary"
                            block
                            size="large"
                        >
                            Login
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default LoginPage;
