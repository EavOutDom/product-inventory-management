import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Layout } from "antd";

function App() {
    const [count, setCount] = useState(0);

    return (
        <Layout>
            <div>Hello</div>
            <Outlet />
        </Layout>
    );
}

export default App;
