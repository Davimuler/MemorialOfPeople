import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import axios from 'axios';
import GoogleIcon from '@mui/icons-material/Google';
import { GoogleLogin } from '@react-oauth/google';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', {
                email,
                password
            });

            // Handle successful login
            console.log(response.data);
            setSuccess('Вхід успішний!');
            setError(''); // Clear error message if login is successful
        } catch (err) {
            // Handle error
            setError('Невірні дані для входу');
            setSuccess(''); // Clear success message if login fails
        }
    };

    const handleGoogleLogin = async (credentialResponse) => {
        try {
            const { credential } = credentialResponse;

            // Логируем токен, чтобы убедиться, что он приходит правильно
            console.log("Google Token ID:", credential);

            // const response = await axios.post('http://localhost:5000/api/auth/google', {
            //     tokenId: credential
            // });

            // console.log("Server Response:", response.data);
            setSuccess('Вхід через Google успішний!');
            setError('');
        } catch (err) {
            console.error("Google Login Error:", err);
            if (err.response) {
                console.error("Server Response Error:", err.response.data);
            }
            setError('Помилка авторизації через Google');
        }
    };


    return (
        <Container maxWidth="xs">
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    mt: 5,
                    p: 3,
                    borderRadius: 2,
                    boxShadow: 3
                }}
            >
                <Typography variant="h5" align="center" gutterBottom>
                    Вхід в аккаунт
                </Typography>
                {['Email', 'Пароль'].map((label, index) => (
                    <TextField
                        key={index}
                        label={label}
                        variant="standard"
                        fullWidth
                        type={label === 'Пароль' ? 'password' : 'text'}
                        value={label === 'Email' ? email : password}
                        onChange={(e) => label === 'Email' ? setEmail(e.target.value) : setPassword(e.target.value)}
                        InputProps={{
                            sx: {
                                '&:before': {
                                    borderBottom: '2px solid #ccc',
                                    transition: 'border-color 0.3s ease',
                                },
                                '&:hover:not(.Mui-disabled):before': {
                                    borderBottom: '2px solid #1E90FF',
                                },
                                '&.Mui-focused:before': {
                                    borderBottom: '2px solid #1E90FF',
                                },
                                '&:after': {
                                    borderBottom: '2px solid #1E90FF',
                                },
                            },
                        }}
                    />
                ))}
                {error && (
                    <Typography sx={{ fontSize: '14px', color: 'red', textAlign: 'center' }}>
                        {error}
                    </Typography>
                )}
                {success && (
                    <Typography sx={{ fontSize: '14px', color: 'green', textAlign: 'center' }}>
                        {success}
                    </Typography>
                )}
                <Typography
                    sx={{
                        fontSize: '14px',
                        color: '#1E90FF',
                        cursor: 'pointer',
                        textDecoration: 'underline',
                        textAlign: 'right',
                    }}
                >
                    Забули пароль?
                </Typography>
                <Button
                    sx={{
                        backgroundColor: '#1E90FF',
                        color: '#fff',
                        borderRadius: '10px',
                        whiteSpace: 'nowrap',
                        '&:hover': {
                            backgroundColor: '#00BFFF',
                        },
                    }}
                    fullWidth
                    onClick={handleSubmit}
                >
                    Увійти
                </Button>

                {/* Кастомная кнопка для Google входа */}
                {/*<GoogleLogin*/}
                {/*    onSuccess={handleGoogleLogin}*/}
                {/*    onError={() => setError('Помилка авторизації через Google')}*/}
                {/*    useOneTap*/}
                {/*    shape="rectangular"*/}
                {/*    render={(renderProps) => (*/}
                {/*        <Button*/}
                {/*            sx={{*/}
                {/*                backgroundColor: 'transparent',*/}
                {/*                color: '#1E90FF',*/}
                {/*                borderRadius: '10px',*/}
                {/*                padding: '8px 16px',*/}
                {/*                display: 'flex',*/}
                {/*                alignItems: 'center',*/}
                {/*                justifyContent: 'center',*/}
                {/*                width: '100%',*/}
                {/*                border: '2px solid #1E90FF',*/}
                {/*                '&:hover': {*/}
                {/*                    backgroundColor: 'rgba(30, 144, 255, 0.1)',*/}
                {/*                    borderColor: '#1E90FF',*/}
                {/*                },*/}
                {/*            }}*/}
                {/*            onClick={renderProps.onClick}*/}
                {/*            disabled={renderProps.disabled}*/}
                {/*        >*/}
                {/*            <GoogleIcon sx={{ fontSize: '24px', marginRight: '8px' }} />*/}
                {/*            Вхід через Google*/}
                {/*        </Button>*/}
                {/*    )}*/}
                {/*/>*/}

                <Typography
                    sx={{
                        marginTop: 2,
                        textAlign: 'center',
                        fontSize: '14px',
                        color: '#555',
                    }}
                >
                    Немає акаунту? <a href="/register" style={{ color: '#1E90FF', textDecoration: 'none' }}>Створити акаунт</a>
                </Typography>
            </Box>
        </Container>
    );
};

export default Login;
