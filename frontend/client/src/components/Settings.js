import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Map from '../components/Map'
import { Typography, Input, Button } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

//import Test from '../components/Navbar'
import Explore from "../pages/Explore";

const { Title } = Typography;

const Settings = ({ userId }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [showNameSave, setShowNameSave] = useState(false);
    const [showEmailSave, setShowEmailSave] = useState(false);
    /*
    const [savedProperties, setSavedProperties] = useState([]);
    const [residences, setResidences] = useState([]);
*/
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState(null); // Define token state

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        setIsAuthenticated(storedToken !== null);
        setToken(storedToken); // Set token state
    }, []);

    //Get current user email and name data
    useEffect(() => {
        const fetchData = async () => {
            const storedToken = localStorage.getItem('token');
            if (storedToken) {
                try {
                    const response = await axios.get('account', {
                        headers: { Authorization: `Bearer ${storedToken}` },
                    });
                    setName(response.data.name);
                    setEmail(response.data.email);
                } catch (error) {
                    console.error('Error fetching account details:', error);
                }
            }
        };

        fetchData();
    }, []);

    const updateEmail = async () => {
        try {
            console.log('Saving email:', email);
            await axios.patch('/auth/update-email', { newEmail: email }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            alert('Email updated successfully');
            setShowEmailSave(false);
        } catch (error) {
            if (error.response && error.response.status === 409) {
                alert('This email is already in use');
            } else {
                alert('Failed to update email');
            }
        }
    };

    const updatePassword = async () => {
        if (newPassword !== confirmNewPassword) { // Assuming you have a state for confirmNewPassword
            alert('New passwords do not match');
            return;
        }
        try {
            // Implement the API call to save the email
            console.log('Saving password');
                await axios.patch('/auth/update-password', { currentPassword: password, newPassword: newPassword }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            alert('Password updated successfully');
        } catch (error) {
            if (error.response && error.response.status === 409) {
                alert('Current password is incorrect');
            } else {
                alert('Failed to update password');
            }
        }
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
        setShowNameSave(true);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setShowEmailSave(true);
    };

    const handlePasswordChange = (e) => {
        setNewPassword(e.target.value);
    };

    const handleOldPassword = (e) => {
        setPassword(e.target.value);
    };

    const saveName = async () => {
        // Implement the API call to save the name
        console.log('Saving name:', name);
        setShowNameSave(false);
    };

    return (
        <div style={{ flex: '1', margin: '5%' , boxSizing: 'border-box' }}>
            <div className='flex flex-col space-y-4'>
                <Title level={4}>Name</Title>
                <div className='flex justify-between items-center'>
                    <Input
                        showCount
                        maxLength={20}
                        value={name}
                        onChange={handleNameChange}
                        onFocus={() => setShowNameSave(true)}
                        style={{ width: '45%' }}
                    />
                    {showNameSave && (
                        <Button type="primary" onClick={saveName} style={{ backgroundColor: '#1890ff', color: 'white' }}>Save Changes</Button>
                    )}
                </div>
                <Title level={4}>Email</Title>
                <div className='flex justify-between items-center'>
                    <Input
                        value={email}
                        onChange={handleEmailChange}
                        onFocus={() => setShowEmailSave(true)}
                        style={{ width: '45%' }}
                    />
                    {showEmailSave && (
                        <Button type="primary" onClick={updateEmail} style={{ backgroundColor: '#1890ff', color: 'white' }}>Save Changes</Button>
                    )}
                </div>
                <Title level={4}>Modify Password</Title>
                <div className='flex justify-between items-center'>
                    <div className='flex justify-between items-center' style={{width: '80%'}}>
                    <Input.Password
                        placeholder="Current Password"
                        iconRender={(visible) => (visible ? <EyeTwoTone/> : <EyeInvisibleOutlined/>)}
                        style={{width: '32%'}}
                    />
                    <Input.Password
                        placeholder="New Password"
                        iconRender={(visible) => (visible ? <EyeTwoTone/> : <EyeInvisibleOutlined/>)}
                        style={{width: '32%'}}
                    />
                    <Input.Password
                        placeholder="Confirm New Password"
                        iconRender={(visible) => (visible ? <EyeTwoTone/> : <EyeInvisibleOutlined/>)}
                        style={{width: '32%'}}
                    />
                    </div>
                    <div className='flex justify-between items-center' style={{justifyContent: 'flex-end'}}>
                        <Button type="primary" onClick={updatePassword} style={{backgroundColor: '#1890ff', color: 'white'}}>Save
                            Changes</Button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Settings; 
