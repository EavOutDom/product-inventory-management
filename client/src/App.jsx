import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Layout } from "antd";

function App() {
    const [count, setCount] = useState(0);

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <h1>Hello h1</h1>
            <h2>Hello h2</h2>
            <h3>Hello h3</h3>
            <h4>Hello h4</h4>
            <h5>Hello h5</h5>
            <h6>Hello h6</h6>
            <div>Hello div</div>
            <span>Hello span</span>
            <p>Hello p</p>
            <Outlet />
        </Layout>
    );
}

export default App;
