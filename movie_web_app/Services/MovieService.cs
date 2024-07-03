using movie_web_app.Dtos;
using movie_web_app.Models;
using movie_web_app.Repositories;

namespace movie_web_app.Services
{
    public class MovieService:IMovieService
    {
        private readonly MovieFirebaseRepository _movieRepository;
        private readonly ActorFirebaseRepository _actorRepository;
        public MovieService(MovieFirebaseRepository movieRepository, ActorFirebaseRepository actorRepository)
        {
            _movieRepository = movieRepository;
            _actorRepository = actorRepository;
        }
        public async Task<List<MovieDto>> GetAll()
        {
            List<Movie> movies = await _movieRepository.GetAllMovies();
            List<MovieDto> movieDtos = await MapMoviesToDtos(movies);
            return movieDtos;
        }

        public async Task<MovieDto> GetById(string id)
        {
            Movie movie= await _movieRepository.GetMovieById(id);
            List<Actor> actors = new List<Actor>();
            foreach (var actorId in movie.ActorIds)
            {
                Actor actor = await _actorRepository.GetActorAsync(actorId);
                actors.Add(actor);
            }

            MovieDto movieDto = new MovieDto
            {
                Id = movie.Id,
                Title = movie.Title,
                Genre = movie.Genre,
                Duration = movie.Duration,
                Year = movie.Year,
                Rating = movie.Rating,
                CoverImage = movie.CoverImage,
                Actors = actors,
                Description = movie.Description,
            };
            return movieDto;
        }

        private async Task<List<MovieDto>> MapMoviesToDtos(List<Movie> movies)
        {
            List<MovieDto> movieDtos = new List<MovieDto>();

            foreach (var movie in movies)
            {
                List<Actor> actors = new List<Actor>();
                foreach (var actorId in movie.ActorIds)
                {
                    Actor actor = await _actorRepository.GetActorAsync(actorId);
                    actors.Add(actor);
                }

                MovieDto movieDto = new MovieDto
                {
                    Id = movie.Id,
                    Title = movie.Title,
                    Genre = movie.Genre,
                    Duration = movie.Duration,
                    Year = movie.Year,
                    Rating = movie.Rating,
                    CoverImage = movie.CoverImage,
                    Actors = actors,
                    Description= movie.Description
                };

                movieDtos.Add(movieDto);
            }

            return movieDtos;
        }

    }
}
