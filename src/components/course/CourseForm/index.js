import {Button, Form, Input, notification, Select, Space} from "antd";
import axios from "axios";
import React from "react";
import {SelectWithTechnology} from "../SelectWithTechnology";
import UserForm from "../../user/UserForm";


export const CourseForm = ({onCancel, onSuccess}) => {
    const [form] = Form.useForm();

    const handleSubmit = (values) => {
        if (values.technologyId.length === 0) {
            notification.error({
                message: 'Erro',
                description: 'Por favor, cadastre uma tecnologia antes de prosseguir.',
                duration: 3,
            });
            return;
        }

        axios.post('http://localhost:8888/api/v1/course/create', values)
            .then((response) => {
                console.log('Requisição enviada com sucesso', response);
                notification.success({
                    message: 'Sucesso!',
                    description: 'Curso criado com sucesso.',
                    duration: 3,
                });
                form.resetFields();
                onSuccess();
            })
            .catch((error) => {
                console.error('Erro ao enviar a requisição', error);
                notification.error({
                    message: 'Erro',
                    description: 'Houve um erro ao tentar criar o curso.',
                    duration: 3,
                });
            });

    };

    return (
        <div>
            <Form form={form} onFinish={handleSubmit}>

                <SelectWithTechnology/>

                <Form.Item
                    label="Nome do curso"
                    name="name"
                    rules={[
                        {required: true, message: 'Por favor, insira o nome do curso!'},
                        {min: 5, message: 'O nome deve ter pelo menos 5 caracteres!'}
                    ]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="Conteúdo(Link)"
                    name="content"
                    rules={[
                        {required: true, message: 'Por favor, insira o link do curso!'},
                        {min: 5, message: 'O nome deve ter pelo menos 20 caracteres!'}
                    ]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="Palavras-chave"
                    name="keywords"
                    rules={[
                        {required: true, message: 'Por favor, insira o pelo menos uma palavra-chave do curso!'},
                    ]}
                >
                    <Select mode="tags" placeholder="Insira as palavras-chave"/>
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

export default CourseForm;