import React, { useState } from 'react';
import { AppBar, Box, Button, Paper, Toolbar, Typography, IconButton, Avatar, Menu, MenuItem } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from "../../redux/authSlice";

const Header = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);
    const isLoggedIn = !!user;
    const profileImage = user?.profileImage || null;

    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        dispatch(logout());
        handleMenuClose();
    };

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
                    {isLoggedIn ? (
                        <>
                            <Box
                                sx={{
                                    position: 'relative',
                                    left: '-20px',
                                }}
                            >
                                <IconButton
                                    sx={{ backgroundColor: '#fff', borderRadius: '50%', p: 1 }}
                                    onClick={handleMenuOpen}
                                >
                                    {profileImage ? (
                                        <Avatar src={profileImage} sx={{ width: 56, height: 56 }} />
                                    ) : (
                                        <AccountCircleIcon sx={{ color: '#4b6076', fontSize: '3rem' }} />
                                    )}
                                </IconButton>
                                <Menu
                                    anchorEl={anchorEl}
                                    open={Boolean(anchorEl)}
                                    onClose={handleMenuClose}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'center',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'center',
                                    }}
                                    sx={{
                                        '& .MuiPaper-root': {
                                            borderRadius: '10px',
                                            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                                            minWidth: '250px', // Увеличиваем ширину меню
                                        },
                                    }}
                                >
                                    <MenuItem
                                        onClick={() => {
                                            window.location.href = '/dashboard';
                                            handleMenuClose();
                                        }}
                                        sx={{
                                            justifyContent: 'flex-start', // Текст по левому краю
                                            '&:hover': {
                                                backgroundColor: 'rgba(30, 144, 255, 0.1)',
                                            },
                                        }}
                                    >
                                        Мій профіль
                                    </MenuItem>
                                    <MenuItem
                                        onClick={handleLogout}
                                        sx={{
                                            justifyContent: 'flex-start', // Текст по левому краю
                                            '&:hover': {
                                                backgroundColor: 'rgba(255, 0, 0, 0.1)',
                                            },
                                        }}
                                    >
                                        Вийти
                                    </MenuItem>
                                </Menu>
                            </Box>
                        </>
                    ) : (
                        <>
                            <Button
                                onClick={() => window.location.href = '/login'}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1,
                                    border: '1px solid #1E90FF',
                                    backgroundColor: 'transparent',
                                    color: '#1E90FF',
                                    borderRadius: '10px',
                                    mx: 1,
                                    '&:hover': {
                                        backgroundColor: 'rgba(30, 144, 255, 0.1)',
                                    },
                                }}
                            >
                                Вхід
                            </Button>
                            <Button
                                onClick={() => window.location.href = '/register'}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1,
                                    border: '1px solid #1E90FF',
                                    backgroundColor: 'transparent',
                                    color: '#1E90FF',
                                    borderRadius: '10px',
                                    mx: 1,
                                    '&:hover': {
                                        backgroundColor: 'rgba(30, 144, 255, 0.1)',
                                    },
                                }}
                            >
                                Реєстрація
                            </Button>
                        </>
                    )}
                </Box>

            </Toolbar>
        </AppBar>
    );
}

export default Header;