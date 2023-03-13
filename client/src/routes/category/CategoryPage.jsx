import React, { useContext, useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { AppContext } from "../../context/appContext";
import { Button, Table, Space, Modal, Input, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { request } from "../../util/api";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { formatDateClient } from "./../../util/service";

const CategoryPage = () => {
    const [setTitleLayout] = useOutletContext();
    const { appDispatch } = useContext(AppContext);
    const [listCategories, setListCategories] = useState(null);
    const [openModal, setOpenModal] = useState(0);
    const [inputName, setInputName] = useState("");
    const [loadBtn, setLoadBtn] = useState(false);
    const [tmpId, setTempId] = useState(null);

    useEffect(() => {
        setTitleLayout("Category");
        handleGetCategory();
    }, []);

    const handleGetCategory = async () => {
        appDispatch({ type: "SET_LOADING", payload: true });
        try {
            const res = await request.get("category/getListCategories");
            appDispatch({ type: "SET_LOADING", payload: false });
            if (res) {
                setListCategories(await res.categories);
            }
        } catch (err) {
            console.error(err.message);
        }
    };

    const onClickAddCategory = () => {
        setOpenModal(1);
    };

    const handleChangeName = (e) => {
        setInputName(e.target.value);
    };

    const handleCloseModal = () => {
        setOpenModal(0);
        setInputName("");
        setTempId(null);
    };

    const handleUpdateCategory = (id, name) => {
        setOpenModal(1);
        setInputName(name);
        setTempId(id);
    };

    const handleDeleteCategory = (id) => {
        Modal.confirm({
            title: "Are you sure?",
            content: "You won't be able to revert this!",
            okText: "Yes",
            okType: "danger",
            cancelText: "No",
            onOk: async () => {
                try {
                    const res = await request.delete_api(
                        `category/deleteCategory/${id}`
                    );
                    if (res.error) {
                        message.error(res.message);
                    } else {
                        message.success(res.message);
                        handleGetCategory();
                    }
                } catch (err) {
                    console.error(err.message);
                }
            },
        });
    };

    const handleFinish = async () => {
        setLoadBtn(true);
        try {
            if (!tmpId) {
                const res = await request.post("category/createCategory", {
                    name: inputName,
                });
                setLoadBtn(false);
                if (res) {
                    message.success(res.message);
                    handleGetCategory();
                    handleCloseModal();
                } else if (res.error) {
                    message.error(res.message);
                }
            } else {
                const res = await request.put(
                    `category/updateCategory/${tmpId}`,
                    {
                        name: inputName,
                    }
                );
                setLoadBtn(false);
                if (res) {
                    message.success(res.message);
                    handleGetCategory();
                    handleCloseModal();
                } else if (res.error) {
                    message.error(res.message);
                }
            }
        } catch (err) {
            console.error(err.message);
            setLoadBtn(false);
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
            title: "Created at",
            dataIndex: "created_at",
            key: "created_at",
        },
        {
            title: "Updated at",
            dataIndex: "updated_at",
            key: "updated_at",
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
                        onClick={() =>
                            handleUpdateCategory(record.key, record.name)
                        }
                        icon={<EditOutlined />}
                    >
                        Edit
                    </Button>
                    <Button
                        danger
                        onClick={() => handleDeleteCategory(record.key)}
                        icon={<DeleteOutlined />}
                    >
                        Delete
                    </Button>
                </Space>
            ),
        },
    ];

    const dataSource = listCategories?.map((cate, index) => {
        return {
            key: cate.id,
            no: index + 1,
            name: cate.name,
            created_at: formatDateClient(cate.created_at),
            updated_at: formatDateClient(cate.updated_at),
        };
    });

    return (
        <section className="fadeIn">
            <div
                align="left"
                style={{
                    margin: "20px 0",
                }}
                className="flex_between"
            >
                <Button
                    size="large"
                    type="primary"
                    onClick={onClickAddCategory}
                    icon={<PlusOutlined />}
                >
                    Add new category
                </Button>
            </div>
            <Table
                dataSource={dataSource}
                columns={columns}
                pagination={false}
                size="small"
                onChange={(d) => console.log(d)}
            />
            <Modal
                title="Add category"
                open={openModal}
                onCancel={handleCloseModal}
                onOk={handleFinish}
                confirmLoading={loadBtn}
                okText="Save"
                cancelText="Cancel"
            >
                <label htmlFor="">Name</label>
                <Input
                    value={inputName}
                    onChange={handleChangeName}
                    placeholder="name..."
                />
            </Modal>
        </section>
    );
};

export default CategoryPage;
