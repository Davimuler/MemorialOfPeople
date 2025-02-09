import React from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';

const Registration = () => {
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
                    Регистрация
                </Typography>
                {['Имя', 'Фамилия', 'Email', 'Номер телефона,','Введіть пароль','Підтвердіть пароль'].map((label, index) => (
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
                    Зарегистрироваться
                </Button>
                <Typography
                    sx={{
                        marginTop: 2,
                        textAlign: 'center',
                        fontSize: '14px',
                        color: '#555',
                    }}
                >
                    Вже є акаунт? <a href="/login" style={{ color: '#1E90FF', textDecoration: 'none' }}>Увійдіть тут</a>
                </Typography>
            </Box>
        </Container>
    );
};

export default Registration;
