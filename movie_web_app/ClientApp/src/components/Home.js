import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
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
            loading: true,
            searchTitle: '',
            searchGenre: '',
            searchActor: '',
            showFavourites: false,
            searchYear: '',
            searchRating: ''
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
        localStorage.setItem("movies", JSON.stringify(updatedMovies));
    }
    addToFavourites = async (movieId) => {
        try {
            const token = localStorage.getItem('accessToken'); 

            const response = await axios.patch(`http://localhost:5092/api/movie/favourite/add/${movieId}`, null, {
                headers: {
                    Authorization: `Bearer ${token}`, 
                },
            });
            const favouriteMovies = response.data.map(movie => ({
                ...movie,
                favorite: true
            }))
            this.setState({ favouriteMovies });
            localStorage.setItem("favmovies", JSON.stringify(favouriteMovies));
        } catch (error) {
            console.error('Error adding to favourites:', error);
        }
    }

    removeFavourites = async (movieId) => {
        try {
            const token = localStorage.getItem('accessToken'); 
            const response = await axios.patch(`http://localhost:5092/api/movie/favourite/remove/${movieId}`,null, {
                headers: {
                    Authorization: `Bearer ${token}`, 
                },
            });
            const favouriteMovies = response.data.map(movie => ({
                ...movie,
                favorite: true
            }))
            this.setState({ favouriteMovies });
            localStorage.setItem("favmovies", JSON.stringify(favouriteMovies));
        } catch (error) {
            console.error('Error removing from favourites:', error);
        }
    }

    toggleShowFavourites = () => {
        this.setState(prevState => ({
            showFavourites: !prevState.showFavourites,
        }));
    }

    renderMoviesCards = () => {
        const { movies, favouriteMovies, showFavourites, searchTitle, searchGenre, searchActor, searchYear, searchRating } = this.state;
        if (!movies || !favouriteMovies) {
            return null;
        }
        const normalizedSearchTitle = searchTitle.toLowerCase();
        const normalizedSearchGenre = searchGenre.toLowerCase();
        const normalizedSearchActor = searchActor.toLowerCase();
        const normalizedSearchYear = searchYear.toString();
        const normalizedSearchRating = searchRating.toString();

        const filteredMovies = showFavourites ? favouriteMovies : movies;

        const filteredAndSearchedMovies = filteredMovies.filter(movie => {
            const normalizedMovieTitle = movie.title.toLowerCase();
            const normalizedMovieGenre = genreMap[movie.genre].toLowerCase();
            const normalizedActors = movie.actors.map(actor => `${actor.name} ${actor.surname}`).join(', ').toLowerCase();
            const normalizedMovieYear = movie.year.toString();
            const normalizedMovieRating = movie.rating.toString();

            const titleMatch = normalizedMovieTitle.includes(normalizedSearchTitle);
            const genreMatch = normalizedMovieGenre.includes(normalizedSearchGenre) || normalizedSearchGenre === '';
            const actorMatch = normalizedActors.includes(normalizedSearchActor);
            const yearMatch = normalizedMovieYear.includes(normalizedSearchYear) || normalizedSearchYear === '';
            const ratingMatch = normalizedMovieRating >= normalizedSearchRating || normalizedSearchRating === '';

            return titleMatch && genreMatch && actorMatch && yearMatch && ratingMatch;
        });

        return (
            <Grid container spacing={3}>
                {filteredAndSearchedMovies.map(movie => (
                    <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3}>
                        <Card className="card">
                            <Link to={`/movie/${movie.id}`} style={{ textDecoration: 'none' }}>
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={movie.coverImage}
                                    alt="Cover image"
                                />
                            </Link>
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

    handleYearChange = (event) => {
        this.setState({ searchYear: event.target.value });
    }

    handleRatingChange = (event) => {
        this.setState({ searchRating: event.target.value });
    }

    render() {
        const { loading, searchTitle, searchGenre, searchActor, showFavourites, searchYear, searchRating } = this.state;
        const contents = loading ? <p><em>Loading...</em></p> : this.renderMoviesCards();

        return (
            <div className="home-div">
                <h1 id="tableLabel">Find a movie you like</h1>
               <span><span>My favorite movies </span>
                <IconButton
                        className="favourite-toggle"
                        onClick={this.toggleShowFavourites}
                        style={{ fontSize: 30, color: showFavourites ? 'red' : 'inherit' }}
                    >
                        {showFavourites ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                    </IconButton>
                </span>
                <div className="search-bar">
                    <TextField
                        label="Search by title"
                        variant="outlined"
                        value={searchTitle}
                        onChange={this.handleTitleChange}
                        className="search-input"
                    />
                    <TextField
                        label="Search by actor"
                        variant="outlined"
                        value={searchActor}
                        onChange={this.handleActorChange}
                        className="search-input"
                    />
                    <TextField
                        label="Search by release year"
                        variant="outlined"
                        type="number"
                        value={searchYear}
                        onChange={this.handleYearChange}
                        className="search-input"
                    />
                    <TextField
                        label="Search by minimum rating"
                        variant="outlined"
                        type="number"
                        value={searchRating}
                        onChange={this.handleRatingChange}
                        className="search-input"
                    />
                    <FormControl variant="outlined" className="search-input genre-select">
                        <InputLabel id="genre-label">Search by genre</InputLabel>
                        <Select
                            labelId="genre-label"
                            value={searchGenre}
                            onChange={this.handleGenreChange}
                            label="Search by genre"
                            className="search-genre"
                        >
                            <MenuItem value="">All</MenuItem>
                            {Object.values(genreMap).map((genre, index) => (
                                <MenuItem key={index} value={genre}>{genre}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                </div>
                <br />
                {contents}
                <br /><br></br><br></br><br></br><br></br><br></br>
            </div>
        );
    }

    async populateMoviesData() {
        try {
            const token = localStorage.getItem('accessToken'); 

            const response = await axios.get('http://localhost:5092/api/movie', {
                headers: {
                    Authorization: `Bearer ${token}`, 
                },
            });
            
            const favouriteMoviesResponse = await axios.get('http://localhost:5092/api/movie/favourite', {
                headers: {
                    Authorization: `Bearer ${token}`, 
                },
            });
            
            const favouriteMovieIds = new Set(favouriteMoviesResponse.data.map(movie => movie.id));
            const moviesWithFavorites = response.data.map(movie => ({
                ...movie,
                favorite: favouriteMovieIds.has(movie.id)
            }));
            const favMovies = favouriteMoviesResponse.data.map(movie => ({
                ...movie,
                favorite: true
            }))
            localStorage.setItem("movies", JSON.stringify(moviesWithFavorites));
            localStorage.setItem("favmovies", JSON.stringify(favMovies));

            this.setState({ movies: moviesWithFavorites, favouriteMovies: favMovies, loading: false });

        } catch (error) {
            console.error('There was an error!', error);
            this.setState({ movies: JSON.parse(localStorage.getItem("movies")), loading: false });
            this.setState({ favouriteMovies: JSON.parse(localStorage.getItem("favmovies")) });
        }
    }
}
