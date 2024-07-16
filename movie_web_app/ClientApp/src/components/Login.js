import React, { useState } from 'react';
import { TextField, Button, Typography, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); 

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch('http://192.168.0.25:5092/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    password
                })
            });
        
            if (!response.ok) {
                throw new Error('Login failed');
            }
        
            const token = response.headers.get('Accesstoken'); 
            localStorage.setItem('accessToken', token);
            navigate('/home'); 
        } catch (err) {
            setError('Login failed. Please check your credentials.');
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px' }}>
            <Typography variant="h4" gutterBottom>
                Login
            </Typography>
            <form onSubmit={handleLogin}>
                <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {error && <Typography color="error">{error}</Typography>}
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Login
                </Button>
            </form>
            <Typography style={{ marginTop: '10px' }}>
                Don't have an account?{' '}
                <Link href="/registration" color="primary">
                    Register now!
                </Link>
            </Typography>
            <Typography style={{ marginTop: '10px' }}>
                <Link href="/resetpassword" color="primary">
                    Forgot Password? Click for reset
                </Link>
            </Typography>
            <br></br><br></br><br></br><br></br>
            <br></br><br></br><br></br><br></br>
            <br></br><br></br><br></br><br></br>
        </div>
    );
};

export default Login;
