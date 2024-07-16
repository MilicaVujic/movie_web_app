import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';

const ResetPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleResetPassword = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://192.168.0.25:5092/api/users/send-reset-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email
                })
            });

            if (!response.ok) {
                throw new Error('Failed to send reset email');
            }

            setMessage('Password reset email sent. Please check your inbox.');
        } catch (error) {
            setMessage('Failed to send reset email. Please try again later.');
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px' }}>
            <Typography variant="h4" gutterBottom>
                Reset Password
            </Typography>
            <form onSubmit={handleResetPassword}>
                <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Reset Password
                </Button>
            </form>
            {message && <Typography style={{ marginTop: '10px' }}>{message}</Typography>}
            <br></br><br></br><br></br><br></br>
            <br></br><br></br><br></br><br></br>
            <br></br><br></br><br></br><br></br>
            <br></br><br></br><br></br><br></br>
            <br></br><br></br><br></br>
        </div>
    );
};

export default ResetPassword;
