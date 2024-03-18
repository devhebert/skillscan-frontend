import {Button, Form, Input, notification, Select, Space} from "antd";
import axios from "axios";
import React, {useEffect} from "react";
import {SelectWithTechnology} from "../SelectWithTechnology";

const CourseEditModal = ({data, onCancel, onSuccess}) => {
    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue({
            name: data.name,
            content: data.content,
            keywords: data.keywords
        });
    }, [data, form]);

    const handleSubmit = (values) => {
        axios.put(`http://localhost:8888/api/v1/course/${data.id}`, values)
            .then((response) => {
                notification.success({
                    message: 'Sucesso!',
                    description: 'Curso atualizado com sucesso.',
                    duration: 3,
                });
                onSuccess();
            })
            .catch((error) => {
                console.error('Erro ao enviar a requisição', error);
                notification.error({
                    message: 'Erro',
                    description: 'Houve um erro ao tentar atualizar o curso.',
                    duration: 3,
                });
            });

    };

    return (
        <div>
            <Form form={form} onFinish={handleSubmit}>

                <SelectWithTechnology initialTechnologyId={data.technologyId} />

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
                            Salvar
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </div>
    );
}

export default CourseEditModal;