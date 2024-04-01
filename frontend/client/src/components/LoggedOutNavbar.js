import React, { useState } from 'react';
import mainLogo from '../images/logo.png';
// import './Css/Loggedout.css';

import { DownOutlined, UserOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Dropdown, Space, Avatar, Select } from 'antd';



function LoggedOutNavbar() {
            
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
                    label: 'Register',
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
                        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto h-[13vh]">
                                <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                                        <img src={mainLogo} className="h-12 pl-4" alt="Logo" />
                                </a>
                                
                                <div className="flex items-center
                                                justify-between
                                                border shadow-md
                                                h-[60%]
                                                w-[80%]
                                                rounded-[100px]">
                                    <div className="flex flex-col ml-10 w-[15%]">
                                        <span className="font-semibold text-sm">Location</span>
                                        <Select maxTagCount="responsive"
                                            showSearch
                                            variant='borderless'
                                            suffixIcon={null}
                                            
                                            mode="multiple"
                                            optionFilterProp="children"
                                            filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                            filterSort={(optionA, optionB) =>
                                            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                            }
                                            
                                            // defaultValue="yishun"
                                            options={[
                                                {
                                                    value: 'sembawang',
                                                    label: 'Sembawang',
                                                },
                                                {
                                                    value: 'woodlands',
                                                    label: 'Woodlands',
                                                },
                                                {
                                                    value: 'yishun',
                                                    label: 'Yishun',
                                                },
                                                {
                                                    value: 'angmokio',
                                                    label: 'Ang Mo Kio',
                                                },
                                                {
                                                    value: 'hougang',
                                                    label: 'Hougang',
                                                },
                                                {
                                                    value: 'punggol',
                                                    label: 'Punggol',
                                                },
                                                {
                                                    value: 'sengkang',
                                                    label: 'Seng Kang',
                                                },
                                                {
                                                    value: 'serangoon',
                                                    label: 'Serangoon',
                                                },
                                                {
                                                    value: 'bedok',
                                                    label: 'Bedok',
                                                },
                                                {
                                                    value: 'pasirris',
                                                    label: 'Pasir Ris',
                                                },
                                                {
                                                    value: 'tampines',
                                                    label: 'Tampines',
                                                },
                                                {
                                                    value: 'bukitbatok',
                                                    label: 'Bukit Batok',
                                                },
                                                {
                                                    value: 'bukitpanjang',
                                                    label: 'Bukit Panjang',
                                                },
                                                {
                                                    value: 'choachukang',
                                                    label: 'Choa Chu Kang',
                                                },
                                                {
                                                    value: 'clementi',
                                                    label: 'Clementi',
                                                },
                                                {
                                                    value: 'jurongeast',
                                                    label: 'Jurong East',
                                                },
                                                {
                                                    value: 'jurongwest',
                                                    label: 'Jurong West',
                                                },
                                                {
                                                    value: 'tengah',
                                                    label: 'Tengah',
                                                },
                                                {
                                                    value: 'bishan',
                                                    label: 'Bishan',
                                                },
                                                {
                                                    value: 'bukitmerah',
                                                    label: 'Bukit Merah',
                                                },
                                                {
                                                    value: 'bukittimah',
                                                    label: 'Bukit Timah',
                                                },
                                                {
                                                    value: 'centralarea',
                                                    label: 'Central Area',
                                                },
                                                {
                                                    value: 'geylang',
                                                    label: 'Geylang',
                                                },
                                                {
                                                    value: 'kallangwhampoa',
                                                    label: 'Kallang/Whampoa',
                                                },
                                                {
                                                    value: 'marineparade',
                                                    label: 'Marine Parade',
                                                },
                                                {
                                                    value: 'queenstown',
                                                    label: 'Queenstown',
                                                },
                                                {
                                                    value: 'toapayoh',
                                                    label: 'Toa Payoh',
                                                },
                                            ]}
                                        />
                                    </div>
                                    
                                    <div className="flex flex-col w-[15%]">
                                        <span className="font-semibold text-sm">Property Type</span>
                                        <Select maxTagCount="responsive"
                                            mode="multiple"                                      
                                            placeholder=""
                                            optionFilterProp="children"
                                            filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                            filterSort={(optionA, optionB) =>
                                            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                            }
                                            variant='borderless'
                                            suffixIcon={null}
                                            options={[
                                                {
                                                    value: 'hdb',
                                                    label: 'HDB',
                                                },
                                                {
                                                    value: 'condo',
                                                    label: 'Condo',
                                                },
                                                {
                                                    value: 'landed',
                                                    label: 'Landed',
                                                },
                                                {
                                                    value: 'strata_detached',
                                                    label: 'Strata Detached',
                                                },
                                                {
                                                    value: 'strata_semidetached',
                                                    label: 'Strata Semidetached',
                                                },
                                                {
                                                    value: 'strata_terrace',
                                                    label: 'Strata Terrace',
                                                },
                                                {
                                                    value: 'detached',
                                                    label: 'Detached',
                                                },
                                                {
                                                    value: 'semi_detached',
                                                    label: 'Semi-detached',
                                                },
                                                {
                                                    value: 'terrace',
                                                    label: 'Terrace',
                                                },
                                                {
                                                    value: 'apartment',
                                                    label: 'Apartment',
                                                },
                                                {
                                                    value: 'condominium',
                                                    label: 'Condominium',
                                                },
                                                {
                                                    value: 'executive_condominium',
                                                    label: 'Executive Condominium',
                                                }
                                            ]}
                                        />
                                    </div>
                                    
                                    <div className="flex flex-col w-[15%]">
                                    <span className="font-semibold text-sm">Amenities</span>
                                    <Select maxTagCount="responsive"                                
                                            mode="multiple"
                                            optionFilterProp="children"
                                            filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                            filterSort={(optionA, optionB) =>
                                            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                            }
                                            variant='borderless'
                                            suffixIcon={null}
                                            options={[
                                                {
                                                    value: 'communitycentre',
                                                    label: 'Community Centre',
                                                },
                                                {
                                                    value: 'supermarket',
                                                    label: 'Supermarket',
                                                },
                                                {
                                                    value: 'mall',
                                                    label: 'Mall',
                                                },
                                                {
                                                    value: 'secondaryschool',
                                                    label: 'Secondary School',
                                                },
                                                {
                                                    value: 'primaryschool',
                                                    label: 'Primary School',
                                                },
                                                {
                                                    value: 'eldercare',
                                                    label: 'Elder Care',
                                                },
                                                {
                                                    value: 'studentcare',
                                                    label: 'Student Care',
                                                },
                                                {
                                                    value: 'mrt',
                                                    label: 'MRT',
                                                },
                                                {
                                                    value: 'pool',
                                                    label: 'Pool',
                                                },
                                                {
                                                    value: 'basketballcourt',
                                                    label: 'Basketball Court',
                                                },
                                                {
                                                    value: 'badmintoncourt',
                                                    label: 'Badminton Court',
                                                },
                                                {
                                                    value: 'park',
                                                    label: 'Park',
                                                },
                                                {
                                                    value: 'gym',
                                                    label: 'Gym',
                                                },
                                                {
                                                    value: 'coffeeshophawkercentre',
                                                    label: 'Coffee shop/Hawker Centre',
                                                },
                                                {
                                                    value: 'restaurant',
                                                    label: 'Restaurant',
                                                },
                                            ]}
                                        />
                                    </div>

                                    <div className="flex flex-col w-[15%]">
                                    <span className="font-semibold text-sm">Budget</span>
                                    <Select maxTagCount="responsive"
                                            mode="multiple"                                   
                                            placeholder=""
                                            optionFilterProp="children"
                                            filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                            // filterSort={(optionA, optionB) =>
                                            // (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                            // }
                                            variant='borderless'
                                            suffixIcon={null}
                                            options={[
                                            {
                                                value: '1',
                                                label: '100K-200K',
                                            },
                                            {
                                                value: '2',
                                                label: '200K-300K',
                                            },
                                            {
                                                value: '3',
                                                label: '300K-400K',
                                            },
                                            {
                                                value: '4',
                                                label: '400K-500K',
                                            },
                                            {
                                                value: '5',
                                                label: '500K-600K',
                                            },
                                            {
                                                value: '6',
                                                label: '600K-700K',
                                            },
                                            {
                                                value: '7',
                                                label: '700K-800K',
                                            },
                                            {
                                                value: '8',
                                                label: '800K-900K',
                                            },
                                            {
                                                value: '9',
                                                label: '900K-1M',
                                            },
                                            {
                                                value: '10',
                                                label: '1M-1.1M',
                                            },
                                            {
                                                value: '11',
                                                label: '1.1M-1.2M',
                                            },
                                            {
                                                value: '12',
                                                label: '1.2M-1.3M',
                                            },
                                            {
                                                value: '13',
                                                label: '1.3M-1.4M',
                                            },
                                            {
                                                value: '14',
                                                label: '1.4M-1.5M',
                                            },
                                            ]}
                                        />
                                    </div>
                                    
                                    <div className="flex flex-col w-[15%]">
                                    <span className="font-semibold text-sm">Rooms</span>
                                    <Select maxTagCount="responsive"
                                            mode="multiple"                                    
                                            placeholder=""
                                            optionFilterProp="children"
                                            filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                            filterSort={(optionA, optionB) =>
                                            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                            }
                                            variant='borderless'
                                            suffixIcon={null}
                                            options={[
                                            {
                                                value: '1',
                                                label: '1 Room',
                                            },
                                            {
                                                value: '2',
                                                label: '2 Room',
                                            },
                                            {
                                                value: '3',
                                                label: '3 Room',
                                            },
                                            {
                                                value: '4',
                                                label: '4 Room',
                                            },
                                            {
                                                value: '5',
                                                label: '5 Room',
                                            },
                                            {
                                                value: 'executive',
                                                label: 'Executive',
                                            },
                                            {
                                                value: 'multi',
                                                label: 'Multi-generation',
                                            },
                                            ]}
                                        />
                                    </div>

                                    <div className="mr-5">
                                        <Button size="large" 
                                                shape="circle" 
                                                className="border-none shadow-none" 
                                                icon={<SearchOutlined style={{ fontSize: '25px' }}/>}/>     
                                    </div>
                                    
                                </div>


                                <Dropdown menu={menuProps} className='w-[10%]
                                                                    lg:w-[8%] 
                                                                    h-[60%] 
                                                                    
                                                                    rounded-[100px] shadow-md'>
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

export default LoggedOutNavbar;
