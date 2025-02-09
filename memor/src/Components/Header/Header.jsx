import React from 'react';
import { AppBar, Box, Button, Paper, Toolbar, Typography, IconButton } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Header = () => {
    return (
        <AppBar position="sticky" sx={{ backgroundColor: '#fafafa', boxShadow: 'none' }}>
            <Toolbar sx={{ position: 'relative', justifyContent: 'space-between', px: 2 }}>
                <Typography variant="h6" sx={{ color: '#333' }}>
                    Простое приложение
                </Typography>


                <Box sx={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
                    <Paper
                        sx={{
                            backgroundColor: '#fff',
                            borderRadius: '50px',
                            p: 1,
                            boxShadow: 1,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            minWidth: '300px'
                        }}
                    >
                        <Button sx={{ color: '#333', borderRadius: '50px', mx: 1 }}>
                            Главная
                        </Button>
                        <Button sx={{ color: '#333', borderRadius: '50px', mx: 1 }}>
                            О нас
                        </Button>
                        <Button sx={{ color: '#333', borderRadius: '50px', mx: 1 }}>
                            Контакты
                        </Button>
                        <Button sx={{ color: '#333', borderRadius: '50px', mx: 1 }}>
                            Услуги
                        </Button>
                    </Paper>
                </Box>
                <Box sx={{ position: 'relative', justifyContent: 'center',
                    alignItems: 'center', display: 'flex',  }}>
                    <Button
                        sx={{
                            backgroundColor: '#1E90FF',
                            color: '#fff',
                            borderRadius: '10px',
                            position: 'absolute',
                            whiteSpace: 'nowrap',
                            right: '80px',
                            '&:hover': {
                                backgroundColor: '#00BFFF',
                            },
                        }}
                    >
                     + Создать
                    </Button>
                    <IconButton sx={{ backgroundColor: '#fff', borderRadius: '50%', p: 1 }}>
                        <AccountCircleIcon sx={{ color: '#4b6076', fontSize: '3rem' }} />
                    </IconButton>
                </Box>

            </Toolbar>
        </AppBar>
    );
}

export default Header;
