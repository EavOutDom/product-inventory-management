import { Button, Card, Form, Input } from "antd";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/appContext";
import axios from "axios";

const LoginPage = () => {
    const navigator = useNavigate();
    const {
        appState: { is_login },
    } = useContext(AppContext);

    //   useEffect(() => {
    //     if (is_login === null) return;
    //     if (is_login) navigator("/role", { replace: true });
    //   }, [is_login]);

    const handleLogin = async (value) => {
        try {
            const res = await axios.post(
                "http://localhost:8000/api/auth/login",
                value
            );
        } catch (error) {
            console.error(error.message);
        }
        // navigator("/product");
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
                    <Form.Item
                        label={<p>Email</p>}
                        name="email"
                        rules={[
                            { required: true, message: "email is required!" },
                        ]}
                    >
                        <Input size="large" type="email" />
                    </Form.Item>
                    <Form.Item
                        label={<p>Password</p>}
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: "password is required!",
                            },
                        ]}
                    >
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
