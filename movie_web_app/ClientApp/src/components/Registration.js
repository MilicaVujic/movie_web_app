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
    const navigate = useNavigate(); 


    const handleSubmit = async (e) => {
        e.preventDefault();

       
        if (!name || !surname || !email || !password || !confirmPassword) {
            setError('All fields are required.');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        
        if (password.length < 6) {
            setError('Password must be at least 6 characters long.');
            return;
        }

        const registrationData = {
            Name: name,
            Surname: surname,
            Username: email, 
            Password: password,
        };

        try {
            const response = await fetch('http://192.168.0.25:5092/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(registrationData),
            });

            if (response.status === 409) { 
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
            navigate("/login")
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
            <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
        </Container>
    );
};

export default Registration;
