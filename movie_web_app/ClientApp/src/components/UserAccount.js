import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Container } from '@mui/material';

const UserAccount = () => {
    const [user, setUser] = useState({ name: '', surname: '', username: '' }); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                const response = await axios.get('http://localhost:5092/api/users', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setUser({
                    name: response.data.name,         
                    surname: response.data.surname,
                    username: response.data.username
                });
                localStorage.setItem("account", JSON.stringify(response.data));

            } catch (err) {
                //setError('Error fetching user data');
                console.log(JSON.parse(localStorage.getItem("account")).name)
                setUser({
                    name: JSON.parse(localStorage.getItem("account")).name,         
                    surname: JSON.parse(localStorage.getItem("account")).surname,
                    username: JSON.parse(localStorage.getItem("account")).username
                });
                setLoading(false);

            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    const handleUpdate = async () => {
        try {
            const token = localStorage.getItem('accessToken');
            await axios.patch('http://localhost:5092/api/users', {
                name: user.name,                  
                surname: user.surname
            },
             {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            alert('User updated successfully');
        } catch (err) {
            setError('Error updating user data');
        }
    };

    if (loading) return <Typography>Loading...</Typography>;
    if (error) return <Typography color="error">{error}</Typography>;

    return (
        <Container>
            <Typography variant="h4">User Profile</Typography>
            <TextField
                label="Name"
                variant="outlined"
                value={user.name}                  
                onChange={(e) => setUser({ ...user, name: e.target.value })} 
                fullWidth
                margin="normal"
            />
            <TextField
                label="Surname"
                variant="outlined"
                value={user.surname}               
                onChange={(e) => setUser({ ...user, surname: e.target.value })} 
                fullWidth
                margin="normal"
            />
            <TextField
                label="Username"
                variant="outlined"
                value={user.username}              
                disabled
                fullWidth
                margin="normal"
            />
            <Button variant="contained" color="primary" onClick={handleUpdate}>
                Update
            </Button>
            <br></br><br></br><br></br><br></br>
            <br></br><br></br><br></br><br></br>
            <br></br><br></br><br></br><br></br>
            <br></br><br></br><br></br><br></br>
            <br></br><br></br><br></br>

        </Container>
    );
};

export default UserAccount;
