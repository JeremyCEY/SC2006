import React, { useState } from 'react';
import mainLogo from '../images/logo.png';
// import './Css/Loggedout.css';

import { DownOutlined, UserOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Dropdown, Space, Avatar, Select } from 'antd';

import Searchbar from './Searchbar';

function LoggedOutNavbar({formValues}) {
            
        const handleMenuClick = (e) => {
            console.log('click', e);
            switch (e.key) {
                case '1':
                    window.location.href = '/login';
                    break;
                case '2':
                    window.location.href = '/register';
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
                    label: 'Login',
                    key: '1',
                    
                },
                {
                    label: 'Sign Up',
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


        return (
            <nav className="bg-white border-gray-200
                                                sticky shadow-lg
                                                top-0 z-99999
                                                h-[13vh]">
                <div className="w-[100%] max-w-screen-xl flex flex-wrap items-center justify-between mx-auto h-[13vh]">
                    <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src={mainLogo} className="h-12 pl-4" alt="Logo"/>
                    </a>
                    <div style={{width: '75%', height: '80%'}}>
                        <Searchbar initialValues={formValues}/>
                    </div>
                    <div style={{width: '7%', height: '80%'}}>
                        <Dropdown menu={menuProps} className='
                            border rounded-[100px] shadow-md'>
                            <Button style={{height: '100%', width: '100%'}}>
                                <Avatar size="large" className="text-blue-700" style={{backgroundColor: '#F4F4F4'}}
                                        icon={<UserOutlined/>}/>
                                <DownOutlined/>
                            </Button>
                        </Dropdown>
                    </div>
                </div>
            </nav>

        );
}

export default LoggedOutNavbar;
