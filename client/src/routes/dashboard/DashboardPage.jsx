import React, { useContext, useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { AppContext } from "../../context/appContext";
import { request } from "../../util/api";
import { Card, Col, Row } from "antd";
import styles from "./Dashboard.module.css";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BiCategory } from "react-icons/bi";
import { BsPeopleFill } from "react-icons/bs";
import { FaPeopleCarry } from "react-icons/fa";
import { RiUserSettingsLine } from "react-icons/ri";

const DashboardPage = () => {
    const [setTitleLayout] = useOutletContext();
    const { appDispatch } = useContext(AppContext);
    const [dashboard, setDashboard] = useState(null);

    useEffect(() => {
        setTitleLayout("Dashboard");
        handleDashboard();
    }, []);

    const handleDashboard = async () => {
        appDispatch({ type: "SET_LOADING", payload: true });
        try {
            const res = await request.get("dashboard");
            appDispatch({ type: "SET_LOADING", payload: false });
            if (res) {
                setDashboard(await res);
            }
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <section className="fadeIn" style={{ width: "99%" }}>
            <Row gutter={[24, 24]}>
                <Col span={6}>
                    <Link to="/product">
                        <Card
                            style={{
                                background: "#000",
                                color: "#fff",
                            }}
                        >
                            <div className="flex_between items_center">
                                <div>
                                    <h1 className={styles.card_head}>
                                        {dashboard?.products}
                                    </h1>
                                    <p className={styles.card_name}>Products</p>
                                </div>
                                <AiOutlineShoppingCart size={40} />
                            </div>
                        </Card>
                    </Link>
                </Col>
                <Col span={6}>
                    <Link to="/category">
                        <Card
                            style={{
                                background: "#000",
                                color: "#fff",
                            }}
                        >
                            <div className="flex_between items_center">
                                <div>
                                    <h1 className={styles.card_head}>
                                        {dashboard?.categories}
                                    </h1>
                                    <p className={styles.card_name}>
                                        Categories
                                    </p>
                                </div>
                                <BiCategory size={40} />
                            </div>
                        </Card>
                    </Link>
                </Col>
                <Col span={6}>
                    <Link to="/customer">
                        <Card
                            style={{
                                background: "#000",
                                color: "#fff",
                            }}
                        >
                            <div className="flex_between items_center">
                                <div>
                                    <h1 className={styles.card_head}>
                                        {dashboard?.customers}
                                    </h1>
                                    <p className={styles.card_name}>
                                        Customers
                                    </p>
                                </div>
                                <BsPeopleFill size={40} />
                            </div>
                        </Card>
                    </Link>
                </Col>
                <Col span={6}>
                    <Link to="/supplier">
                        <Card
                            style={{
                                background: "#000",
                                color: "#fff",
                            }}
                        >
                            <div className="flex_between items_center">
                                <div>
                                    <h1 className={styles.card_head}>
                                        {dashboard?.suppliers}
                                    </h1>
                                    <p className={styles.card_name}>
                                        Suppliers
                                    </p>
                                </div>
                                <FaPeopleCarry size={40} />
                            </div>
                        </Card>
                    </Link>
                </Col>
                <Col span={6}>
                    <Link to="/user">
                        <Card
                            style={{
                                background: "#000",
                                color: "#fff",
                            }}
                        >
                            <div className="flex_between items_center">
                                <div>
                                    <h1 className={styles.card_head}>
                                        {dashboard?.users}
                                    </h1>
                                    <p className={styles.card_name}>Users</p>
                                </div>
                                <RiUserSettingsLine size={40} />
                            </div>
                        </Card>
                    </Link>
                </Col>
            </Row>
        </section>
    );
};

export default DashboardPage;
