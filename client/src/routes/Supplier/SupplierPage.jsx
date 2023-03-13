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

const SupplierPage = () => {
    const [form] = Form.useForm();
    const { appDispatch } = useContext(AppContext);
    const [listSuppliers, setListSuppliers] = useState(null);
    const [setTitleLayout] = useOutletContext();
    const [openDrawer, setOpenDrawer] = useState(0);
    const [loadDrawer, setLoadDrawer] = useState(false);
    const [tmpId, setTmpId] = useState(null);
    const [loadBtn, setLoadBtn] = useState(false);

    useEffect(() => {
        setTitleLayout("Supplier");
        handleGetListSuppliers();
    }, []);

    const handleGetListSuppliers = async () => {
        appDispatch({ type: "SET_LOADING", payload: true });
        try {
            const res = await request.get("supplier/getListSuppliers");
            appDispatch({ type: "SET_LOADING", payload: false });
            if (res) {
                setListSuppliers(res.suppliers);
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

    const onClickAddSupplier = () => {
        setOpenDrawer(1);
    };

    const handleEditSupplier = async (id) => {
        setTmpId(id);
        setOpenDrawer(1);
        setLoadDrawer(true);
        try {
            const res = await request.get(`supplier/getSupplier/${id}`);
            setLoadDrawer(false);
            if (res) {
                const { supplier } = res;
                form.setFieldsValue({
                    name: supplier.name,
                    telephone: supplier.telephone,
                    email: supplier.email,
                    address: supplier.address,
                });
            }
        } catch (err) {
            console.error(err.message);
        }
    };

    const handleDeleteSupplier = (id) => {
        Modal.confirm({
            title: "Delete supplier",
            content: "Are you sure you want to delete this supplier?",
            okText: "Yes",
            okType: "danger",
            cancelText: "No",
            onOk: async () => {
                try {
                    const res = await request.delete_api(
                        `supplier/deleteSupplier/${id}`
                    );
                    if (res.error) {
                        message.error(res.message);
                    } else {
                        handleGetListSuppliers();
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
                    "supplier/createSupplier",
                    value
                );
                setLoadBtn(false);
                if (res) {
                    message.success(res.message);
                    handleGetListSuppliers();
                    handleClose();
                }
            } else {
                const res = await request.put(
                    `supplier/updateSupplier/${tmpId}`,
                    value
                );
                setLoadBtn(false);
                if (res) {
                    message.success(res.message);
                    handleGetListSuppliers();
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
                        onClick={() => handleEditSupplier(record.key)}
                        icon={<EditOutlined />}
                    >
                        Edit
                    </Button>
                    <Button
                        danger
                        onClick={() => handleDeleteSupplier(record.key)}
                        icon={<DeleteOutlined />}
                    >
                        Delete
                    </Button>
                </Space>
            ),
        },
    ];

    const dataSource = listSuppliers?.map((cus, index) => {
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

    return (
        <section className="fadeIn">
            <div
                style={{
                    margin: "20px 0",
                }}
                className="flex_between"
            >
                <Button
                    size="large"
                    type="primary"
                    onClick={onClickAddSupplier}
                    icon={<PlusOutlined />}
                >
                    Add new supplier
                </Button>
                <ExportExcel
                    excelData={excelData}
                    file_name="Supplier Report"
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
                                {tmpId ? "Update supplier" : "Add supplier"}
                            </Button>
                        </Form.Item>
                    </Form>
                </Spin>
            </Drawer>
        </section>
    );
};

export default SupplierPage;
