import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '../components/common/Button';
import { ContentCard } from '../components/common/ContentCard';
import { ContentPage } from '../components/common/ContentPage';
import { Input } from '../components/common/Input';
import { useLogin } from '../hooks/useAuth';

export const LoginPage = () => {
    const [userName, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const loginMutation = useLogin();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await loginMutation.mutateAsync({ userName, password });
            navigate('/');
        } catch {}
    };

    const handleDemoSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await loginMutation.mutateAsync({ userName: 'testuser', password: 'testuserpassword' });
            navigate('/');
        } catch {}
    };

    return (
        <ContentPage>
            <ContentCard className="max-w-lg">
                <form onSubmit={handleSubmit}>
                    <h2 className="text-2xl font-bold mb-6 text-center text-text-primary">Login</h2>

                    <Input
                        placeholder="Username"
                        value={userName}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <Input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mb-6"
                    />

                    <Button type="primary" className="w-full mb-4">
                        {loginMutation.isPending ? 'Logging in...' : 'Login'}
                    </Button>

                    {loginMutation.isError && (
                        <p className="text-text-danger text-sm text-center mt-2">
                            Invalid credentials
                        </p>
                    )}
                </form>

                <div className="mb-4 text-center">
                    <h3 className="text-lg font-semibold text-text-primary mb-1">
                        Recruiter / Guest?
                    </h3>
                    <p className="text-sm text-text-secondary leading-relaxed">
                        Explore the admin interface safely in{' '}
                        <span className="font-bold text-text-accent">Read-Only Mode</span>.
                        <br />
                        No password required.
                    </p>
                </div>

                <Button
                    type="secondary"
                    htmlType="button"
                    onClick={handleDemoSubmit}
                    className="w-full flex items-center justify-center gap-2 group"
                    title="Log in as a guest user"
                >
                    <span className="material-symbols-outlined">visibility</span>
                    Try Demo Login
                </Button>
            </ContentCard>
        </ContentPage>
    );
};
