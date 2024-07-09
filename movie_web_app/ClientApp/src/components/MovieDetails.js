import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, Typography, Card, CardMedia, CardContent, Container } from '@mui/material';
import { useParams } from 'react-router-dom';
import { ThemeProvider, useTheme } from '@mui/material/styles'; 
import './App.css'; 

const genreNames = {
    0: 'Comedy',
    1: 'Action',
    2: 'Horror',
    3: 'Documentary',
    4: 'Cartoon'
};

function MovieDetails() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const theme = useTheme();

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const response = await axios.get(`http://192.168.0.25:5092/api/movie/${id}`);
                console.log('Movie details:', response.data);
                setMovie(response.data);
                setLoading(false);
            } catch (error) {
                console.error('There was an error!', error);
                console.log("OFFLINE")

                setLoading(false);
                const storedMovies = JSON.parse(localStorage.getItem("movies"));
    
                if (storedMovies) {
                    for (const movie of storedMovies) {
                        console.log(movie); 
                        if (movie.id === id) {
                            setMovie(movie); 
                            break; 
                        }
                    }
                }
            }
        };

        fetchMovie();
    }, [id]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!movie) {
        return <p>Movie not found.</p>;
    }

    const { title, genre, duration, year, rating, coverImage, description, actors, playLink } = movie;

    return (
        <ThemeProvider theme={theme}>
            <div className="movie-details-container">
            <Grid container spacing={3} className="movie-details-container">
                <Grid item xs={12} md={5}>
                    <Card>
                        <CardMedia
                            component="img"
                            height="100%"
                            image={coverImage}
                            alt="Movie Cover"
                            style={{ maxHeight: '100%', objectFit: 'contain' }}
                        />
                    </Card>
                </Grid>
                <Grid item xs={12} md={7}>
                    <Card>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                <strong>Genre:</strong> {genreNames[genre]}<br />
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
            </div>
        </ThemeProvider>
    );
}

export default MovieDetails;
