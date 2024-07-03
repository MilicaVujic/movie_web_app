import React, { Component } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Link } from 'react-router-dom';
import './App.css'; 

export class Home extends Component {
    static displayName = Home.name;

    constructor(props) {
        super(props);
        this.state = {
            movies: [],
            loading: true
        };
    }

    componentDidMount() {
        this.populateMoviesData();
    }

    toggleFavorite = (movieId) => {
        const updatedMovies = this.state.movies.map(movie => {
            if (movie.id === movieId) {
                return { ...movie, favorite: !movie.favorite };
            }
            return movie;
        });
        this.setState({ movies: updatedMovies });
    }

    renderMoviesCards = () => {
        const { movies } = this.state;

        return (
            <Grid container spacing={3}>
                {movies.map(movie => (
                    <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3}>
                        <Link to={`/movie/${movie.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <Card className="movie-card">
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={movie.coverImage}
                                    alt="Cover image"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {movie.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Genre: {movie.genre}<br />
                                        Duration: {movie.duration} min<br />
                                        Year: {movie.year}<br />
                                        Rating: {movie.rating}
                                    </Typography>
                                    <IconButton
                                        onClick={() => this.toggleFavorite(movie.id)}
                                        color={movie.favorite ? 'secondary' : 'default'}
                                    >
                                        {movie.favorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                                    </IconButton>
                                </CardContent>
                            </Card>
                        </Link>
                    </Grid>
                ))}
            </Grid>
        );
    }

    render() {
        const { loading } = this.state;
        const contents = loading ? <p><em>Loading...</em></p> : this.renderMoviesCards();

        return (
            <div>
                <h1 id="tableLabel">Movies</h1>
                <p>Find a movie you like.</p>
                {contents}
            </div>
        );
    }

    async populateMoviesData() {
        try {
            const response = await axios.get('https://localhost:7004/api/movie');
            console.log('Movies data:', response.data);
            // Dodajemo polje 'favorite' u svaki film
            const moviesWithFavorites = response.data.map(movie => ({ ...movie, favorite: false }));
            this.setState({ movies: moviesWithFavorites, loading: false });
        } catch (error) {
            console.error('There was an error!', error);
        }
    }
}
