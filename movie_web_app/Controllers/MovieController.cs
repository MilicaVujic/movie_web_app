using Microsoft.AspNetCore.Mvc;
using movie_web_app.Dtos;
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
        public async Task<IEnumerable<MovieDto>> Get()
        {
            return await _movieService.GetAll();
        }
        [HttpGet("{id}")]
        public async Task<MovieDto> GetById(string id)
        {
            return await _movieService.GetById(id);
        }
    }
}
