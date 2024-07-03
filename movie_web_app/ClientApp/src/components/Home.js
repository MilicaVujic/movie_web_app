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
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';
import './App.css'; 

const genreMap = {
    0: 'Comedy',
    1: 'Action',
    2: 'Horror',
    3: 'Documentary',
    4: 'Cartoon'
};

export class Home extends Component {
    static displayName = Home.name;

    constructor(props) {
        super(props);
        this.state = {
            movies: [],
            loading: true,
            searchTitle: '',
            searchGenre: '', // Dodajemo polje za pretragu po žanru
            searchActor: '' // Dodajemo polje za pretragu po imenu glumca
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
        const { movies, searchTitle, searchGenre, searchActor } = this.state;
        const normalizedSearchTitle = searchTitle.toLowerCase();
        const normalizedSearchGenre = searchGenre.toLowerCase();
        const normalizedSearchActor = searchActor.toLowerCase();

        // Filtriranje filmova
        const filteredMovies = movies.filter(movie => {
            const normalizedMovieTitle = movie.title.toLowerCase();
            const normalizedMovieGenre = genreMap[movie.genre].toLowerCase(); // Prikazuje naziv žanra umesto broja
            const normalizedActors = movie.actors.map(actor => `${actor.name} ${actor.surname}`).join(', ').toLowerCase();

            // Proveravamo da li film zadovoljava uslove pretrage
            const titleMatch = normalizedMovieTitle.includes(normalizedSearchTitle);
            const genreMatch = normalizedMovieGenre.includes(normalizedSearchGenre) || normalizedSearchGenre === ''; // Ukoliko je searchGenre prazan string, svaki film zadovoljava ovaj uslov
            const actorMatch = normalizedActors.includes(normalizedSearchActor);

            return titleMatch && genreMatch && actorMatch;
        });

        return (
            <Grid container spacing={3}>
                {filteredMovies.map(movie => (
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
                                        Genre: {genreMap[movie.genre]}<br /> {/* Prikazuje naziv žanra umesto broja */}
                                        Duration: {movie.duration} min<br />
                                        Year: {movie.year}<br />
                                        Rating: {movie.rating}<br />
                                        Actors: {movie.actors.map(actor => `${actor.name} ${actor.surname}`).join(', ')}
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

    handleTitleChange = (event) => {
        this.setState({ searchTitle: event.target.value });
    }

    handleGenreChange = (event) => {
        this.setState({ searchGenre: event.target.value });
    }

    handleActorChange = (event) => {
        this.setState({ searchActor: event.target.value });
    }

    render() {
        const { loading, searchTitle, searchGenre, searchActor } = this.state;
        const contents = loading ? <p><em>Loading...</em></p> : this.renderMoviesCards();

        return (
            <Box p={3}>
                <div>
                    <h1 id="tableLabel">Movies</h1>
                    <p>Find a movie you like.</p>
                    <div className="search-form">
                        <TextField
                            label="Search by title"
                            variant="outlined"
                            value={searchTitle}
                            onChange={this.handleTitleChange}
                            style={{ marginRight: 10, width: 300 }}
                        />
                        <FormControl variant="outlined" style={{ marginRight: 10, width: 200 }}>
                            <InputLabel id="genre-label">Search by genre</InputLabel>
                            <Select
                                labelId="genre-label"
                                value={searchGenre}
                                onChange={this.handleGenreChange}
                                label="Search by genre"
                            >
                                <MenuItem value="">All</MenuItem>
                                {Object.values(genreMap).map((genre, index) => (
                                    <MenuItem key={index} value={genre}>{genre}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <TextField
                            label="Search by actor"
                            variant="outlined"
                            value={searchActor}
                            onChange={this.handleActorChange}
                            style={{ width: 300 }}
                        />
                    </div>
                    <br />
                    {contents}
                </div>
            </Box>
        );
    }

    async populateMoviesData() {
        try {
            const response = await axios.get('https://localhost:7004/api/movie');
            console.log('Movies data:', response.data);
            const moviesWithFavorites = response.data.map(movie => ({ ...movie, favorite: false }));
            this.setState({ movies: moviesWithFavorites, loading: false });
        } catch (error) {
            console.error('There was an error!', error);
        }
    }
}
