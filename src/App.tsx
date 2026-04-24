import React from 'react';
import { BrowserRouter as Router, Navigate, Outlet, Route, Routes } from 'react-router-dom';

import Header from './components/common/Header';
import ActiveResumePage from './pages/ActiveResumePage';
import { FitnessPage } from './pages/FitnessPage';
import { JobApplicationEditPage } from './pages/JobApplicationEditPage';
import { JobApplicationListPage } from './pages/JobApplicationListPage';
import { LoginPage } from './pages/LoginPage';
import { ResumeEditPage } from './pages/ResumeEditPage';
import { ResumeListPage } from './pages/ResumeListPage';
import { TestSnakePage } from './pages/SnakeGame';
import Valentine from './pages/Valentine';
import { PrivateRoute } from './utils/PrivateRoute';

function App() {
    return (
        <Router>
            <div className="bg-page font-sans min-h-screen flex flex-col">
                <Routes>
                    <Route
                        path="/nikusja"
                        element={
                            <main className="flex-grow">
                                <Valentine />
                            </main>
                        }
                    />

                    <Route
                        element={
                            <>
                                <Header />
                                <main className="flex-grow">
                                    <Outlet />{' '}
                                </main>
                            </>
                        }
                    >
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/resume/active" element={<ActiveResumePage />} />
                        <Route path="/games/snake/" element={<TestSnakePage />} />
                        <Route
                            path="/fitness"
                            element={
                                <PrivateRoute>
                                    <FitnessPage />
                                </PrivateRoute>
                            }
                        />

                        <Route path="/" element={<Navigate to="/resume/active" replace />} />

                        <Route
                            path="/resumes"
                            element={
                                <PrivateRoute>
                                    <ResumeListPage />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/resume/edit/:id"
                            element={
                                <PrivateRoute>
                                    <ResumeEditPage />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/jobapplications"
                            element={
                                <PrivateRoute role={'ADMIN'}>
                                    <JobApplicationListPage />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/jobapplication/edit/:id"
                            element={
                                <PrivateRoute>
                                    <JobApplicationEditPage />
                                </PrivateRoute>
                            }
                        />

                        <Route path="*" element={<p>Page not found</p>} />
                    </Route>
                </Routes>
            </div>
        </Router>
    );
}

export default App;
