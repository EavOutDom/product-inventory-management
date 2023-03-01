import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Button, ConfigProvider, Layout, Menu } from "antd";
import styles from "./App.module.css";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BiCategory } from "react-icons/bi";

function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}
const items = [
    getItem(
        <Link to="/product">Product</Link>,
        "/product",
        <AiOutlineShoppingCart />
    ),
    getItem(<Link to="/category">Category</Link>, "/category", <BiCategory />),
];

function App() {
    const [collapsed, setCollapsed] = useState(false);
    const location = useLocation();
    return (
            <Layout style={{ minHeight: "100vh" }}>
                <Layout.Sider
                    style={{
                        background: "#fff",
                        height: "100vh",
                        position: "fixed",
                        left: 0,
                        top: 0,
                        bottom: 0,
                        borderRight: "1px solid #bbb",
                    }}
                    width={280}
                    collapsible
                    collapsed={collapsed}
                    onCollapse={(value) => setCollapsed(value)}
                >
                    <div style={{ padding: 8 }}>
                        <h1
                            style={{
                                opacity: collapsed ? 0 : 1,
                                transition: "all 0.2s ease",
                            }}
                            className={styles.header}
                        >
                            Product management
                        </h1>
                        <Menu
                            mode="inline"
                            items={items}
                            style={{ width: "100%", marginTop: 30 }}
                            defaultSelectedKeys={[location.pathname]}
                        />
                    </div>
                </Layout.Sider>
                <Layout.Content
                    className={styles.layout_content}
                    style={{
                        "--padding-left-width": collapsed ? "80px" : "280px",
                    }}
                >
                    <div className={styles.layout_content_header}>
                        <h1>Product</h1>
                        <div>
                            <Button type="primary" size="large">
                                Login
                            </Button>
                        </div>
                    </div>
                    <Outlet />
                </Layout.Content>
            </Layout>
    );
}

export default App;
