import React from 'react';
import { Button, Form, Input, notification, Select, Space } from 'antd';
import axios from "axios";

const categories = [
    { value: 'FRONT_END', label: 'Tecnologias Front-End' },
    { value: 'BACK_END', label: 'Tecnologias Back-End' },
    { value: 'DATABASE', label: 'Tecnologias de Banco de Dados' },
    { value: 'QA', label: 'Garantia de Qualidade' },
    { value: 'UX_UI', label: 'Experiência do Usuário e Interface do Usuário' },
    { value: 'VERSION_CONTROL', label: 'Controle de Versão' },
    { value: 'INFRASTRUCTURE_DEPLOY', label: 'Infraestrutura e Implantação' },
    { value: 'COMMUNICATION_COLLABORATION', label: 'Comunicação e Colaboração' }
];

const TechnologyForm = ({onCancel, onSuccess}) => {
    const [form] = Form.useForm();

    const handleSubmit = (values) => {
        console.log("Values:", values)
        axios.post(`${process.env.REACT_APP_SKILL_SCAN_API_URL}/technology/create`, values)
            .then((response) => {
                console.log('Requisição enviada com sucesso', response);
                notification.success({
                    message: 'Sucesso!',
                    description: 'Tecnologia criada com sucesso.',
                    duration: 3,
                });
                form.resetFields();
                onSuccess();
            })
            .catch((error) => {
                console.error('Erro ao enviar a requisição', error);
                notification.error({
                    message: 'Erro',
                    description: 'Houve um erro ao tentar criar a tecnologia.',
                    duration: 3,
                });
            });

    };

    return (
        <div>
            <Form form={form} onFinish={handleSubmit}>
                <Form.Item
                    label="Categoria"
                    name="category"
                    rules={[
                        {required: true, message: 'Por favor, selecione a categoria!'}
                    ]}
                >
                    <Select placeholder="Selecione a categoria">
                        {categories.map(category => (
                            <Select.Option key={category.value} value={category.value}>
                                {category.label}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Nome"
                    name="name"
                    rules={[
                        {required: true, message: 'Por favor, insira o nome da tecnologia!'},
                        {min: 1, message: 'O nome deve ter pelo menos 2 caracteres!'}
                    ]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <Space>
                        <Button onClick={onCancel}>Cancelar</Button>
                        <Button type="primary" htmlType="submit"
                                style={{backgroundColor: '#001529', borderColor: '#001529'}}>
                            Criar
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </div>
    );
};

export default TechnologyForm;