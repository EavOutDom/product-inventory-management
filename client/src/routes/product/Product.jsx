import React, { useContext, useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { request } from "../../util/api";
import {
    Button,
    DatePicker,
    Drawer,
    Form,
    Input,
    Select,
    Space,
    Table,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { AppContext } from "../../context/appContext";
import { DownloadOutlined } from "@ant-design/icons";
import { currency } from "../../util/service";

const Product = () => {
    const { appDispatch } = useContext(AppContext);
    const [setTitleLayout] = useOutletContext();
    const [listProducts, setListProducts] = useState(null);
    const [openDrawer, setOpenDrawer] = useState(0);

    useEffect(() => {
        setTitleLayout("Product");
        handleGetListProducts();
    }, []);

    const handleGetListProducts = async () => {
        appDispatch({ type: "SET_LOADING", payload: true });
        try {
            const res = await request.get("product/getListProducts");
            setListProducts(await res.products);
            appDispatch({ type: "SET_LOADING", payload: false });
        } catch (err) {
            console.error(err.message);
        }
    };

    const onClickAddProduct = () => {
        setOpenDrawer(1);
    };

    const handleCloseDrawer = () => {
        setOpenDrawer(0);
    };

    const handleEditProduct = (id) => {};

    const handleDeleteProduct = (id) => {};

    const handleFinish = async (value) => {
        console.log(value);
    };

    const columns = [
        {
            title: "No",
            dataIndex: "no",
            key: "no",
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Product Qty",
            dataIndex: "product_qty",
            key: "product_qty",
        },
        {
            title: "Category",
            dataIndex: "category",
            key: "category",
        },
        {
            title: "Unit Price",
            dataIndex: "unit_price",
            key: "unit_price",
        },
        {
            title: "Discount",
            dataIndex: "discount",
            key: "discount",
        },
        {
            title: "Discount Percentage",
            dataIndex: "discount_percentage",
            key: "discount_percentage",
        },
        {
            title: "Start Discount",
            dataIndex: "start_discount",
            key: "start_discount",
        },
        {
            title: "End Discount",
            dataIndex: "end_discount",
            key: "end_discount",
        },
        {
            title: "Total Price",
            dataIndex: "total_price",
            key: "total_price",
        },
        {
            title: "Action",
            dataIndex: "action",
            align: "right",
            key: "action",
            render: (text, record) => (
                <Space>
                    <Button
                        style={{ background: "#1677ff", color: "#fff" }}
                        onClick={() => handleEditProduct(record.id)}
                    >
                        Edit
                    </Button>
                    <Button
                        danger
                        onClick={() => handleDeleteProduct(record.id)}
                    >
                        Delete
                    </Button>
                </Space>
            ),
        },
    ];

    const dataSource = listProducts?.map((pro, index) => {
        return {
            key: index + 1,
            no: index + 1,
            name: pro.name,
            product_qty: pro.product_qty,
            category: pro.category,
            unit_price: currency(pro.unit_price),
            discount: currency(pro.discount),
            start_discount: pro.start_discount,
            end_discount: pro.end_discount,
            total_price: pro.total_price,
            discount_percentage:
                (100 * (pro.unit_price - pro.discount)) / pro.unit_price + "%",
            total_price: currency(pro.unit_price - pro.discount),
        };
    });

    return (
        <section className="fadeIn">
            <div
                align="right"
                style={{ margin: "20px 0" }}
                className="flex_between"
            >
                <Button
                    size="large"
                    type="primary"
                    onClick={onClickAddProduct}
                    icon={<PlusOutlined />}
                >
                    Add new product
                </Button>
                <Button size="large" icon={<DownloadOutlined />}>
                    Export excel
                </Button>
            </div>
            <Table
                dataSource={dataSource}
                columns={columns}
                pagination={false}
            />
            <Drawer
                open={openDrawer}
                title={`Add product`}
                onClose={handleCloseDrawer}
            >
                <Form
                    name="basic"
                    className="flex_col"
                    colon={false}
                    layout="vertical"
                    onFinish={handleFinish}
                    style={{ height: "100%" }}
                >
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[
                            { required: true, message: "Please fill in name!" },
                        ]}
                    >
                        <Input placeholder="name..." />
                    </Form.Item>
                    <Form.Item
                        label="Product Quantity"
                        name="product_qty"
                        rules={[
                            {
                                required: true,
                                message: "Please fill in product quantity!",
                            },
                        ]}
                    >
                        <Input placeholder="product qty..." type="number" />
                    </Form.Item>
                    <Form.Item
                        label="Category"
                        name="category"
                        rules={[
                            {
                                required: false,
                                message: "Please fill in category!",
                            },
                        ]}
                    >
                        <Select placeholder="select category..." />
                    </Form.Item>
                    <Form.Item
                        label="Unit price"
                        name="unit_price"
                        rules={[
                            {
                                required: true,
                                message: "Please fill in unit price!",
                            },
                        ]}
                    >
                        <Input placeholder="unit price...." type="number" />
                    </Form.Item>
                    <Form.Item label="Discount" name="discount">
                        <Input placeholder="discount..." type="number" />
                    </Form.Item>
                    <Form.Item
                        style={{ flex: 1 }}
                        name="start_end_discount"
                        label="Start discount - End discount"
                    >
                        <DatePicker.RangePicker style={{ width: "100%" }} />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            Add product
                        </Button>
                    </Form.Item>
                </Form>
            </Drawer>
        </section>
    );
};

export default Product;
