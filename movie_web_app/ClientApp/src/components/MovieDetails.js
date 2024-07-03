import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, Typography, Card, CardMedia, CardContent } from '@mui/material';
import { useParams } from 'react-router-dom'; // Importovanje useParams umesto withRouter

function MovieDetails() {
    const { id } = useParams(); // Koristi useParams za dobijanje parametara iz URL-a

    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const response = await axios.get(`https://localhost:7004/api/movie/${id}`);
                console.log('Movie details:', response.data);
                setMovie(response.data);
                setLoading(false);
            } catch (error) {
                console.error('There was an error!', error);
                setLoading(false);
            }
        };

        fetchMovie();
    }, [id]); // Dodaj id kao zavisnost useEffect-a da se komponenta ponovo učitava kada se promeni id

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!movie) {
        return <p>Movie not found.</p>;
    }

    const { title, genre, duration, year, rating, coverImage, description, actors } = movie;

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
                <Card>
                    <CardMedia
                        component="img"
                        height="100%"
                        image={coverImage}
                        alt="Movie Cover"
                    />
                </Card>
            </Grid>
            <Grid item xs={12} md={6}>
                <Card>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            <strong>Genre:</strong> {genre}<br />
                            <strong>Duration:</strong> {duration} min<br />
                            <strong>Year:</strong> {year}<br />
                            <strong>Rating:</strong> {rating}<br /><br />
                            <strong>Description:</strong><br />
                            {description}<br /><br />
                            <strong>Actors:</strong><br />
                            {actors.map(actor => (
                                <span key={actor.id}>{actor.name} {actor.surname}<br /></span>
                            ))}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
}

export default MovieDetails;
