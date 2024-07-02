import React, { Component } from 'react';
import axios from 'axios';

export class Home extends Component {
    static displayName = Home.name;

    constructor(props) {
        super(props);
        this.state = { movies: [], loading: true };
    }

    componentDidMount() {
        this.populateMoviesData();
    }

    static renderMoviesTable(movies) {
        return (
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Genre</th>
                        <th>Duration (min)</th>
                        <th>Year</th>
                        <th>Rating</th>
                    </tr>
                </thead>
                <tbody>
                    {movies.map(movie =>
                        <tr key={movie.id}>
                            <td>{movie.title}</td>
                            <td>{movie.genre}</td>
                            <td>{movie.duration}</td>
                            <td>{movie.year}</td>
                            <td>{movie.rating}</td>
                            <td>    <img src={movie.coverImage} alt="Cover image" style={{ width: '5em', height: '5em' }}></img></td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : Home.renderMoviesTable(this.state.movies);

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
            this.setState({ movies: response.data, loading: false });
        } catch (error) {
            console.error('There was an error!', error);
        }
    }
}
