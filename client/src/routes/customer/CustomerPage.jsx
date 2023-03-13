import {
    Button,
    Drawer,
    Form,
    Input,
    Modal,
    Space,
    Spin,
    Table,
    message,
} from "antd";
import React, { useContext, useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import ExportExcel from "../../components/export/ExportExcel";
import { AppContext } from "../../context/appContext";
import { request } from "../../util/api";
import { useOutletContext } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const CustomerPage = () => {
    const [form] = Form.useForm();
    const { appDispatch } = useContext(AppContext);
    const [listCustomers, setListCustomers] = useState(null);
    const [filterCustomers, setFilterCustomers] = useState(null);
    const [setTitleLayout] = useOutletContext();
    const [openDrawer, setOpenDrawer] = useState(0);
    const [loadDrawer, setLoadDrawer] = useState(false);
    const [tmpId, setTmpId] = useState(null);
    const [loadBtn, setLoadBtn] = useState(false);

    useEffect(() => {
        setTitleLayout("Customer");
        handleGetListCustomers();
    }, []);

    const handleGetListCustomers = async () => {
        appDispatch({ type: "SET_LOADING", payload: true });
        try {
            const res = await request.get("customer/getListCustomers");
            appDispatch({ type: "SET_LOADING", payload: false });
            if (res) {
                setListCustomers(res.customers);
                setFilterCustomers(res.customers);
            }
        } catch (err) {
            console.error(err.message);
        }
    };

    const handleClose = () => {
        setOpenDrawer(0);
        setTmpId(null);
        form.resetFields();
    };

    const onClickAddCustomer = () => {
        setOpenDrawer(1);
    };

    const handleEditCustomer = async (id) => {
        setTmpId(id);
        setOpenDrawer(1);
        setLoadDrawer(true);
        try {
            const res = await request.get(`customer/getCustomer/${id}`);
            setLoadDrawer(false);
            if (res) {
                const { customer } = res;
                form.setFieldsValue({
                    name: customer.name,
                    telephone: customer.telephone,
                    email: customer.email,
                    address: customer.address,
                });
            }
        } catch (err) {
            console.error(err.message);
        }
    };

    const handleDeleteCustomer = (id) => {
        Modal.confirm({
            title: "Delete customer",
            content: "Are you sure you want to delete this customer?",
            okText: "Yes",
            okType: "danger",
            cancelText: "No",
            onOk: async () => {
                try {
                    const res = await request.delete_api(
                        `customer/deleteCustomer/${id}`
                    );
                    if (res.error) {
                        message.error(res.message);
                    } else {
                        handleGetListCustomers();
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
        try {
            if (!tmpId) {
                const res = await request.post(
                    "customer/createCustomer",
                    value
                );
                setLoadBtn(false);
                if (res) {
                    message.success(res.message);
                    handleGetListCustomers();
                    handleClose();
                }
            } else {
                const res = await request.put(
                    `customer/updateCustomer/${tmpId}`,
                    value
                );
                setLoadBtn(false);
                if (res) {
                    message.success(res.message);
                    handleGetListCustomers();
                    handleClose();
                }
            }
        } catch (err) {
            console.error(err);
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
            title: "Telephone",
            dataIndex: "telephone",
            key: "telephone",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Address",
            dataIndex: "address",
            key: "address",
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
                        onClick={() => handleEditCustomer(record.key)}
                        icon={<EditOutlined />}
                    >
                        Edit
                    </Button>
                    <Button
                        danger
                        onClick={() => handleDeleteCustomer(record.key)}
                        icon={<DeleteOutlined />}
                    >
                        Delete
                    </Button>
                </Space>
            ),
        },
    ];

    const dataSource = listCustomers?.map((cus, index) => {
        return {
            key: cus.id,
            no: index + 1,
            name: cus.name,
            telephone: cus.telephone,
            address: cus.address,
            email: cus.email,
        };
    });

    const excelData = dataSource?.map((data) => {
        return {
            No: data.no,
            Name: data.name,
            Telephone: data.telephone,
            Email: data.email,
            Address: data.address,
        };
    });

    const handleFilterProducts = (e) => {
        let value = e.target.value.toLowerCase();
        let result = filterCustomers?.filter((data) => {
            return data.name.toLowerCase().search(value) != -1;
        });
        setListCustomers(result);
    };

    return (
        <section className="fadeIn">
            <div
                style={{
                    margin: "20px 0",
                }}
                className="flex_between"
            >
                <Space size="large">
                    <Button
                        size="large"
                        type="primary"
                        onClick={onClickAddCustomer}
                        icon={<PlusOutlined />}
                    >
                        Add new customer
                    </Button>
                    <Input
                        size="large"
                        placeholder="Search customer..."
                        onChange={handleFilterProducts}
                    />
                </Space>
                <ExportExcel
                    excelData={excelData}
                    file_name="Customer Report"
                />
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
                        colon={false}
                        layout="vertical"
                        onFinish={handleFinish}
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
                            label="Telephone"
                            name="telephone"
                            rules={[
                                {
                                    required: true,
                                    message: "Please fill in telephone!",
                                },
                            ]}
                        >
                            <Input placeholder="telephone..." />
                        </Form.Item>
                        <Form.Item label="Email" name="email">
                            <Input placeholder="email...." type="email" />
                        </Form.Item>
                        <Form.Item
                            label="Address"
                            name="address"
                            rules={[
                                {
                                    required: true,
                                    message: "Please fill in address!",
                                },
                            ]}
                        >
                            <Input.TextArea placeholder="address...." />
                        </Form.Item>
                        <Form.Item>
                            <Button
                                loading={loadBtn}
                                type="primary"
                                htmlType="submit"
                                block
                            >
                                {tmpId ? "Update customer" : "Add customer"}
                            </Button>
                        </Form.Item>
                    </Form>
                </Spin>
            </Drawer>
        </section>
    );
};

export default CustomerPage;
