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
            favouriteMovies: [],
            allmovies:[],
            loading: true,
            searchTitle: '',
            searchGenre: '',
            searchActor: '',
            showFavourites: false 
        };
    }

    componentDidMount() {
        this.populateMoviesData();
    }

    toggleFavorite = async (movieId) => {
        const { movies, favouriteMovies } = this.state;

        const updatedMovies = movies.map(movie => {
            if (movie.id === movieId) {
                const isFavorite = !movie.favorite;
                if (isFavorite) {
                    this.addToFavourites(movieId);
                } else {
                    this.removeFavourites(movieId);
                }
                return { ...movie, favorite: isFavorite };
            }
            return movie;
        });

        this.setState({ movies: updatedMovies, favouriteMovies });
    }

    addToFavourites = async (movieId) => {
        try {
            const favouriteMoviesResponse= await axios.patch(`https://localhost:7004/api/movie/favourite/add/${movieId}`);
            const FavouriteMovies = favouriteMoviesResponse.data.map(movie=>({
                ...movie,
                favorite: true
            }))
            this.setState({favouriteMovies:FavouriteMovies});
        } catch (error) {
            console.error('Error adding to favourites:', error);
        }
    }

    removeFavourites = async (movieId) => {
        try {
            const favouriteMoviesResponse=await axios.patch(`https://localhost:7004/api/movie/favourite/remove/${movieId}`);
            const FavouriteMovies = favouriteMoviesResponse.data.map(movie=>({
                ...movie,
                favorite: true
            }))
            this.setState({favouriteMovies:FavouriteMovies});
        } catch (error) {
            console.error('Error removing from favourites:', error);
        }
    }

    toggleShowFavourites = () => {
        this.setState(prevState => ({
            showFavourites: !prevState.showFavourites,
        }));
        if(this.state.showFavourites){
            this.setState.movies=this.favouriteMovies;
        }else{
            this.setState.movies=this.allmovies;
        }

    }

    renderMoviesCards = () => {
        const { movies, favouriteMovies, showFavourites, searchTitle, searchGenre, searchActor } = this.state;
        const normalizedSearchTitle = searchTitle.toLowerCase();
        const normalizedSearchGenre = searchGenre.toLowerCase();
        const normalizedSearchActor = searchActor.toLowerCase();
    
        const filteredMovies = showFavourites ? favouriteMovies : movies;
    
        const filteredAndSearchedMovies = filteredMovies.filter(movie => {
            const normalizedMovieTitle = movie.title.toLowerCase();
            const normalizedMovieGenre = genreMap[movie.genre].toLowerCase();
            const normalizedActors = movie.actors.map(actor => `${actor.name} ${actor.surname}`).join(', ').toLowerCase();
    
            const titleMatch = normalizedMovieTitle.includes(normalizedSearchTitle);
            const genreMatch = normalizedMovieGenre.includes(normalizedSearchGenre) || normalizedSearchGenre === '';
            const actorMatch = normalizedActors.includes(normalizedSearchActor);
    
            return titleMatch && genreMatch && actorMatch;
        });
    
        return (
            <Grid container spacing={3}>
                {filteredAndSearchedMovies.map(movie => (
                    <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3}>
                        <Card className="card">
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
                                    Genre: {genreMap[movie.genre]}<br />
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
        const { loading, searchTitle, searchGenre, searchActor, showFavourites } = this.state;
        const contents = loading ? <p><em>Loading...</em></p> : this.renderMoviesCards();

        return (
            <div className="home-div">
                <h1 id="tableLabel">Movies</h1>
                <p>Find a movie you like.</p>
                <div className="search-bar">
                    <TextField
                        label="Search by title"
                        variant="outlined"
                        value={searchTitle}
                        onChange={this.handleTitleChange}
                        className="search-input"
                    />
                    <FormControl variant="outlined" className="search-input genre-select">
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
                        className="search-input"
                    />
                    <IconButton
                        className="favourite-toggle"
                        onClick={this.toggleShowFavourites}
                        style={{ fontSize: 30, color: showFavourites ? 'red' : 'inherit' }}
                    >
                        {showFavourites ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                    </IconButton>
                </div>
                <br />
                {contents}
                <br /><br></br><br></br><br></br>
            </div>
        );
    }

    async populateMoviesData() {
        try {
            const response = await axios.get('https://localhost:7004/api/movie');
            const favouriteMoviesResponse = await axios.get('https://localhost:7004/api/movie/favourite');
            const favouriteMovieIds = new Set(favouriteMoviesResponse.data.map(movie => movie.id));
            const moviesWithFavorites = response.data.map(movie => ({
                ...movie,
                favorite: favouriteMovieIds.has(movie.id)
            }));
            const FavouriteMovies = favouriteMoviesResponse.data.map(movie=>({
                ...movie,
                favorite: true
            }))
            this.setState({ movies: moviesWithFavorites, favouriteMovies:FavouriteMovies, loading: false });
            this.setState({ allmovies: moviesWithFavorites});

        } catch (error) {
            console.error('There was an error!', error);
        }
    }
}
