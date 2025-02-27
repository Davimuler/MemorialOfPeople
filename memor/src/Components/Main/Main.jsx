import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import { Route, Routes } from "react-router";
import Registration from "./Registration/Registration";
import Login from "./Login/Login";
import Page from "./Page/Page";
import CreatePage from "./CreatePage/CreatePage";
import Dashboard from "./Dashboard/Dashboard";
import EditPage from "./EditPage/EditPage";
import ProtectedRoute from '../ProtectedRoute';
import FileUploader from "./TestApi"; // Імпортуємо ProtectedRoute

function Main() {
    return (
        <Container sx={{ mt: 5, textAlign: 'center' }}>
            <Routes>
                {/* Головна сторінка */}
                <Route
                    path="/*"
                    element={
                        <Box>
                            <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
                                Welcome to the website
                            </Typography>
                            <Typography variant="body1" sx={{ color: '#333' }}>
                                Here will be main information.
                            </Typography>
                        </Box>
                    }
                />

                {/* Публічні маршрути */}
                <Route path="register" element={<Registration />} />
                <Route path="login" element={<Login />} />
                <Route path="page/*" element={<Page />} />
                <Route path="test/*" element={<FileUploader />} />
                {/* Захищені маршрути */}

                <Route
                    path="createpage/*"
                    element={
                        <ProtectedRoute>
                            <CreatePage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="editpage"
                    element={
                        <ProtectedRoute>
                            <EditPage />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </Container>
    );
}

export default Main;