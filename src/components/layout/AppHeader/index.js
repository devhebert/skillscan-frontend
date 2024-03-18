// src/components/layout/AppHeader/chartuser.js
import React, {useContext} from 'react';
import {Dropdown, Layout, Menu, theme} from 'antd';
import "./style.css"
import userIcon from "../../../assets/user.png";
import {AuthContext} from "../../authprovider/AuthContext";
import {useNavigate} from 'react-router-dom';

const { Header } = Layout;

const AppHeader = () => {
    const {token: { colorBgContainer },} = theme.useToken();
    const { isAuthenticated, signout, username } = useContext(AuthContext); // change logout to signout
    const navigate = useNavigate();

    const handleLogout = () => {
        signout(); // change logout to signout
        navigate('/');
    };

    const menu = (
        <Menu>
            <Menu.Item key="1" onClick={handleLogout}>
                Logout
            </Menu.Item>
        </Menu>
    );

    const firstName = username ? username.split('@')[0] : "unknown";
    const displayName = firstName.charAt(0).toUpperCase() + firstName.slice(1);

    return (
        isAuthenticated ? (
            <div>
                <Header style={{ background: colorBgContainer }} className="custom-header">
                    <span className="custom-message-header"><b>Bem-vindo, </b> {displayName}</span>
                    <Dropdown overlay={menu} trigger={['click']}>
                        <img src={userIcon} alt="User" className={"user-icon"} />
                    </Dropdown>
                </Header>
            </div>
        ) : null
    );
}

export default AppHeader;