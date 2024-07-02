using Microsoft.AspNetCore.Mvc;
using movie_web_app.Models;
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
        public async Task<IEnumerable<Movie>> Get()
        {
            return await _movieService.GetAllMovies();
        }
    }
}
