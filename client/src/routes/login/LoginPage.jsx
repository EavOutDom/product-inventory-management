import { Button, Card, Form, Input } from "antd";
import React from "react";

const LoginPage = () => {
    const handleLogin = (value) => {};

    return (
        <div
            className="content_center"
            style={{ height: "100vh", width: "100%" }}
        >
            <Card>
                <h1>Product management</h1>
                <Form
                    colon={false}
                    labelCol={{ span: 24 }}
                    onFinish={handleLogin}
                >
                    <Form.Item label={<p>Username</p>} name="username">
                        <Input />
                    </Form.Item>
                    <Form.Item label={<p>Password</p>} name="password">
                        <Input.Password />
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType="submit" type="primary" block>
                            Login
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default LoginPage;
