import React, { useState } from "react";

import { Layout, Button, ConfigProvider } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

const { Sider } = Layout;



function ExploreRightBar({ isAuthenticated, frequentAddresses }) {
    
    const [collapsedRight, setCollapsedRight] = useState(false);

    const onCollapseRight = collapsedRight => {
        setCollapsedRight(collapsedRight);
    };


    const toggleSidebarRight = () => {
        setCollapsedRight(!collapsedRight);
    };
    
    
    
    return (
        <>
        {isAuthenticated && (
        <>
            <Sider
                collapsible
                collapsed={collapsedRight}
                onCollapse={onCollapseRight}
                collapsedWidth={0}
                width={400}
                trigger={null}
                style={{
                    position: 'absolute',
                    right: 0,
                    top: '13vh',
                    zIndex: 100,
                    height: '40vh',
                    backgroundColor: 'white',
                }}
            >
                <div className="flex flex-col">
                    <span className="font-semibold text-2xl">Routing to Frequent Locations</span>
                    <div className="overflow-auto h-[40vh]">
                    {frequentAddresses.map((address, index) => (
                        <Button key={index} className="flex items-center justify-between p-4 border-b border-gray-300">
                            <div className="flex-grow">
                                <p className="text-lg font-semibold text-blue-600">{address}</p>
                            </div>
                        </Button>
                    ))}
                    </div>
                </div>
            </Sider>
                


            <ConfigProvider wave={{ disabled: true }}>
            <Button
                type="primary"
                icon={collapsedRight ? <LeftOutlined className='text-black'/> : <RightOutlined className='text-black'/>}
                loading={false} // Ensure loading state is off
                onClick={toggleSidebarRight}
                style={{
                    position: 'absolute',
                    right: collapsedRight ? 0 : '400px',
                    transition: 'right 0.2s ease',
                    zIndex: 10,
                    top: '30vh',
                    backgroundColor: 'white',
                    borderRadius: '0%',
                    height: '50px',
                    border: 'none',
                    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)'
                }}
            />
            </ConfigProvider>
        </>
        )}
        </>
    )
}
export default ExploreRightBar;