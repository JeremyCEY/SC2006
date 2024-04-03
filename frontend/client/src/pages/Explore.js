//Explore.js

import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { Layout, Menu, Button, ConfigProvider } from 'antd';
import { LeftOutlined, RightOutlined, FilterOutlined } from '@ant-design/icons';


import LoggedInNavbar from '../components/LoggedInNavbar';
import LoggedOutNavbar from "../components/LoggedOutNavbar";
import Map from '../components/Map';


const { Sider, Content } = Layout;


function Explore(){
    
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsAuthenticated(token !== null);
    }, []);

    const [collapsed, setCollapsed] = useState(false);

    const onCollapse = collapsed => {
        setCollapsed(collapsed);
    };

    const toggleSidebar = () => {
        setCollapsed(!collapsed);
    };
    
    const location = useLocation();
    const responseData = location.state.responseData;
    const formValues = location.state.formValues;

    // useEffect(() => {
    //     console.log('passed formvalues' ,formValues);
    // });

    return(
        <>
            {isAuthenticated ? <LoggedInNavbar formValues={formValues}/> : <LoggedOutNavbar formValues={formValues}/>}
            <Layout >
                {/* need to resize the map according to window size */}
                <Layout>
                    <Content>
                        <Map responseData={responseData} />                    
                    </Content>
                </Layout>

                
                <Sider
                    collapsible
                    collapsed={collapsed}
                    onCollapse={onCollapse}
                    collapsedWidth={0}
                    width={500}
                    trigger={null}
                    style={{
                        position: 'absolute',
                        left: 0,
                        zIndex: 1000,
                        height: '87vh',
                        backgroundColor: 'white',
                    }}
                >
                    <div>
                        <span className='font-bold text-3xl'>Search Results</span>
                        <Button type="primary"
                                icon={<FilterOutlined/>}
                                className="bg-white border-none text-black shadow-md"
                        >
                            Filters
                        </Button>
                    </div>
                    {/* <Menu  defaultSelectedKeys={['1']} mode="inline">
                        <Menu.Item key="1">
                            Menu Item 1
                        </Menu.Item>
                        <Menu.Item key="2">
                            Menu Item 2
                        </Menu.Item>
                    </Menu> */}
                    
                </Sider>
                <ConfigProvider wave={{ disabled: true }}>
                <Button
                    type="primary"
                    icon={collapsed ? <RightOutlined className='text-black'/> : <LeftOutlined className='text-black'/>}
                    loading={false} // Ensure loading state is off
                    onClick={toggleSidebar}
                    style={{
                        position: 'absolute',
                        left: collapsed ? 0 : '500px',
                        transition: 'left 0.2s ease',
                        zIndex: 1001,
                        top: '50vh',
                        backgroundColor: 'white',
                        borderRadius: '0%',
                        height: '50px',
                        border: 'none',
                    }}
                />
                </ConfigProvider>
            </Layout>
            
        </>
    );
}

export default Explore