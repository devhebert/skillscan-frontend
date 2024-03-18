import {Alert, Button, Form, Input, notification, Select, Space} from "antd";
import axios from "axios";
import React, {useEffect} from "react";

const UserEditModal = ({data, onCancel, onSuccess}) => {
    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue({
            username: data.username,
            password: data.password,
            userType: data.role,
            jobTitle: data.jobTitle
        });
    }, [data, form]);

    const handleSubmit = (values) => {
        console.log("values", values)
        axios.put(`http://localhost:8888/api/v1/user/${data.id}`, values)
            .then((response) => {
                console.log('Requisição enviada com sucesso', response);
                notification.success({
                    message: 'Sucesso!',
                    description: 'Usuário atualizado com sucesso.',
                    duration: 3,
                });
                onSuccess();
            })
            .catch((error) => {
                console.error('Erro ao enviar a requisição', error);
                notification.error({
                    message: 'Erro',
                    description: 'Houve um erro ao tentar atualizar o usuário.',
                    duration: 3,
                });
            });

    };

    return (
        <div>
            <Form form={form} onFinish={handleSubmit}>
                <Form.Item
                    initialValue={data.username}
                    label="Email de usuário"
                    name="username"
                    rules={[
                        {required: true, message: 'Por favor, insira seu e-mail de usuário!'},
                        {type: 'email', message: 'Por favor, insira um e-mail válido!'},
                        {min: 5, message: 'O nome deve ter pelo menos 5 caracteres!'}
                    ]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    initialValue={data.password}
                    label="Senha"
                    name="password"
                    rules={[
                        // {required: true, message: 'Por favor, insira sua senha!'},
                        {
                            validator: (_, value) => {
                                if (!value || /\d/.test(value)) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('A senha deve conter pelo menos um número!'));
                            },
                        },
                    ]}
                >
                    <Input.Password/>
                </Form.Item>

                <Form.Item
                    initialValue={data.role}
                    label="Tipo de Usuário"
                    name="role"
                    rules={[{required: true, message: 'Por favor, selecione o tipo de usuário!'}]}
                >
                    <Select defaultValue="" placeholder="Selecione o tipo de usuário">
                        <Select.Option value="ADMIN">Administrador</Select.Option>
                        <Select.Option value="COMMON">Comum</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    initialValue={data.jobTitle}
                    label="Tipo de posição"
                    name="jobTitle"
                    rules={[{required: true, message: 'Por favor, selecione o tipo de posição!'}]}
                >
                    <Select defaultValue="" placeholder="Selecione o tipo de posição">
                        <Select.Option value="FRONT_END_DEVELOPER">Desenvolvedor Front-End</Select.Option>
                        <Select.Option value="BACK_END_DEVELOPER">Desenvolvedor Back-End</Select.Option>
                        <Select.Option value="FULL_STACK_DEVELOPER">Desenvolvedor Full Stack</Select.Option>
                        <Select.Option value="DATABASE_DEVELOPER">Desenvolvedor de Banco de Dados</Select.Option>
                        <Select.Option value="QA_DEVELOPER">Desenvolvedor QA</Select.Option>
                        <Select.Option value="UX_UI_DESIGNER">Designer UX/UI</Select.Option>
                        <Select.Option value="INFRASTRUCTURE_DEPLOY_ENGINEER">Engenheiro de Implantação de Infraestrutura</Select.Option>
                        <Select.Option value="PROJECT_MANAGER">Gerente de Projeto</Select.Option>
                        <Select.Option value="PRODUCT_OWNER">Proprietário do Produto</Select.Option>
                        <Select.Option value="SCRUM_MASTER">Scrum Master</Select.Option>
                        <Select.Option value="TECH_LEAD">Líder Técnico</Select.Option>
                        <Select.Option value="HR_SPECIALIST">Especialista em RH</Select.Option>
                        <Select.Option value="WRITER">Escritor</Select.Option>
                        <Select.Option value="SUPPORT">Suporte</Select.Option>
                        <Select.Option value="MARKETING_SPECIALIST">Especialista em Marketing</Select.Option>
                    </Select>
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

export default UserEditModal;