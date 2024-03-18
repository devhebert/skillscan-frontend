import {Alert, Button, Checkbox, Form, Input, notification, Select, Space} from "antd";
import axios from "axios";
import React, {useEffect} from "react";
import {SelectWithTechnology} from "../../course/SelectWithTechnology";
import {MinusCircleOutlined, PlusOutlined} from "@ant-design/icons";

export const QuestionEditModal = ({data, onCancel, onSuccess}) => {
    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue({
            technologyId: data.technologyId,
            difficulty: data.difficulty,
            questionText: data.questionText,
            answers: data.answers,
        });
    }, [data, form]);

    const validateForm = (values) => {
        let answers = values.answers || [];
        // Define 'isCorrect' as false by default
        answers = answers.map(answer => ({
            ...answer,
            isCorrect: answer.isCorrect === undefined ? false : answer.isCorrect
        }));
        const correctAnswers = answers.filter(answer => answer.isCorrect).length;
        if (answers.length < 4) {
            notification.error({
                message: 'Erro',
                description: 'Por favor, insira 4 respostas!',
                duration: 3,
            });
            return false;
        }
        if (correctAnswers !== 1) {
            notification.error({
                message: 'Erro',
                description: 'Por favor, selecione apenas 1 resposta correta!',
                duration: 3,
            });
            return false;
        }
        return true;
    };

    const handleSubmit = (values) => {
        console.log("Question Edit Modal Values", values)

        if (!validateForm(values)) return;

        axios.put(`http://localhost:8888/api/v1/question/${data.id}`, values)
            .then((response) => {
                console.log('Requisição enviada com sucesso', response);
                notification.success({
                    message: 'Sucesso!',
                    description: 'Questão atualizada com sucesso.',
                    duration: 3,
                });
                onSuccess();
            })
            .catch((error) => {
                console.error('Erro ao enviar a requisição', error);
                notification.error({
                    message: 'Erro',
                    description: 'Houve um erro ao tentar atualizar a questão.',
                    duration: 3,
                });
            });

    };

    return (
        <>
            <Form form={form} onFinish={handleSubmit}>

                <SelectWithTechnology initialTechnologyId={data.technologyId} />

                <Form.Item
                    initialValue={data.difficulty}
                    label="Dificuldade"
                    name="difficulty"
                    rules={[
                        {required: true, message: 'Por favor, insira a dificuldade!'},
                    ]}
                >
                    <Select defaultValue={""} placeholder="Selecione a dificuldade">
                        <Select.Option value="INITIAL">Inicial</Select.Option>
                        <Select.Option value="INTERMEDIATE">Intermediário</Select.Option>
                        <Select.Option value="ADVANCED">Avançado</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    initialValue={data.questionText}
                    label="Questão"
                    name="questionText"
                    rules={[
                        {required: true, message: 'Por favor, insira a questão!'},
                        {min: 2, message: 'O questão deve ter pelo menos 10 caracteres!'}
                    ]}
                >
                    <Input/>
                </Form.Item>

                <Form.List name="answers">
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map((field, index) => (
                                <Space key={field.key} style={{ display: 'flex', marginBottom: 8, marginLeft: 50 }} align="baseline">
                                    <Form.Item
                                        {...field}
                                        name={[field.name, 'answerText']}
                                        fieldKey={[field.fieldKey, 'answerText']}
                                        rules={[{ required: true, message: 'Por favor, insira a resposta!' }]}
                                    >
                                        <Input placeholder="Resposta" />
                                    </Form.Item>
                                    <Form.Item
                                        {...field}
                                        name={[field.name, 'isCorrect']}
                                        fieldKey={[field.fieldKey, 'isCorrect']}
                                        valuePropName="checked"
                                    >
                                        <Checkbox>Correta</Checkbox>
                                    </Form.Item>
                                    <MinusCircleOutlined onClick={() => remove(field.name)} />
                                </Space>
                            ))}
                            <Form.Item>
                                <Button type="dashed" onClick={() => add({ answerText: '', isCorrect: false })} block icon={<PlusOutlined />} disabled={fields.length >= 4}>
                                    Adicionar Resposta
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>
                <Form.Item
                    shouldUpdate
                    rules={[
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                const answers = getFieldValue('answers') || [];
                                console.log('Checkbox values:', answers); // Add this line
                                const correctAnswers = answers.filter(answer => answer.isCorrect).length;
                                if (answers.length < 4) {
                                    return Promise.reject(new Error('Por favor, insira 4 respostas!'));
                                }
                                if (correctAnswers !== 1) {
                                    return Promise.reject(new Error('Por favor, selecione apenas 1 resposta correta!'));
                                }
                                return Promise.resolve();
                            },
                        }),
                    ]}
                >
                    <></>
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
        </>
    );
}