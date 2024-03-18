import React, {useContext, useEffect, useState} from 'react';
import {Form, Button, Radio, notification} from 'antd';
import axios from 'axios';
import {SelectWithTechnology} from "../../components/course/SelectWithTechnology";
import CustomTable from "../../components/customgenerics/CustomTable";
import CustomCard from "../../components/customgenerics/CustomCard";
import {AuthContext} from "../../components/authprovider/AuthContext";

const QuizAttempt = () => {
    const { userId } = useContext(AuthContext); // Access userId from AuthContext
    const [selectedTechnology, setSelectedTechnology] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [quizStarted, setQuizStarted] = useState(false);
    const [quizResponse, setQuizResponse] = useState(null);

    const handleTechnologyChange = value => {
        setSelectedTechnology(value);
    };

    const handleStartQuiz = async () => {
        if (!selectedTechnology) {
            notification.error({
                message: 'Erro',
                description: 'Por favor, selecione uma tecnologia antes de iniciar o teste.',
                duration: 3,
            });
            return;
        }

        try {
            const response = await axios.get(`http://localhost:8888/api/v1/random-question/${selectedTechnology}?userId=${userId}`); // Use userId from AuthContext
            console.log('API response:', response.data);
            setQuestions(response.data[0].questions);
            console.log('Questions:', response.data[0].questions)
            setQuizStarted(true);
        } catch (error) {
            console.error('Failed to fetch questions:', error);
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
        }
    };

    const handleAnswerChange = (questionId, e) => {
        setAnswers({
            ...answers,
            [questionId]: e.target.value,
        });
    };

    const handleSubmitQuiz = async () => {
        if (!quizStarted) {
            notification.error({
                message: 'Erro',
                description: 'Por favor, inicie o teste antes de enviar.',
                duration: 3,
            });
            return;
        }

        if (Object.keys(answers).length < 10) {
            notification.error({
                message: 'Erro',
                description: 'Por favor, responda a todas as 10 perguntas antes de enviar o teste.',
                duration: 3,
            });
            return;
        }

        const questionResponses = Object.keys(answers).map(questionId => ({
            questionId,
            answer: answers[questionId],
        }));

        try {
            const response = await axios.post('http://localhost:8888/api/v1/quiz-attempt/create', {
                userId, // Use userId from AuthContext
                technologyId: selectedTechnology,
                questionResponses,
            });
            console.log('Quiz submitted successfully. Response:', response.data);
            setQuizResponse(response.data.quizResponse); // Store the quiz response
            setQuestions([]); // Clear the questions
            setAnswers({}); // Clear the answers
        } catch (error) {
            console.error('Failed to submit quiz:', error);
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
        }
    };

    return (
        <CustomCard
            title="Diagnóstico de Conhecimento"
            content={
                <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
                    {quizResponse ? (
                        <div>
                            <h2>{quizResponse.response}</h2>
                            {quizResponse.courses.map(course => (
                                <div key={course.name}>
                                    <h3>{course.name}</h3>
                                    <a href={course.content} target="_blank" rel="noopener noreferrer">Link do Curso</a>
                                </div>
                            ))}
                            <Button type="primary" style={{backgroundColor: '#001529', borderColor: '#001529', marginTop: '20px'}} onClick={() => setQuizResponse(null)}>Fazer o teste novamente</Button>
                        </div>
                    ) : (
                        <Form>
                            <div style={{width: "450px"}}>
                                <SelectWithTechnology
                                    onChange={handleTechnologyChange}
                                />
                            </div>
                            <Form.Item>
                                <Button type="primary" style={{backgroundColor: '#001529', borderColor: '#001529'}} onClick={handleStartQuiz}>Iniciar Teste</Button>
                            </Form.Item>
                            {questions && questions.map(question => (
                                <div key={question.id}>
                                    <h2>{question.questionText}</h2>
                                    <Radio.Group
                                        onChange={e => handleAnswerChange(question.id, e)}
                                        style={{ flexDirection: 'column' }} // Make the radio buttons stack vertically
                                    >
                                        {question.answers.map(answer => (
                                            <Radio style={{ display: 'block' }} value={answer.answerText} key={answer.answerText}>
                                                {answer.answerText}
                                            </Radio>
                                        ))}
                                    </Radio.Group>
                                </div>
                            ))}
                            <br/>
                            {questions.length > 0 && <Button type="primary" style={{backgroundColor: '#001529', borderColor: '#001529'}} onClick={handleSubmitQuiz}>Enviar Teste</Button>}
                        </Form>
                    )}
                </div>
            }
        />
    );
};

export default QuizAttempt;