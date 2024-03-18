import CustomCard from "../../components/customgenerics/CustomCard";
import React, {useEffect, useState} from "react";
import {Modal, Tooltip} from "antd";
import {DeleteOutlined, FormOutlined} from "@ant-design/icons";
import CustomTable from "../../components/customgenerics/CustomTable";
import {CourseForm} from "../../components/course/CourseForm";
import axios from "axios";
import CourseEditModal from "../../components/course/CourseEditModal";
import DeleteResource from "../../components/customgenerics/DeleteResource";

export const VetConsultation = () => {
    const [isCreateModalVisible, setCreateModalVisible] = useState(false);
    const [isEditModalVisible, setEditModalVisible] = useState(false);
    const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
    const [currentCourse, setCurrentCourse] = useState(null);
    const [technologyNames, setTechnologyNames] = useState({});

    const showCreateModal = () => {
        setCreateModalVisible(true);
    };

    const handleEdit = (record) => {
        setCurrentCourse(record);
        setEditModalVisible(true);
    };

    const handleDelete = (record) => {
        setCurrentCourse(record);
        setDeleteModalVisible(true);
    };

    const handleCancel = () => {
        setCreateModalVisible(false);
        setEditModalVisible(false);
        setDeleteModalVisible(false);
        setCurrentCourse(null);
    };

    useEffect(() => {
        // Fetch all technology names at once and store them in the state
        axios.get('http://localhost:8888/api/v1/technology/get-all')
            .then(response => {
                const names = {};
                response.data.forEach(tech => {
                    names[tech.id] = tech.name;
                });
                setTechnologyNames(names);
            })
            .catch(error => {
                console.error('Error fetching technology names', error);
            });
    }, []);

    const vetConsultationColumns = [
        {
            title: 'Tecnologia',
            width: '15%',
            ellipsis: true,
            dataIndex: 'technologyId',
            key: 'technologyId',
            align: 'center',
            render: (technologyId) => {
                const technologyName = technologyNames[technologyId] || 'Unknown Technology';
                return <span>{technologyName}</span>;
            }
        },
        {title: 'Nome', width: '15%', ellipsis: true, dataIndex: ['name'], key: ['name'], align: 'center'},
        {title: 'Conteúdo', width: '15%', ellipsis: true, dataIndex: 'content', key: 'content', align: 'center'},
        {
            title: 'Palavras-chave',
            width: '30%',
            ellipsis: true,
            dataIndex: 'keywords',
            key: 'keywords',
            align: 'center',
            render: (keywords) => {
                // Join the keywords array into a string with spaces between each keyword
                return <span>{keywords.join(', ')}</span>;
            }
        },
        {
            title: 'Ações', width: '7.5%', ellipsis: true, key: 'actions', align: 'center',
            render: (text, record) => (
                <span>
                    <Tooltip title="Editar">
                        <FormOutlined
                            onClick={() => handleEdit(record)}
                            style={{marginRight: 16, cursor: 'pointer'}}
                        />
                    </Tooltip>
                    <Tooltip title="Excluir">
                        <DeleteOutlined
                            onClick={() => handleDelete(record)}
                            style={{cursor: 'pointer', color: "red"}}
                        />
                    </Tooltip>
                </span>
            ),
        },
    ];

    return (
        <>
            <CustomCard
                title="Cursos"
                extraLink={<a onClick={showCreateModal}>Criar Curso</a>}
                content={
                    <CustomTable
                        endpoint='http://localhost:8888/api/v1/course/get-all'
                        columns={vetConsultationColumns}
                    />
                }
            />

            {isCreateModalVisible && (
                <Modal
                    title="Criar Curso"
                    open={isCreateModalVisible}
                    onCancel={handleCancel}
                    footer={null}

                >
                    <CourseForm onCancel={handleCancel} onSuccess={() => setCreateModalVisible(false)} />
                </Modal>
            )}

            {isEditModalVisible && (
                <Modal
                    title="Editar Curso"
                    visible={isEditModalVisible}
                    onCancel={handleCancel}
                    footer={null}
                >
                    <CourseEditModal data={currentCourse} onCancel={handleCancel} onSuccess={() => setEditModalVisible(false)} />
                </Modal>
            )}

            ,{isDeleteModalVisible && (
            <Modal
                title="Deletar Usuário"
                visible={isDeleteModalVisible}
                onCancel={handleCancel}
                footer={null}
            >
                <DeleteResource resourceType="api/v1/course" resourceData={currentCourse} onCancel={handleCancel} onSuccess={() => setDeleteModalVisible(false)}/>
            </Modal>
        )}
        </>

    );
}

export default VetConsultation;