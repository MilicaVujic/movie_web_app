import React, { useState } from 'react';
import {
    TextField,
    Button,
    Container,
    Typography,
    Alert,
} from '@mui/material';

const Registration = () => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Proverite da li su sva polja popunjena
        if (!name || !surname || !email || !password || !confirmPassword) {
            setError('All fields are required.');
            return;
        }

        // Proverite da li se lozinke poklapaju
        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        // Proverite dužinu lozinke
        if (password.length < 6) {
            setError('Password must be at least 6 characters long.');
            return;
        }

        const registrationData = {
            Name: name,
            Surname: surname,
            Username: email, // Assuming Username is used as Email
            Password: password,
        };

        try {
            const response = await fetch('http://192.168.1.3:5092/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(registrationData),
            });

            if (response.status === 409) { // Handle conflict status
                setError('Email already exists.');
                return;
            }

            if (!response.ok) {
                throw new Error('Registration failed');
            }

            setSuccess('Registration successful!');
            setName('');
            setSurname('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            setError('');
        } catch (err) {
            setError(err.message);
            setSuccess('');
        }
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" gutterBottom>
                Register
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="First Name"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <TextField
                    label="Last Name"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                />
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
                <TextField
                    label="Confirm Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {error && <Alert severity="error">{error}</Alert>}
                {success && <Alert severity="success">{success}</Alert>}
                <Button variant="contained" color="primary" type="submit">
                    Register
                </Button>
            </form>
        </Container>
    );
};

export default Registration;
