using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using movie_web_app.Dtos;
using movie_web_app.Services;
using System.Security.Claims;

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
        [Authorize]
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
        [Authorize]
        public async Task<IEnumerable<MovieDto>> AddToFavouries(string id)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            return await _movieService.AddToFavorites(userId,id);
        }
        [HttpPatch("favourite/remove/{id}")]
        [Authorize]
        public async Task<IEnumerable<MovieDto>> RemoveFromFavouries(string id)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            return await _movieService.RemoveFromFavorites(userId,id);
        }
        [HttpGet("favourite")]
        [Authorize]
        public async Task<IEnumerable<MovieDto>> GetFavouriteMovies()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            return await _movieService.GetFavoriteMovies(userId);
        }
    }
}
