import CustomCard from "../../components/customgenerics/CustomCard";
import React, {useEffect, useState} from "react";
import {Modal, Tooltip} from "antd";
import {DeleteOutlined, FormOutlined} from "@ant-design/icons";
import CustomTable from "../../components/customgenerics/CustomTable";
import DeleteResource from "../../components/customgenerics/DeleteResource";
import {QuestionForm} from "../../components/question/QuestionForm";
import {QuestionEditModal} from "../../components/question/QuestionEditModal";

const Question = () => {
    const [isCreateModalVisible, setCreateModalVisible] = useState(false);
    const [isEditModalVisible, setEditModalVisible] = useState(false);
    const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(null);

    const showCreateModal = () => {
        setCreateModalVisible(true);
    };

    const handleEdit = (record) => {
        setCurrentQuestion(record);
        setEditModalVisible(true);
    };

    const handleDelete = (record) => {
        setCurrentQuestion(record);
        setDeleteModalVisible(true);
    };

    const handleCancel = () => {
        setCreateModalVisible(false);
        setEditModalVisible(false);
        setDeleteModalVisible(false);
        setCurrentQuestion(null);
    };

    const [technologies, setTechnologies] = useState([]);

    useEffect(() => {
        const fetchTechnologies = async () => {
            try {
                const response = await fetch('http://localhost:8888/api/v1/technology/get-all');
                const data = await response.json();
                console.log("Data:", data);
                setTechnologies(data);
            } catch (error) {
                console.error('Failed to fetch technologies:', error);
            }
        };

        fetchTechnologies();
    }, []);

    const questionColumns = [
        {
            title: 'Tecnologia',
            width: '15%',
            dataIndex: 'technologyId',
            key: 'technologyId',
            align: 'center',
            render: (technologyId) => {
                const technology = technologies.find(tech => tech.id === technologyId);
                console.log('Technology:', technology); // Add this line
                return technology ? technology.name : 'N/A';
            }
        },
        {
            title: 'Questão',
            width: '30%',
            dataIndex: 'questionText',
            key: 'questionText',
            align: 'center',
            render: (questionText) => {
                return (
                    <Tooltip title={questionText}>
                    <span style={{ display: 'block', width: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {questionText}
                    </span>
                    </Tooltip>
                );
            }
        },
        {
            title: 'Respostas',
            width: '30%',
            dataIndex: 'answers',
            key: 'answers',
            align: 'center',
            render: (answers) => {
                const answerTexts = answers.map(answer => answer.answerText).join(', ');
                return (
                    <Tooltip title={
                        answers.map(answer =>
                            <div style={{ color: answer.isCorrect ? 'green' : 'white' }}>
                                {answer.answerText}
                            </div>
                        )
                    }>
                        <div style={{ width: '180px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {answerTexts}
                        </div>
                    </Tooltip>
                );
            }
        },
        {
            title: 'Dificuldade',
            width: '15%',
            dataIndex: 'difficulty',
            key: 'difficulty',
            align: 'center',
            render: (difficulty) => {
                switch (difficulty) {
                    case 'ADVANCED':
                        return 'Avançado';
                    case 'INTERMEDIATE':
                        return 'Intermediário';
                    case 'INITIAL':
                        return 'Inicial';
                    default:
                        return difficulty;
                }
            }
        },
        { title: 'Ações',
            width: '30%',
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
                title="Questões"
                extraLink={<a onClick={showCreateModal}>Criar Questão</a>}
                content={
                    <CustomTable
                        endpoint='http://localhost:8888/api/v1/question/get-all'
                        columns={questionColumns}
                    />
                }
            />

            {isCreateModalVisible && (
                <Modal
                    title="Criar Questão"
                    open={isCreateModalVisible}
                    onCancel={handleCancel}
                    footer={null}
                >
                    <QuestionForm onCancel={handleCancel} onSuccess={() => setCreateModalVisible(false)} />
                </Modal>
            )}

            {isEditModalVisible && (
                <Modal
                    title="Editar Questão"
                    open={isEditModalVisible}
                    onCancel={handleCancel}
                    footer={null}
                >
                    <QuestionEditModal data={currentQuestion} onCancel={handleCancel} onSuccess={() => setEditModalVisible(false)} />
                </Modal>
            )}

            {isDeleteModalVisible && (
                <Modal
                    title="Deletar Questão"
                    open={isDeleteModalVisible}
                    onCancel={handleCancel}
                    footer={null}
                >
                    <DeleteResource resourceType="api/v1/question" resourceData={currentQuestion} onCancel={handleCancel} onSuccess={() => setDeleteModalVisible(false)}/>
                </Modal>
            )}
        </>
    );
}

export default Question;