import React from "react";
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import Header from "./components/common/Header";
import ActiveResumePage from "./pages/ActiveResumePage";
import {ResumeListPage} from "./pages/ResumeListPage";
import {ResumeEditPage} from "./pages/ResumeEditPage";
import {LoginPage} from "./pages/LoginPage";
import {PrivateRoute} from "./utils/PrivateRoute";
import {JobApplicationListPage} from "./pages/JobApplicationListPage";
import {JobApplicationEditPage} from "./pages/JobApplicationEditPage";

function App() {
    return (
        <Router>
            <div className="bg-page font-sans min-h-screen">
                <Header />
                <main>
                    <Routes>
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/resume/active" element={<ActiveResumePage />} />

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
                                <PrivateRoute>
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
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;
