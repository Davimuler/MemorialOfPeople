import React from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';

const Login = () => {
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
                {[ 'Email або номер телефона', 'Пароль'].map((label, index) => (
                    <TextField
                        key={index}
                        label={label}
                        variant="standard"
                        fullWidth
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
                >
                    Увійти
                </Button>
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
