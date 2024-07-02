using movie_web_app.Models;

namespace movie_web_app.Services
{
    public interface IMovieService
    {
        Task<List<Movie>> GetAllMovies();

    }
}
