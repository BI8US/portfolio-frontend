import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { Button } from '../components/common/Button';
import { ContentCard } from '../components/common/ContentCard';
import { ContentPage } from '../components/common/ContentPage';
import { Input } from '../components/common/Input';
import { useLogin } from '../services/auth/hooks';
import { LoginDto } from '../types/auth';

export const LoginPage = () => {
    const [userName, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const loginMutation = useLogin();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const credentials: LoginDto = { userName, password };

        try {
            await loginMutation.mutateAsync(credentials);
            toast.success('Welcome back!');
            navigate('/');
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    const handleDemoSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await loginMutation.mutateAsync({
                userName: 'testuser',
                password: 'testuserpassword',
            });
            toast.info('Logged in as Guest');
            navigate('/');
        } catch (error) {
            toast.error('Demo login failed');
        }
    };

    return (
        <ContentPage>
            <ContentCard className="max-w-md">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-text-accent/10 rounded-full mb-4">
                            <span className="material-symbols-outlined text-4xl text-text-accent">
                                lock_open
                            </span>
                        </div>
                        <h2 className="text-3xl font-bold text-text-primary">Login</h2>
                        <p className="text-text-muted text-sm mt-2">
                            Access your portfolio dashboard
                        </p>
                    </div>

                    <Input
                        label="Username"
                        placeholder="Enter your username"
                        value={userName}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        autoFocus
                    />

                    <Input
                        type="password"
                        label="Password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mb-2"
                        required
                    />

                    {loginMutation.isError && (
                        <div className="flex items-center gap-2 p-3 bg-text-danger/10 border border-text-danger/20 rounded-xl text-text-danger text-sm">
                            <span className="material-symbols-outlined text-lg">error</span>
                            <span>Invalid username or password</span>
                        </div>
                    )}

                    <Button
                        type="primary"
                        htmlType="submit"
                        className="w-full h-12 text-lg font-semibold mt-4"
                        disabled={loginMutation.isPending}
                    >
                        {loginMutation.isPending ? (
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined animate-spin">sync</span>
                                <span>Processing...</span>
                            </div>
                        ) : (
                            'Sign In'
                        )}
                    </Button>
                </form>

                <div className="relative my-8">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-border"></div>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-content px-4 text-text-muted font-medium tracking-widest">
                            or
                        </span>
                    </div>
                </div>

                <div className="text-center mb-6">
                    <h3 className="text-md font-bold text-text-primary mb-2 flex items-center justify-center gap-2">
                        <span className="material-symbols-outlined text-text-accent">
                            verified_user
                        </span>
                        Recruiter / Guest?
                    </h3>
                    <p className="text-xs text-text-secondary leading-relaxed px-4">
                        Explore the admin interface safely in{' '}
                        <span className="font-bold text-text-accent">Read-Only Mode</span>.
                    </p>
                </div>

                <Button
                    type="secondary"
                    htmlType="button"
                    onClick={handleDemoSubmit}
                    className="w-full flex items-center justify-center gap-2 h-11 border-dashed hover:border-solid"
                >
                    <span className="material-symbols-outlined">visibility</span>
                    Try Demo Login
                </Button>
            </ContentCard>
        </ContentPage>
    );
};
