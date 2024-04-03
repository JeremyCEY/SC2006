import React, { useState } from "react";

import { Layout, Button, List, Select, ConfigProvider } from 'antd';
import { FilterOutlined, ArrowUpOutlined, ArrowDownOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';

const { Sider } = Layout;



function SearchResultsBar({ setSortOption, sortedData, handleDivClick }) {
    const [collapsed, setCollapsed] = useState(false);

    const onCollapse = collapsed => {
        setCollapsed(collapsed);
    };


    const toggleSidebar = () => {
        setCollapsed(!collapsed);
    };


    
    
    return(
        <>
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
                zIndex: 10,
                top: '50vh',
                backgroundColor: 'white',
                borderRadius: '0%',
                height: '50px',
                border: 'none',
                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)'
            }}
        />
        </ConfigProvider>
        </>
    );
}
export default SearchResultsBar;