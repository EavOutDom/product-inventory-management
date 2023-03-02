import { useEffect, useState } from "react";
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
  const [titleLayout, setTitleLayout] = useState("");

  useEffect(() => {
    document.title = titleLayout;
  }, [titleLayout]);

  const location = useLocation();
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
        width={280}
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
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
            <Button type="primary" size="large">
              Login
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
