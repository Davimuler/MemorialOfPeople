import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import { Route, Routes } from "react-router";
import Registration from "./Registration/Registration";
import Login from "./Login/Login";
import Page from "./Page/Page";
import CreatePage from "./CreatePage/CreatePage";

function Main() {
    return (
            <Container sx={{ mt: 5, textAlign: 'center' }}>
                <Routes>
                    <Route path="/*" element={
                        <Box>
                            <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
                                Welcome to the website
                            </Typography>
                            <Typography variant="body1" sx={{ color: '#333' }}>
                                Here will be main information.
                            </Typography>
                        </Box>
                    } />
                    <Route path="register" element={<Registration />} />

                    <Route path="login" element={<Login />} />
                    <Route path="page/*" element={<Page/>} />
                    <Route path="createpage/*" element={<CreatePage/>} />
                </Routes>
            </Container>

    );
}

export default Main;
