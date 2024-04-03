//Explore.js

import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { Layout, Menu, Button, ConfigProvider, List, Select } from 'antd';
import { LeftOutlined, RightOutlined, FilterOutlined, ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';


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


    const [selectedResale, setSelectedResale] = useState(null);

    const handleDivClick = (resale) => {
        // console.log('Clicked:', resale);
        setSelectedResale(resale);
    };


    const [sortOption, setSortOption] = useState(null);

    const [sortedData, setSortedData] = useState([]);

    useEffect(() => {
        let sorted = [...responseData];
        if (sortOption) {
            const [field, direction] = sortOption.split(' ');
            sorted.sort((a, b) => {
                if (field === 'price' && direction === 'up') {
                    return a.resale_price - b.resale_price;
                } else if (field === 'price' && direction === 'down') {
                    return b.resale_price - a.resale_price;
                } else if (field === 'size' && direction === 'up') {
                    return a.floor_area_sqm - b.floor_area_sqm;
                } else if (field === 'size' && direction === 'down') {
                    return b.floor_area_sqm - a.floor_area_sqm;
                }
                return 0; // Return 0 if no valid sorting condition is met
            });
        }
        setSortedData(sorted);
    }, [responseData, sortOption]);

    return(
        <>
            <div className='relative z-[1000]'>
                {isAuthenticated ? <LoggedInNavbar formValues={formValues}/> : <LoggedOutNavbar formValues={formValues}/>}
            </div>
            <Layout >
                {/* need to resize the map according to window size */}
                <Layout>
                    <Content>
                        <Map 
                        selectedResale1={selectedResale}
                        responseData={responseData} 
                        />                    
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
                        zIndex: 100,
                        height: '87vh',
                        backgroundColor: 'white',
                    }}
                >
                    <div className="justify-between flex mt-5 mb-5">
                        <span className="font-bold text-3xl ml-10" >Search Results</span>
                        

                        <Select
                            suffixIcon={<FilterOutlined />}
                            defaultValue="Sort By"
                            className="bg-white border-none text-black shadow-md mr-10"
                            onChange={(value) => {
                                setSortOption(value);
                            }}

                        >
                            <Select.Option  value="price up">Price <ArrowUpOutlined/></Select.Option>
                            <Select.Option  value="price down">Price <ArrowDownOutlined/></Select.Option>

                            <Select.Option value="size up">Size <ArrowUpOutlined/></Select.Option>
                            <Select.Option value="size down">Size <ArrowDownOutlined/></Select.Option>

                        </Select>
                    </div>
                    
       
                    
                    
                    <div className='h-[77vh] overflow-auto justify-center flex'>
                        <List className='ml-4'
                            grid={{ column: 2 }} // Adjust column count as needed
                            
                            // dataSource={responseData}
                            dataSource={sortedData}

                            renderItem={resale => (
                                <List.Item>
                                    <Button className=" h-[20vh] w-[15vw]  shadow-md bg-gray-50"
                                        key={resale.id}
                                        onClick={() => handleDivClick(resale)} // Add this line

                                    >
                                        <div className="header">
                                            <div className="residence-name">{resale.town}</div>
                                            <div className="price-range">${resale.resale_price.toLocaleString()}</div>
                                        </div>
                                        <ul className="residence-details">
                                            <li>Type: {resale.flat_type}</li>
                                            <li>Street: {resale.street_name}</li>
                                            <li>Floor Area: {resale.floor_area_sqm} sqm</li>
                                        </ul>
                                    </Button>
                                </List.Item>
                            )}
                            
                        />
                    </div>

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
                        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)'
                    }}
                />
                </ConfigProvider>
            </Layout>
            
        </>
    );
}

export default Explore