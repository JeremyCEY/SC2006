import React, { useState, useEffect } from 'react';

import LoggedInNavbar from '../components/LoggedInNavbar';
import SavedProperties from './SavedProperties'; 
import FrequentLocations from './FrequentAddress';
import Settings from '../components/Settings';

import { jwtDecode } from 'jwt-decode';

import { Menu, Layout } from 'antd'

const { Sider } = Layout;

function Dashboard() {
    const [activeSection, setActiveSection] = useState('savedProperties');

    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode(token);
            setUserId(decodedToken.id);
        } else {
            console.log('No token found in local storage');
        }
    }, [userId]);

    const handleMenuClick = (key) => {
        setActiveSection(key);
    };

    const renderContent = () => {
        if (!userId) {
            return <div>Loading...</div>;
        }
    
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

    return (
        <>
            <LoggedInNavbar />

            <div className="flex" >
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

                <div className="flex-grow">
                    {renderContent()}
                </div>
            </div>
        </>
    );
}

export default Dashboard; 


