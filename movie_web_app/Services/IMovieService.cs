using movie_web_app.Dtos;

namespace movie_web_app.Services
{
    public interface IMovieService
    {
        Task<List<MovieDto>> GetAll();
        Task<MovieDto> GetById(string id);
        Task<List<MovieDto>> AddToFavourites(string id);
        Task<List<MovieDto>> RemoveFromFavourites(string id);
        Task<List<MovieDto>> GetFavouriteMovies();



    }
}
