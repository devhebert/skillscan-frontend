import { Alert, Button, Form, notification, Space } from "antd";
import React, { useState } from "react";
import axios from "axios";

const DeleteResource = ({ resourceType, resourceData, onCancel, onSuccess }) => {
    const [form] = Form.useForm();

    const handleSubmit = (values) => {
        axios
            .delete(`http://localhost:8888/${resourceType}/${resourceData.id}`, values)
            .then((response) => {
                console.log('Requisição enviada com sucesso', response);
                notification.success({
                    message: 'Sucesso!',
                    description: `O ${resourceData.username ? resourceData.username : resourceData.name} foi excluído com sucesso.`,
                    duration: 3,
                });
                onSuccess();
            })
            .catch((error) => {
                console.error('Erro ao enviar a requisição', error);
                notification.error({
                    message: 'Erro',
                    description: `Houve um erro ao tentar excluir o ${resourceType}.`,
                    duration: 3,
                });
            });
    };

    return (
        <div>
            <Form form={form} onFinish={handleSubmit}>
                <span>Você realmente deseja excluir <b>{resourceData.username ? resourceData.username : resourceData.name}</b>?</span>

                <Form.Item style={{ display: 'flex', justifyContent: 'flex-start' }}>
                    <Space>
                        <Button onClick={onCancel}>Cancelar</Button>
                        <Button type="primary" htmlType="submit" style={{ backgroundColor: '#001529', borderColor: '#001529' }}>
                            Excluir
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </div>
    );
}

export default DeleteResource;
