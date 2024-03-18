import React, {useContext} from 'react';
import {Menu} from 'antd';
import logo from "../../../assets/logo.png";
import securityIcon from "../../../assets/seguranca.png";
import chartIcon from "../../../assets/grafico.png";
import usersIcon from "../../../assets/usuarios.png";
import questionIcon from "../../../assets/questoes.png";
import technologyIcon from "../../../assets/tecnologia.png";
import courseIcon from "../../../assets/curso.png";
import quizAttempt from "../../../assets/teste.png";
import "./style.css"
import {Link} from "react-router-dom";
import {AuthContext} from "../../authprovider/AuthContext";

const SideNav = () => {
    const { isAuthenticated, role } = useContext(AuthContext);

    let itemsIcon;
    if (isAuthenticated) {
        itemsIcon = role === 'ADMIN' ? [
            {icon: <img src={chartIcon} alt="chart" className={"chart-icon"} />, label: "Home", path: "/home"},
            {icon: <img src={usersIcon} alt="users" className={"users-icon"} />, label: "Usuários", path: "/user"},
            {icon: <img src={technologyIcon} alt="technology" className={"technology-icon"} />, label: "Tecnologias", path: "/technology"},
            {icon: <img src={courseIcon} alt="course" className={"course-icon"} />, label: "Cursos", path: "/course"},
            {icon: <img src={questionIcon} alt="question" className={"question-icon"} />, label: "Questões", path: "/question"},
            {icon: <img src={quizAttempt} alt="quizAttempt" className={"quizAttempt-icon"} />, label: "Testes", path: "/quiz-attempt"}
        ] : [
            {icon: <img src={chartIcon} alt="chart" className={"chart-icon"} />, label: "Home", path: "/home"},
            {icon: <img src={quizAttempt} alt="quizAttempt" className={"quizAttempt-icon"} />, label: "Testes", path: "/quiz-attempt"}
        ];
    } else {
        itemsIcon = [
            {icon: <img src={securityIcon} alt="login" className={"login-icon"} />, label: "Login", path: "/"}
        ];
    }

    return (
        <div key={role}>
            <div className={"logo-container"}>
                <img src={logo} alt={"logo"} className={"logo-image"}/>
            </div>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                {itemsIcon.map((item, index) => (
                    <Menu.Item
                        key={String(index + 1)}
                        icon={React.isValidElement(item.icon) ? item.icon : React.createElement(item.icon)}
                    >
                        <Link to={item.path} className="menu-item-label">{item.label}</Link>
                    </Menu.Item>
                ))}
            </Menu>

        </div>
    );
}

export default SideNav;