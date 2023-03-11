import { useContext, useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Button, Layout, Menu } from "antd";
import styles from "./App.module.css";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BiCategory } from "react-icons/bi";
import { AppContext } from "./context/appContext";

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
    const navigator = useNavigate();
    const location = useLocation();
    const {
        appState: { is_login },
        appDispatch,
    } = useContext(AppContext);
    const [collapsed, setCollapsed] = useState(false);
    const [titleLayout, setTitleLayout] = useState("");

    useEffect(() => {
        document.title = titleLayout;
    }, [titleLayout]);

    useEffect(() => {
        if (is_login === null) return;
        if (!is_login) {
            navigator("/", { replace: true });
            appDispatch({ type: "SET_LOADING", payload: false });
        }
        const handleLocalStorageChange = () => {
            if (is_login) {
                appDispatch({ type: "SET_LOGIN", payload: false });
                navigator("/", { replace: true });
            }
        };
        window.addEventListener("storage", handleLocalStorageChange);
        return () =>
            window.removeEventListener("storage", handleLocalStorageChange);
    }, [is_login]);

    const handleLogout = () => {
        navigator("/");
        window.localStorage.removeItem("user");
        appDispatch({ type: "SET_LOGIN", payload: false });
    };

    return (
        <Layout style={{ height: "100vh", maxHeight: "100vh" }}>
            <Layout.Sider
                style={{
                    background: "#f7f9fa",
                    height: "100vh",
                    position: "fixed",
                    left: 0,
                    top: 0,
                    bottom: 0,
                    borderRight: "1px solid #bbb",
                }}
                width={300}
                collapsible
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}
            >
                <div className={styles.header}>
                    <img src="/logo.svg" alt="logo" width={40} height={40} />
                    <h1
                        style={{
                            opacity: collapsed ? 0 : 1,
                            transition: "all 0.2s ease",
                        }}
                    >
                        Inventory management
                    </h1>
                </div>
                <Menu
                    mode="inline"
                    items={items}
                    style={{
                        width: "100%",
                        marginTop: 30,
                        padding: 4,
                        background: "#f7f9fa",
                    }}
                    defaultSelectedKeys={[location.pathname]}
                />
            </Layout.Sider>
            <Layout.Content
                className={styles.layout_content}
                style={{
                    "--padding-left-width": collapsed ? "80px" : "280px",
                }}
            >
                <div className={styles.layout_content_header}>
                    <h1>{titleLayout}</h1>
                    <div>
                        <Button
                            type="primary"
                            size="large"
                            onClick={handleLogout}
                        >
                            Logout
                        </Button>
                    </div>
                </div>
                <div style={{ padding: "0 30px 30px" }}>
                    <Outlet context={[setTitleLayout]} />
                </div>
            </Layout.Content>
        </Layout>
    );
}

export default App;
