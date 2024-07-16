using movie_web_app.Dtos;

namespace movie_web_app.Services
{
    public interface IMovieService
    {
        Task<List<MovieDto>> GetAll();
        Task<MovieDto> GetById(string id);
        Task<List<MovieDto>> AddToFavorites(string userId,string Id);
        Task<List<MovieDto>> RemoveFromFavorites(string userId, string id);
        Task<List<MovieDto>> GetFavoriteMovies(string userId);



    }
}
