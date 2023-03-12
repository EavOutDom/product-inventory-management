import React, { useContext, useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { request } from "../../util/api";
import {
    Button,
    DatePicker,
    Drawer,
    Form,
    Input,
    Modal,
    Select,
    Space,
    Spin,
    Table,
    message,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { AppContext } from "../../context/appContext";
import {
    DownloadOutlined,
    EditOutlined,
    DeleteOutlined,
} from "@ant-design/icons";
import { currency, discount } from "../../util/service";
import dayjs from "dayjs";
import { formatDateClient } from "./../../util/service";

const opts_percentage = [
    { label: "5%", value: 5 },
    { label: "10%", label: 10 },
    { label: "15%", value: 15 },
    { label: "20%", value: 20 },
    { label: "25%", value: 25 },
    { label: "30%", value: 30 },
    { label: "35%", value: 35 },
    { label: "40%", value: 40 },
    { label: "45%", value: 45 },
    { label: "50%", value: 50 },
    { label: "55%", value: 55 },
    { label: "60%", value: 60 },
    { label: "65%", value: 65 },
    { label: "70%", value: 70 },
    { label: "75%", value: 75 },
    { label: "80%", value: 80 },
    { label: "85%", value: 85 },
    { label: "90%", value: 90 },
    { label: "95%", value: 95 },
    { label: "100%", value: 100 },
];

const Product = () => {
    const [form] = Form.useForm();
    const { appDispatch } = useContext(AppContext);
    const [setTitleLayout] = useOutletContext();
    const [listProducts, setListProducts] = useState(null);
    const [openDrawer, setOpenDrawer] = useState(0);
    const [tmpId, setTmpId] = useState(null);
    const [loadBtn, setLoadBtn] = useState(false);
    const [loadDrawer, setLoadDrawer] = useState(false);

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

    const handleClose = () => {
        setOpenDrawer(0);
        setTmpId(null);
        form.resetFields();
    };

    const handleEditProduct = async (id) => {
        setTmpId(id);
        setOpenDrawer(1);
        setLoadDrawer(true);
        try {
            const res = await request.get(`product/getProduct/${id}`);
            setLoadDrawer(false);
            if (res) {
                const { product } = res;
                form.setFieldsValue({
                    name: product.name,
                    product_qty: product.product_qty,
                    unit_price: product.unit_price,
                    discount: product.discount,
                    start_end_discount: [
                        dayjs(product.start_discount),
                        dayjs(product.end_discount),
                    ],
                });
            }
        } catch (err) {
            console.error(err.message);
        }
    };

    const handleDeleteProduct = (id) => {
        Modal.confirm({
            title: "Delete Product",
            content: "Are you sure you want to delete this product?",
            okText: "Yes",
            okType: "danger",
            cancelText: "No",
            onOk: async () => {
                try {
                    const res = await request.delete_api(
                        `product/deleteProduct/${id}`
                    );
                    if (res.error) {
                        message.error(res.message);
                    } else {
                        handleGetListProducts();
                        message.success(res.message);
                    }
                } catch (err) {
                    console.error(err.message);
                }
            },
        });
    };

    const handleFinish = async (value) => {
        setLoadBtn(true);
        let params = {
            name: value.name,
            category_id: 1,
            product_qty: value.product_qty,
            unit_price: value.unit_price,
            ...(value.discount && { discount: value.discount }),
            ...(value.start_end_discount && {
                start_discount: dayjs(value.start_end_discount[0]).format(
                    "YYYY-MM-DD"
                ),
                end_discount: dayjs(value.start_end_discount[1]).format(
                    "YYYY-MM-DD"
                ),
            }),
        };
        try {
            if (!tmpId) {
                const res = await request.post("product/createProduct", params);
                setLoadBtn(false);
                if (res) {
                    message.success(res.message);
                    handleGetListProducts();
                    handleClose();
                }
            } else {
                const res = await request.put(
                    `product/updateProduct/${tmpId}`,
                    params
                );
                setLoadBtn(false);
                if (res) {
                    message.success(res.message);
                    handleGetListProducts();
                    handleClose();
                }
            }
        } catch (err) {
            console.log(err);
        }
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
                        onClick={() => handleEditProduct(record.key)}
                        icon={<EditOutlined />}
                    >
                        Edit
                    </Button>
                    <Button
                        danger
                        onClick={() => handleDeleteProduct(record.key)}
                        icon={<DeleteOutlined />}
                    >
                        Delete
                    </Button>
                </Space>
            ),
        },
    ];

    const dataSource = listProducts?.map((pro, index) => {
        return {
            key: pro.id,
            no: index + 1,
            name: pro.name,
            product_qty: pro.product_qty,
            category: pro.category,
            unit_price: currency(pro.unit_price),
            discount: currency(pro.unit_price * (pro.discount / 100)),
            start_discount: formatDateClient(pro.start_discount),
            end_discount: formatDateClient(pro.end_discount),
            total_price: pro.total_price,
            discount_percentage: discount(pro.discount),
            total_price: currency(
                pro.unit_price - (pro.unit_price * pro.discount) / 100
            ),
        };
    });

    return (
        <section className="fadeIn">
            <div
                align="right"
                style={{
                    margin: "20px 0",
                }}
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
                size="small"
            />
            <Drawer
                open={openDrawer}
                headerStyle={{ display: "none" }}
                onClose={handleClose}
            >
                <Spin spinning={loadDrawer}>
                    <Form
                        form={form}
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
                                {
                                    required: true,
                                    message: "Please fill in name!",
                                },
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
                            label="Unit price ($)"
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
                        <Form.Item
                            label="Discount Percentage (%)"
                            name="discount"
                        >
                            <Select
                                placeholder="select discount percentage"
                                options={opts_percentage}
                            />
                        </Form.Item>
                        <Form.Item
                            style={{ flex: 1 }}
                            name="start_end_discount"
                            label="Start discount - End discount"
                        >
                            <DatePicker.RangePicker
                                style={{ width: "100%" }}
                                format="DD/MM/YYYY"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button
                                loading={loadBtn}
                                type="primary"
                                htmlType="submit"
                                block
                            >
                                {tmpId ? "Update product" : "Add product"}
                            </Button>
                        </Form.Item>
                    </Form>
                </Spin>
            </Drawer>
        </section>
    );
};

export default Product;
