import { Button, Card, Form, Input, message } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/appContext";
import { request } from "../../util/api";

const LoginPage = () => {
    const navigator = useNavigate();
    const [loadBtn, setLoadBtn] = useState(false);
    const {
        appState: { is_login },
        appDispatch,
    } = useContext(AppContext);

    useEffect(() => {
        if (is_login === null) return;
        if (is_login) navigator("/dashboard", { replace: true });
    }, [is_login]);

    const handleLogin = async (value) => {
        setLoadBtn(true);
        try {
            const res = await request.post("auth/login", value);
            setLoadBtn(true);
            if (res.error) {
                message.error(res.message);
            } else {
                window.localStorage.setItem("user", JSON.stringify(res));
                appDispatch({ type: "SET_LOGIN", payload: true });
                navigator("/dashboard");
            }
        } catch (error) {
            console.error(error.message);
        }
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
                            loading={loadBtn}
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
