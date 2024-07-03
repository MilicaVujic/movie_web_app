using movie_web_app.Dtos;

namespace movie_web_app.Services
{
    public interface IMovieService
    {
        Task<List<MovieDto>> GetAll();
        Task<MovieDto> GetById(string id);


    }
}
