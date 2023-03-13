import { useContext, useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Image, Layout, Menu, Space, Tooltip } from "antd";
import styles from "./App.module.css";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BiCategory, BiChevronDown, BiHomeAlt } from "react-icons/bi";
import { AppContext } from "./context/appContext";
import { IoMdLogOut } from "react-icons/io";
import { BsPeopleFill } from "react-icons/bs";
import { FaPeopleCarry } from "react-icons/fa";
import { RiUserSettingsLine } from "react-icons/ri";

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
        <Link to="/dashboard">Dashboard</Link>,
        "/dashboard",
        <BiHomeAlt />
    ),
    getItem(
        <Link to="/product">Product</Link>,
        "/product",
        <AiOutlineShoppingCart />
    ),
    getItem(<Link to="/category">Category</Link>, "/category", <BiCategory />),
    getItem(
        <Link to="/customer">Customer</Link>,
        "/customer",
        <BsPeopleFill />
    ),
    getItem(
        <Link to="/supplier">Supplier</Link>,
        "/supplier",
        <FaPeopleCarry />
    ),
    getItem(
        <Link to="/user">User System</Link>,
        "/user",
        <RiUserSettingsLine />
    ),
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

    const { user } = JSON.parse(localStorage.getItem("user")) || {};

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
                    zIndex: 9,
                }}
                collapsible
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}
            >
                <div className={styles.header}>
                    <img src="/logo.svg" alt="logo" width={40} height={40} />
                    <h4
                        style={{
                            opacity: collapsed ? 0 : 1,
                            transition: "all 0.2s ease",
                        }}
                    >
                        Inventory management
                    </h4>
                </div>
                <Menu
                    mode="inline"
                    items={items}
                    style={{
                        width: "100%",
                        marginTop: 60,
                        padding: 4,
                        background: "#f7f9fa",
                    }}
                    defaultSelectedKeys={[location.pathname]}
                    selectedKeys={[location.pathname]}
                />
            </Layout.Sider>
            <Layout.Content
                className={styles.layout_content}
                style={{
                    "--padding-left-width": collapsed ? "80px" : "200px",
                }}
            >
                <div className={styles.layout_content_header}>
                    <h1>{titleLayout}</h1>
                    <Tooltip
                        title={
                            <div className={styles.logout_container}>
                                <div onClick={handleLogout}>
                                    <IoMdLogOut />
                                    <span>Logout</span>
                                </div>
                            </div>
                        }
                        placement="bottomLeft"
                        color="#fff"
                    >
                        <>
                            <Space style={{ cursor: "pointer" }}>
                                <Image src="/user.png" width={40} height={40} />
                                <div>
                                    <p
                                        style={{
                                            fontSize: 18,
                                            fontWeight: 600,
                                        }}
                                    >
                                        {user?.name}
                                    </p>
                                    <p style={{ fontSize: 14, opacity: 0.7 }}>
                                        {user?.email}
                                    </p>
                                </div>
                                <BiChevronDown size={18} />
                            </Space>
                        </>
                    </Tooltip>
                </div>
                <div style={{ padding: 10 }}>
                    <Outlet context={[setTitleLayout]} />
                </div>
            </Layout.Content>
        </Layout>
    );
}

export default App;
