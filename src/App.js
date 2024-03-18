// src/App.js
import React, { useEffect } from 'react';
import {Layout} from 'antd';
import SideNav from "./components/layout/SideNav";
import AppHeader from "./components/layout/AppHeader";
import AppContent from "./components/layout/AppContent";
import AppFooter from "./components/layout/AppFooter";
import "./index.css"
import {BrowserRouter, useLocation, useNavigate} from "react-router-dom";
import RoutesApp from "./routes";
import {AuthProvider} from "./components/authprovider/AuthProvider";

const {Sider} = Layout;

const NavigationHandler = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const savedLocation = localStorage.getItem('location');
        if (savedLocation && savedLocation !== location.pathname) {
            navigate(savedLocation);
        }
    }, [navigate]);

    return null;
}

const App = () => {
    return (
        <React.StrictMode>
            <AuthProvider>
                <div className="layout">
                    <BrowserRouter>
                        <NavigationHandler />
                        <Layout>
                            <Sider
                                className="custom-sider"
                                breakpoint="lg"
                                collapsedWidth="0"
                                onBreakpoint={(broken) => {
                                    console.log(broken);
                                }}
                                onCollapse={(collapsed, type) => {
                                    console.log(collapsed, type);
                                }}
                            >
                                <div className="demo-logo-vertical"/>
                                <SideNav/>
                            </Sider>
                            <Layout>
                                <AppHeader/>
                                <AppContent/>
                                <AppFooter/>
                            </Layout>
                        </Layout>
                    </BrowserRouter>
                </div>
            </AuthProvider>
        </React.StrictMode>
    );
};

export default App;