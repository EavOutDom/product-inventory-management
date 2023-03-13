import React, { useContext, useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { AppContext } from "../../context/appContext";
import { Button, Table, Space, Modal, Input, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { request } from "../../util/api";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { formatDateClient } from "./../../util/service";

const UserSystemPage = () => {
    const [setTitleLayout] = useOutletContext();
    const { appDispatch } = useContext(AppContext);
    const [listUsers, setListUsers] = useState(null);
    const [openModal, setOpenModal] = useState(0);
    const [input, setInput] = useState({});
    const [loadBtn, setLoadBtn] = useState(false);
    const [tmpId, setTempId] = useState(null);

    useEffect(() => {
        setTitleLayout("User System");
        handleGetListUsers();
    }, []);

    const handleGetListUsers = async () => {
        appDispatch({ type: "SET_LOADING", payload: true });
        try {
            const res = await request.get("user/getListUsers");
            appDispatch({ type: "SET_LOADING", payload: false });
            if (res) {
                setListUsers(await res.users);
            }
        } catch (err) {
            console.error(err.message);
        }
    };

    const onClickAddUsers = () => {
        setOpenModal(1);
    };

    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setInput((pre) => ({
            ...pre,
            [name]: value,
        }));
    };

    const handleCloseModal = () => {
        setOpenModal(0);
        setInput({});
        setTempId(null);
    };

    const handleUpdateUser = (id, name, email) => {
        setOpenModal(1);
        setTempId(id);
        setInput((pre) => ({
            name,
            email,
        }));
    };

    const handleDeleteUser = (id) => {
        Modal.confirm({
            title: "Are you sure?",
            content: "You won't be able to revert this!",
            okText: "Yes",
            okType: "danger",
            cancelText: "No",
            onOk: async () => {
                try {
                    const res = await request.delete_api(
                        `user/deleteUser/${id}`
                    );
                    if (res.error) {
                        message.error(res.message);
                    } else {
                        message.success(res.message);
                        handleGetListUsers();
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
                const res = await request.post("user/createUser", {
                    ...input,
                });
                setLoadBtn(false);
                if (res) {
                    message.success(res.message);
                    handleGetListUsers();
                    handleCloseModal();
                } else if (res.error) {
                    message.error(res.message);
                }
            } else {
                const res = await request.put(`user/updateUser/${tmpId}`, {
                    ...input,
                });
                setLoadBtn(false);
                if (res) {
                    message.success(res.message);
                    handleGetListUsers();
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
            title: "Email",
            dataIndex: "email",
            key: "email",
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
                            handleUpdateUser(
                                record.key,
                                record.name,
                                record.email
                            )
                        }
                        icon={<EditOutlined />}
                    >
                        Edit
                    </Button>
                    <Button
                        danger
                        onClick={() => handleDeleteUser(record.key)}
                        icon={<DeleteOutlined />}
                    >
                        Delete
                    </Button>
                </Space>
            ),
        },
    ];

    const dataSource = listUsers?.map((cate, index) => {
        return {
            key: cate.id,
            no: index + 1,
            name: cate.name,
            email: cate.email,
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
                    onClick={onClickAddUsers}
                    icon={<PlusOutlined />}
                >
                    Add new user
                </Button>
            </div>
            <Table
                dataSource={dataSource}
                columns={columns}
                pagination={false}
                size="small"
            />
            <Modal
                title="Add user"
                open={openModal}
                onCancel={handleCloseModal}
                onOk={handleFinish}
                confirmLoading={loadBtn}
                okText="Save"
                cancelText="Cancel"
            >
                <Space direction="vertical" style={{ width: "100%" }}>
                    <label htmlFor="">Name</label>
                    <Input
                        name="name"
                        value={input.name}
                        onChange={handleChangeInput}
                        placeholder="name..."
                    />
                    <label htmlFor="">Email</label>
                    <Input
                        type="email"
                        name="email"
                        value={input.email}
                        onChange={handleChangeInput}
                        placeholder="email..."
                    />
                    {!tmpId && (
                        <>
                            <label htmlFor="">Password</label>
                            <Input.Password
                                name="password"
                                value={input.password}
                                onChange={handleChangeInput}
                                placeholder="email..."
                            />
                        </>
                    )}
                </Space>
            </Modal>
        </section>
    );
};

export default UserSystemPage;
