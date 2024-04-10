import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Map from '../components/Map'
import { message, Typography, Input, Button } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

//import Test from '../components/Navbar'
import Explore from "../pages/Explore";

const { Title } = Typography;

const Settings = ({ userId }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    const [currentPasswordValid, setCurrentPasswordValid] = useState(true);
    const [passwordError, setPasswordError] = useState(false);
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);

    const [showNameSave, setShowNameSave] = useState(false);
    const [showEmailSave, setShowEmailSave] = useState(false);

    const [savedProperties, setSavedProperties] = useState([]);
    const [residences, setResidences] = useState([]);

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState(null); // Define token state

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        setIsAuthenticated(storedToken !== null);
        setToken(storedToken); // Set token state
    }, []);


    const validatePassword = () => {
        if (newPassword.length < 6) {
            setPasswordError('Password must be at least 6 characters');
            return false;
        }
        setPasswordError('');
        return true;
    };

    //Get current user email and name data
    useEffect(() => {
        const fetchData = async () => {
            const storedToken = localStorage.getItem('token');
            if (storedToken) {
                try {
                    const response = await axios.get(`http://localhost:3000/auth/${userId}`, {
                        headers: { Authorization: `Bearer ${storedToken}` },
                    });
                    setName(response.data.name);
                    setEmail(response.data.email);
                    console.log(name);
                    console.log(email);
                } catch (error) {
                    console.error('Error fetching account details:', error);
                }
            }
        };

        fetchData();
    }, []);

    const saveName = async () => {
        if(name.length < 1){
            message.error('Name must not be empty');
        }
        try {
            console.log('Saving name:', name);
            await axios.patch('http://localhost:3000/auth/update-name', { name: name }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            message.success('Name updated successfully');
            setShowNameSave(false);
        } catch (error) {
                message.error('Failed to update name');
        }
    };

    const updateEmail = async () => {
        try {
            console.log('Saving email:', email);
            await axios.patch('http://localhost:3000/auth/update-email', { email: email }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            message.success('Email updated successfully');
            setShowEmailSave(false);
        } catch (error) {
            if (error.response && error.response.status === 409) {
                message.error('Email already in use');
            } else {
                message.error('Failed to update email');
            }
            console.log(error.response);
        }
    };

    const updatePassword = async () => {
        const isPasswordValid = validatePassword();
        const isConfirmPasswordValid = validateConfirmPassword();
        if (!isPasswordValid || !isConfirmPasswordValid) {
            message.error('Please correct the errors before saving.');
            return;
        }

        try {
            // Implement the API call to save the email
            console.log('Saving password');
                await axios.patch('http://localhost:3000/auth/update-password', { currentPassword: password, newPassword: newPassword }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            message.success('Password updated successfully');
            // Reset password fields and related validation states upon successful update
            setPassword('');
            setNewPassword('');
            setConfirmNewPassword('');
            setCurrentPasswordValid(true);
            setPasswordError('');
            setConfirmPasswordError('');
        } catch (error) {
            setCurrentPasswordValid(false)
            // Check if the error response has data and a message, then display it
            if (error.response && error.response.data && error.response.data.message) {
                message.error(error.response.data.message);
            } else {
                // Generic error message if specific error message is not found
                message.error('Failed to update password. Please try again later.');
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

    const validateConfirmPassword = (password, confirmPassword) => {
        if (password != confirmPassword) {
            setConfirmPasswordError('Passwords do not match');
            return false;
        }
        setConfirmPasswordError('');
        return true;
    };

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setNewPassword(newPassword);
        validateConfirmPassword(newPassword, confirmNewPassword);
        if(newPassword.length < 6) {
            setPasswordError("Password must be at least 6 characters long"); //Sets password error to be true
            return false;
        }
        else {
            setPasswordError(""); //Set password error to be false
            return true;
        }
    };

    const handleOldPassword = (e) => {
        setPassword(e.target.value);

    };
    const handleConfirmPasswordChange = (e) => {
        const newConfirmPassword = e.target.value;
        setConfirmNewPassword(newConfirmPassword);
        validateConfirmPassword(newPassword, newConfirmPassword);
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

                    <Button type="primary" onClick={saveName} style={{ backgroundColor: '#1890ff', color: 'white' }}>Save Changes</Button>

                </div>
                <Title level={4}>Email</Title>
                <div className='flex justify-between items-center'>
                    <Input
                        value={email}
                        onChange={handleEmailChange}
                        onFocus={() => setShowEmailSave(true)}
                        style={{ width: '45%' }}
                    />

                    <Button type="primary" onClick={updateEmail} style={{ backgroundColor: '#1890ff', color: 'white' }}>Save Changes</Button>

                </div>
                <Title level={4}>Modify Password</Title>
                <div className='flex justify-between items-start' >
                    <div className='flex justify-between items-start' style={{width: '80%'}}>
                        <Input.Password
                            status={!currentPasswordValid ? "error" : ""}
                            placeholder="Current Password"
                            onChange={(e) => { handleOldPassword(e); setCurrentPasswordValid(true); }}
                            iconRender={(visible) => (visible ? <EyeTwoTone/> : <EyeInvisibleOutlined/>)}
                            style={{width: '32%'}}
                        />
                        <div className='flex flex-col space-y-4' style={{width: '32%'}}>
                            <Input.Password
                                placeholder="New Password"
                                onChange={handlePasswordChange}
                                iconRender={(visible) => (visible ? <EyeTwoTone/> : <EyeInvisibleOutlined/>)}
                                style={{width: '100%'}}
                                status={passwordError ? "error" : ""}
                            />
                            {passwordError && <div style={{ color: 'red', fontSize: '14px'}}>{passwordError}</div>}
                        </div>
                        <div className='flex flex-col space-y-4' style={{width: '32%'}}>
                            <Input.Password
                                placeholder="Confirm New Password"
                                onChange={handleConfirmPasswordChange}
                                iconRender={(visible) => (visible ? <EyeTwoTone/> : <EyeInvisibleOutlined/>)}
                                style={{width: '100%'}}
                                status={confirmPasswordError ? "error" : ""}
                            />
                            {confirmPasswordError && <div style={{ color: 'red' , fontSize: '14px'}}>{confirmPasswordError}</div>}
                        </div>
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
