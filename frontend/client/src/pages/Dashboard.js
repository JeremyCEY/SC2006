import React, { useContext, useState } from 'react';

import LoggedInNavbar from '../components/LoggedInNavbar';
import SavedProperties from './SavedProperties'; // Import the new component

import { Menu, Layout } from 'antd'

const { Sider } = Layout;

function Dashboard() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('savedProperties');
    const userId = '65fe8c23cec43e4c08995198'


    {/* Sidebar Selection */}
    const renderContent = () => {
        switch (activeSection) {
            case 'savedProperties':
                return <SavedProperties userId={userId} />;
            case 'frequentlyVisited':
                return <div>Frequently Visited</div>;
            case 'settings':
                return <div>Settings content</div>;
            default:
                return <div>Select a section</div>;
        }
    };

    const navbarHeight = '64px'; 

    return (
        <>
            <LoggedInNavbar />

            <div className="flex">
                
                
                {/* Sidebar */}
                <Sider width={250} className='bg-gray-50 h-[87vh]'>
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['saved_properties']}
                        className='h-full border-0 bg-gray-50 font-semibold text-1xl'
                        style={{ height: '100%', borderRight: 0 }}
                        items = {[
                            {
                                key: 'saved_properties',
                                label: 'Saved Properties',
                            },
                            {
                                key: 'frequently_visited',
                                label: 'Frequently Visited',
                            },
                            {
                                key: 'settings',
                                label: 'Settings',
                            },
                            
                        ]}
                    />
                </Sider>
                {/* <aside 
                    className={`bottom-0 z-30 w-64 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} sm:translate-x-0 transition-transform bg-gray-50 bg-gray-300 overflow-y-auto`}
                    style={{ top: navbarHeight }} 
                >
                    <ul className="space-y-2 p-4 font-medium">
                        <li>
                            <button
                                onClick={() => setActiveSection('savedProperties')}
                                className="flex items-center p-2 text-black-900 hover:text-white rounded-lg hover:bg-blue-700 w-full text-left"
                            >
                                Saved Properties
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => setActiveSection('frequentlyVisited')}
                                className="flex items-center p-2 text-black-900 hover:text-white rounded-lg hover:bg-blue-700 w-full text-left"
                            >
                                Frequently Visited
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => setActiveSection('settings')}
                                className="flex items-center p-2 text-black-900 hover:text-white rounded-lg hover:bg-blue-700 w-full text-left"
                            >
                                Settings
                            </button>
                        </li>
                    </ul>
                </aside>
                <button 
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
                    className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                    aria-controls="default-sidebar"
                    data-drawer-toggle="default-sidebar"
                    type="button"
                ></button> */}

                {/* Page content */}
                <div className="flex-1 pl-64">
                    {renderContent()}
                </div>
            </div>
        </>
    );
}

export default Dashboard; 


