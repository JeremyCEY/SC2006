import React, { useContext, useState, useEffect } from 'react';

import LoggedInNavbar from '../components/LoggedInNavbar';
import SavedProperties from './SavedProperties'; 
import FrequentLocations from './FrequentAddress';
import Settings from '../components/Settings';

import { jwtDecode } from 'jwt-decode';

import { Menu, Layout } from 'antd'

const { Sider } = Layout;

function Dashboard() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('savedProperties');
    // const userId = '65fe8c23cec43e4c08995198'

    const [userId, setUserId] = useState(null); // State for user ID

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode(token);
            setUserId(decodedToken.id); // Set user ID from decoded token
        }
    }, []); // Empty dependency array to run only once on component mount


    {/* Sidebar Selection */}

    const handleMenuClick = (key) => {
        setActiveSection(key);
    };


    const renderContent = () => {
        switch (activeSection) {
            case 'savedProperties':
                return <SavedProperties userId={userId} />;
            case 'frequentlyVisited':
                return <FrequentLocations userId={userId} />;
            case 'settings':
                return <Settings userId={userId} />;
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
                        onClick={({ key }) => handleMenuClick(key)}
                        items = {[
                            {
                                key: 'savedProperties',
                                label: 'Saved Properties',
                            },
                            {
                                key: 'frequentlyVisited',
                                label: 'Frequently Visited',
                            },
                            {
                                key: 'settings',
                                label: 'Settings',
                            },
                            
                        ]}
                    />
                </Sider>

                {/* Page content */}
                <div className="flex">
                    {renderContent()}
                </div>
            </div>
        </>
    );
}

export default Dashboard; 


