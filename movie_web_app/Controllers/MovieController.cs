using Microsoft.AspNetCore.Mvc;
using movie_web_app.Dtos;
using movie_web_app.Services;

namespace movie_web_app.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MovieController:ControllerBase
    {
        private readonly IMovieService _movieService;

        public MovieController(IMovieService movieService)
        {
            _movieService = movieService;
        }
        [HttpGet]
        public async Task<IEnumerable<MovieDto>> Get()
        {
            return await _movieService.GetAll();
        }
        [HttpGet("{id}")]
        public async Task<MovieDto> GetById(string id)
        {
            return await _movieService.GetById(id);
        }
        [HttpPatch("favourite/add/{id}")]
        public async Task<IEnumerable<MovieDto>> AddToFavouries(string id)
        {
            return await _movieService.AddToFavourites(id);
        }
        [HttpPatch("favourite/remove/{id}")]
        public async Task<IEnumerable<MovieDto>> RemoveFromFavouries(string id)
        {
            return await _movieService.RemoveFromFavourites(id);
        }
        [HttpGet("favourite")]
        public async Task<IEnumerable<MovieDto>> GetFavouriteMovies()
        {
            return await _movieService.GetFavouriteMovies();
        }
    }
}
