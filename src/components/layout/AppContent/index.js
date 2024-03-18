import React from 'react';
import {Card, Layout, theme} from 'antd';
import RoutesApp from "../../../routes";
import CustomCard from "../../customgenerics/CustomCard";

const {Content} = Layout;

const AppContent = () => {
    const {
        token: {colorBgContainer},
    } = theme.useToken();

    return (
        <Content
            style={{margin: '24px 16px 0',}}
        >
            <div
                style={{
                    borderRadius: "10px",
                    padding: 24,
                    minHeight: 560,
                    background: colorBgContainer,
                }}
            >
                <RoutesApp/>

            </div>
        </Content>
    );
}

export default AppContent;
