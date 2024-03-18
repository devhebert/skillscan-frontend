import {Alert, Button, Form, Input, notification, Select, Space} from "antd";
import axios from "axios";
import React, {useEffect} from "react";

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

const TechnologyEditModal = ({data, onCancel, onSuccess}) => {
    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue({
            name: data.name,
            category: data.category,
        });
    }, [data, form]);

    const handleSubmit = (values) => {
        console.log("values", values)
        axios.put(`${process.env.REACT_APP_SKILL_SCAN_API_URL}/technology/${data.id}`, values)
            .then((response) => {
                console.log('Requisição enviada com sucesso', response);
                notification.success({
                    message: 'Sucesso!',
                    description: 'Tecnologia atualizada com sucesso.',
                    duration: 3,
                });
                onSuccess();
            })
            .catch((error) => {
                console.error('Erro ao enviar a requisição', error);
                notification.error({
                    message: 'Erro',
                    description: error.response.data,
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
                    initialValue={data.name}
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
                            Salvar
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </div>
    );
}

export default TechnologyEditModal;