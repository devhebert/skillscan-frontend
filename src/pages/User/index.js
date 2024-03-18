import React, { useState } from 'react';
import CustomCard from "../../components/customgenerics/CustomCard";
import {Modal, Tooltip} from "antd";
import UserForm from "../../components/user/UserForm";
import CustomTable from "../../components/customgenerics/CustomTable";
import { FormOutlined, DeleteOutlined } from '@ant-design/icons';
import UserEditModal from "../../components/user/UserEditModal";
import DeleteResource from "../../components/customgenerics/DeleteResource";

const User = () => {
    const [isCreateModalVisible, setCreateModalVisible] = useState(false);
    const [isEditModalVisible, setEditModalVisible] = useState(false);
    const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    const showCreateModal = () => {
        setCreateModalVisible(true);
    };

    const handleEdit = (record) => {
        setCurrentUser(record);
        setEditModalVisible(true);
    };

    const handleDelete = (record) => {
        setCurrentUser(record);
        setDeleteModalVisible(true);
    };

    const handleCancel = () => {
        setCreateModalVisible(false);
        setEditModalVisible(false);
        setDeleteModalVisible(false);
        setCurrentUser(null);
    };

    const getRole = (role) => {
        if (role === "COMMON") return "Comum";
        if (role === "ADMIN") return "Admistrador";
        return role;
    };

    const getJobTitle = (jobTitle) => {
        switch(jobTitle) {
            case 'FRONT_END_DEVELOPER':
                return 'Desenvolvedor Front-End';
            case 'BACK_END_DEVELOPER':
                return 'Desenvolvedor Back-End';
            case 'FULL_STACK_DEVELOPER':
                return 'Desenvolvedor Full Stack';
            case 'DATABASE_DEVELOPER':
                return 'Desenvolvedor de Banco de Dados';
            case 'QA_DEVELOPER':
                return 'Desenvolvedor QA';
            case 'UX_UI_DESIGNER':
                return 'Designer UX/UI';
            case 'INFRASTRUCTURE_DEPLOY_ENGINEER':
                return 'Engenheiro de Implantação de Infraestrutura';
            case 'PROJECT_MANAGER':
                return 'Gerente de Projeto';
            case 'PRODUCT_OWNER':
                return 'Proprietário do Produto';
            case 'SCRUM_MASTER':
                return 'Scrum Master';
            case 'TECH_LEAD':
                return 'Líder Técnico';
            case 'HR_SPECIALIST':
                return 'Especialista em RH';
            case 'WRITER':
                return 'Escritor';
            case 'SUPPORT':
                return 'Suporte';
            case 'MARKETING_SPECIALIST':
                return 'Especialista em Marketing';
            default:
                return jobTitle;
        }
    };

    const userColumns = [
        { title: 'Usuário', dataIndex: 'username', key: 'username', align: 'center' },
        { title: 'Tipo de usuário', dataIndex: 'role', key: 'role', align: 'center', render: role => getRole(role)},
        { title: 'Tipo de posição', dataIndex: 'jobTitle', key: 'jobTitle', align: 'center', render: jobTitle => getJobTitle(jobTitle)},
        {
            title: 'Ações',
            key: 'actions',
            align: 'center',
            render: (text, record) => (
                <span>
                    <Tooltip title="Editar">
                        <FormOutlined
                            onClick={() => handleEdit(record)}
                            style={{ marginRight: 16, cursor: 'pointer' }}
                        />
                    </Tooltip>
                    <Tooltip title="Excluir">
                        <DeleteOutlined
                            onClick={() => handleDelete(record)}
                            style={{ cursor: 'pointer', color: "red" }}
                        />
                    </Tooltip>
                </span>
            ),
        },
    ];

    return (
        <>
            <CustomCard
                title="Usuários"
                extraLink={<a onClick={showCreateModal}>Criar Usuário</a>}
                content={
                    <CustomTable
                        endpoint='http://localhost:8888/api/v1/user/get-all'
                        columns={userColumns}
                    />
                }
            />

            {isCreateModalVisible && (
                <Modal
                    title="Criar Usuário"
                    visible={isCreateModalVisible}
                    onCancel={handleCancel}
                    footer={null}
                >
                    <UserForm onCancel={handleCancel} onSuccess={() => setCreateModalVisible(false)} />
                </Modal>
            )}

            {isEditModalVisible && (
                <Modal
                    title="Editar Usuário"
                    visible={isEditModalVisible}
                    onCancel={handleCancel}
                    footer={null}
                >
                    <UserEditModal data={currentUser} onCancel={handleCancel} onSuccess={() => setEditModalVisible(false)} />
                </Modal>
            )}

            {isDeleteModalVisible && (
                <Modal
                    title="Deletar Usuário"
                    visible={isDeleteModalVisible}
                    onCancel={handleCancel}
                    footer={null}
                >
                    <DeleteResource resourceType="api/v1/user" resourceData={currentUser} onCancel={handleCancel} onSuccess={() => setDeleteModalVisible(false)}/>
                </Modal>
            )}
        </>
    );
}

export default User;
