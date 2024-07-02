using movie_web_app.Models;
using movie_web_app.Repositories;

namespace movie_web_app.Services
{
    public class MovieService:IMovieService
    {
        private readonly MovieFirebaseRepository _movieRepository;
        public MovieService(MovieFirebaseRepository movieRepository)
        {
            _movieRepository = movieRepository;
        }
        public async Task<List<Movie>> GetAllMovies()
        {
           return await _movieRepository.GetAllMovies();
        }

    }
}
