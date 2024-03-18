import React, {useContext, useEffect} from 'react';
import {Row, Col, Form, Input, Button, Card, notification} from 'antd';
import "./style.css";
import logo from '../../assets/ss-logo.png';
import {Helmet} from "react-helmet";
import axios from "axios";
import {AuthContext} from "../../components/authprovider/AuthContext";
import {redirect, useHistory, useNavigate} from "react-router-dom";



const Login = () => {
    // Inside your component
    const { authenticate, userId, role } = useContext(AuthContext);
    console.log('userId no component login:', userId);
    const navigate = useNavigate();

    useEffect(() => {
        console.log('userId após autenticação:', userId);
    }, [userId]);

    const handleSubmit = async (values) => {
        console.log("Received values of form: ", values)
        try {
            await axios.post('http://localhost:8888/api/v1/auth/login', values)
                .then(response => {
                    console.log(response.data);
                    if (response.data.token) {
                        console.log('response.data.id:', response.data.id); // Add this line
                        authenticate(response.data.token, response.data.id, response.data.username, response.data.role); // Add response.data.role
                        console.log('userId após autenticação:', userId);
                        navigate('/home');
                    }
                })
                .catch(error => {
                    if (error.response) {
                        // The request was made and the server responded with a status code
                        // that falls out of the range of 2xx
                        console.log(error.response.data);
                        console.log(error.response.status);
                        console.log(error.response.headers);
                        notification.error({
                            message: 'Erro',
                            description: error.response.data, // Use the error message from the API
                            duration: 3,
                        });
                    }
                });
        } catch (error) {
            console.error('Failed to fetch questions:', error);

        }
    }

    return (
        <>
            <Helmet>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@100&display=swap" />
            </Helmet>

            <Row className="login-container">
                <Col span={12} className="form-container">
                    <Card style={{width: '60%', height: 'auto'}}>
                        <h2>Login</h2>
                        <Form onFinish={handleSubmit}>
                            <Form.Item
                                name="username"
                                rules={[{required: true, message: 'Por favor, insira seu username!'}]}
                            >
                                <Input placeholder="Username"/>
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[{required: true, message: 'Por favor, insira sua senha!'}]}
                            >
                                <Input.Password placeholder="Password"/>
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit"
                                        style={{backgroundColor: '#001529', borderColor: '#001529'}}>
                                    Entrar
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>
                <Col span={12} className="logo-container-login">
                    <div className="welcome-text" style={{color: '#001529'}}>
                        <p>Seja bem-vindo ao Skill Scan!</p>
                        <p>A solução mais completa e segura em diagnóstico de conhecimento.</p>
                        <p>Conclua seu login e aproveite os benefícios.</p>
                    </div>
                    <img src={logo} alt="Logo" />
                </Col>
            </Row>
        </>

    );
}

export default Login;