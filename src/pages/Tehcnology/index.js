import React, { useState } from 'react';
import CustomCard from "../../components/customgenerics/CustomCard";
import {Modal, Tooltip} from "antd";
import CustomTable from "../../components/customgenerics/CustomTable";
import { FormOutlined, DeleteOutlined } from '@ant-design/icons';
import TechnologyForm from "../../components/technology/TechnologyForm";
import TechnologyEditModal from "../../components/technology/TechnologyEditModal";
import DeleteResource from "../../components/customgenerics/DeleteResource";

const Technology = () => {
    const [isCreateModalVisible, setCreateModalVisible] = useState(false);
    const [isEditModalVisible, setEditModalVisible] = useState(false);
    const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
    const [currentPet, setCurrentPet] = useState(null);

    const showCreateModal = () => {
        setCreateModalVisible(true);
    };

    const handleEdit = (record) => {
        setCurrentPet(record);
        setEditModalVisible(true);
    };

    const handleDelete = (record) => {
        setCurrentPet(record);
        setDeleteModalVisible(true);
    };

    const handleCancel = () => {
        setCreateModalVisible(false);
        setEditModalVisible(false);
        setDeleteModalVisible(false);
        setCurrentPet(null);
    };

    const categoryLabels = {
        FRONT_END: 'Tecnologias Front-End',
        BACK_END: 'Tecnologias Back-End',
        DATABASE: 'Tecnologias de Banco de Dados',
        QA: 'Garantia de Qualidade',
        UX_UI: 'Experiência do Usuário e Interface do Usuário',
        VERSION_CONTROL: 'Controle de Versão',
        INFRASTRUCTURE_DEPLOY: 'Infraestrutura e Implantação',
        COMMUNICATION_COLLABORATION: 'Comunicação e Colaboração'
    };

    function getCategory(category) {
        return categoryLabels[category] || 'Não definido';
    }

    const technologyColumns = [
        { title: 'Categoria', width: '50%', dataIndex: 'category', key: 'category', align: 'center', render: (category) => getCategory(category) },
        { title: 'Nome', width: '30%', dataIndex: 'name', key: 'name', align: 'center' },
        { title: 'Ações', width: '20%', key: 'actions', align: 'center',
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
                title="Tecnologias"
                extraLink={<a onClick={showCreateModal}>Criar Tecnologia</a>}
                content={
                    <CustomTable
                        endpoint={`${process.env.REACT_APP_SKILL_SCAN_API_URL}/technology/get-all`}
                        columns={technologyColumns}
                    />
                }
            />

            {isCreateModalVisible && (
                <Modal
                    title="Criar Tecnologias"
                    open={isCreateModalVisible}
                    onCancel={handleCancel}
                    footer={null}
                >
                    <TechnologyForm onCancel={handleCancel} onSuccess={() => setCreateModalVisible(false)} />
                </Modal>
            )}

            {isEditModalVisible && (
                <Modal
                    title="Editar Tecnologia"
                    visible={isEditModalVisible}
                    onCancel={handleCancel}
                    footer={null}
                >
                    <TechnologyEditModal data={currentPet} onCancel={handleCancel} onSuccess={() => setEditModalVisible(false)} />
                </Modal>
            )}

            {isDeleteModalVisible && (
                <Modal
                    title="Deletar Tecnologia"
                    visible={isDeleteModalVisible}
                    onCancel={handleCancel}
                    footer={null}
                >
                    <DeleteResource resourceType="api/v1/technology" resourceData={currentPet} onCancel={handleCancel} onSuccess={() => setDeleteModalVisible(false)}/>
                </Modal>
            )}
        </>
    );
}

export default Technology;
