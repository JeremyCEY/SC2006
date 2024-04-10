import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import { Button, Input, message, Result } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import * as Yup from 'yup';
import axios from 'axios';
import mainLogo from '../images/logo.png'; // Ensure this path is correct

const initialValues = {
    email: '',
    securityAnswer: '',
};

// Validation schema
const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    securityAnswer: Yup.string().required('Answer is required'),
});

const ForgotPassword = () => {
    const [passwordReset, setPasswordReset] = useState(false);
    const [resetMessage, setResetMessage] = useState('');
    // Function to validate credentials and reset password
    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            const response = await axios.patch('http://localhost:3000/auth/forgetpassword', values);
            // Assuming your backend returns a success message
            message.success(response.data || 'Password reset successfully.');
            setPasswordReset(true);
            setResetMessage(response.data || 'Password reset successfully.');
            resetForm();
        } catch (error) {
            message.error(error.response?.data?.message || 'Failed to reset password.');
            setPasswordReset(false);
        } finally {
            setSubmitting(false);
        }
    };

    if (passwordReset) {
        return (
            <Result
                status="success"
                title={<span className="text-3xl font-bold pb-5">Password Reset Successfully!</span>}
                subTitle={resetMessage}
                extra={[
                    <Button type="primary" key="login" href="/login">
                        Login
                    </Button>,
                ]}
            />
        );
    }

    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
            <a href="/" className="self-start pl-3 pt-3">
                <button type="button" className="text-white bg-blue-800
                                                hover:bg-blue-800 focus:ring-4 focus:outline-none
                                                focus:ring-blue-300 font-medium rounded-full
                                                text-sm p-2.5 text-center inline-flex
                                                items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700
                                                dark:focus:ring-blue-800
                                                pr">
                    <svg className="w-5 h-5 rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                         fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M1 5h12m0 0L9 1m4 4L9 9"/>
                    </svg>
                    <span className="sr-only">Icon description</span>
                </button>
            </a>
            <div className="flex pt-[100px] pb-5">
                <img src={mainLogo} className="h-12 pr-3" alt="Logo"/>
                <span
                    className="self-center text-2xl font-semibold whitespace-nowrap text-black">Sweet Home Finder</span>
            </div>
            <span className="text-3xl font-bold pb-5">Forget Your Password?</span>

            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                {({values, handleChange, handleBlur, handleSubmit, isSubmitting}) => (
                    <Form onSubmit={handleSubmit} style={{width: '30%', minWidth: '300px'}}>
                        <div style={{marginBottom: '15px'}}>
                            <Field name="email">
                                {({field}) => (
                                    <Input
                                        {...field}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.email}
                                        prefix={<MailOutlined style={{marginRight: '8px'}}/>}
                                        placeholder="Email"
                                    />
                                )}
                            </Field>
                        </div>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            margin: '10px 0'
                        }}>
                            <span style={{fontWeight: 'bold', marginRight: '8px'}}>Security Question</span>
                            <span>What's your pet's name?</span>
                        </div>

                        <Field name="securityAnswer">
                            {({field}) => (
                                <Input
                                    {...field}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.securityAnswer}
                                    placeholder="Your answer"
                                    prefix={<LockOutlined style={{marginRight: '8px'}}/>}
                                />
                            )}
                        </Field>
                        <div style={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center', // Horizontally center
                            alignItems: 'center', // Vertically center
                            marginTop: '15px'
                        }}>
                            <button class=" h-[50px] rounded-md bg-blue-800 text-white font-bold text-xl" style={{
                                color: 'white',
                                width: '100%',
                                margin: '10px 0'
                            }} loading={isSubmitting}>
                                Reset Password
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default ForgotPassword;


/*
import React from 'react';
import { Formik } from 'formik';
import {
    SubmitButton,
    Input,
    Checkbox,
    ResetButton,
    FormikDebug,
    Form,
    FormItem,
} from "formik-antd"

import { message } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import * as Yup from 'yup';
import mainLogo from '../images/logo.png'
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const ForgotPassword = () => {
    const initialValues = {
        email: '',
        securityAnswer: '',
    };

// Mock security question for demonstration
    const securityQuestion = "What's your pet's name?";

// Validation schema
    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email address').required('Email is required'),
        securityAnswer: Yup.string().required('Answer is required'),
    });

    const navigate = useNavigate();
    // Function to validate credentials and reset password
    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            const response = await axios.patch('http://localhost:3000/auth/forgetpassword', values);
            message.success(response.data);
        } catch (error) {
            let errorMessage = 'Failed to validate your details. Please try again.';
            if (error.response && error.response.data && error.response.data.message) {
                errorMessage = error.response.data.message;
            }
            message.error(errorMessage);
        } finally {
            setSubmitting(false);
        }
    };
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <div className="flex pt-[100px] pb-5">
                <img src={mainLogo} className="h-12 pr-3" alt="Logo"/>
                <span
                    className="self-center text-2xl font-semibold whitespace-nowrap text-black">Sweet Home Finder</span>
            </div>
            <span className="text-3xl font-bold pb-5">Forget Your Password?</span>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}

                render={() => (
                    <Form>
                        <FormItem name="email">
                            <Input name="email" placeholder="Email" prefix={<MailOutlined/>}/>
                        </FormItem >

                        <div style={{display: 'flex', alignItems: 'center', marginBottom: '24px'}}>
                            <LockOutlined style={{marginRight: '8px'}}/>
                            <span>{securityQuestion}</span>
                        </div>
                        <FormItem name="securityAnswer">
                            <Input name="securityAnswer" placeholder="Your answer"/>
                        </FormItem >
                        <SubmitButton type="primary" htmlType="submit" style={{marginTop: '16px'}}>
                            Submit
                        </SubmitButton>

                    </Form>
                )}
            />
        </div>
    );
}

export default ForgotPassword;
*/