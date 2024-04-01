import React, { useState } from 'react';
import mainLogo from '../images/logo.png';

import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Dropdown, Space, Avatar } from 'antd';

function LoggedInNavbar() {

    const handleMenuClick = (e) => {
        console.log('click', e);
        switch (e.key) {
            case '1':
                window.location.href = '/dashboard';
                break;
            case '2':
                logout();
                break;
            case '3':
                window.location.href = '/FAQ';
                break;
            default:
                break;
            }
        };
        
    const items = [
            {
                label: 'Dashboard',
                key: '1',
                
            },
            {
                label: 'Logout',
                key: '2',
            },
            {
                label: 'FAQ',
                key: '3',
            },

        ];

        const menuProps = {
            items,
            onClick: handleMenuClick,
        };

    const logout = async () => {
        localStorage.removeItem('token');
        window.location.href = '/';
        console.log('Loggedout');
    };

    return (
        <nav className="bg-white border-gray-200 
                        sticky shadow-lg
                        top-0 z-99999
                        h-[13vh]">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto h-[13vh]">
                <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src={mainLogo} className="h-12 pl-4" alt="Logo" />
                </a>


                <Dropdown menu={menuProps} className='w-[7vw] h-[4vw]
                                                            border rounded-[100px] shadow-md'>
                                        <Button>
                                                <Space>
                                                <Avatar size="large" className="text-blue-700" icon={<UserOutlined/>} />
                                                <DownOutlined />
                                                </Space>
                                        </Button>
                                </Dropdown>
            </div>
            
        </nav>
    );
}

export default LoggedInNavbar;
