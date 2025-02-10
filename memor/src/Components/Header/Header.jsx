import React from 'react';
import { AppBar, Box, Button, Paper, Toolbar, Typography, IconButton } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Header = () => {
    return (
        <AppBar position="sticky" sx={{ backgroundColor: '#fafafa', boxShadow: 'none' }}>
            <Toolbar sx={{ position: 'relative', justifyContent: 'space-between', px: 2, minHeight: '180px' }}>

                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <img
                        src="/Logo.jpg"
                        alt="Logo"
                        style={{ height: '40px', marginRight: '10px' }}
                    />
                    <Typography variant="h6" sx={{ color: '#333', lineHeight: 1 }}>
                        Жива пам'ять
                    </Typography>
                </Box>

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
                            minWidth: '700px'
                        }}
                    >
                        <Button sx={{ color: '#333', borderRadius: '50px', mx: 3 }}>
                            Головна
                        </Button>
                        <Button sx={{ color: '#333', borderRadius: '50px', mx: 3 }}>
                            Про нас
                        </Button>
                        <Button sx={{ color: '#333', borderRadius: '50px', mx: 3 }}>
                            Контакти
                        </Button>
                        <Button sx={{ color: '#333', borderRadius: '50px', mx: 3 }}>
                            Послуги
                        </Button>
                    </Paper>
                </Box>

                <Box sx={{ position: 'relative', justifyContent: 'center', alignItems: 'center', display: 'flex', pt: 1, pb: 1 }}>
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
                        + Створити
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
