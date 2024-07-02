using Microsoft.AspNetCore.Mvc;
using movie_web_app.Models;
using movie_web_app.Services;

namespace movie_web_app.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MovieController:ControllerBase
    {
        private MovieService movieService;
        public MovieController() { 
            movieService= new MovieService();
        }
        [HttpGet]
        public async Task<IEnumerable<Movie>> Get()
        {
            return await movieService.GetAllMovies();
        }
    }
}
