using movie_web_app.Models;
using movie_web_app.Repositories;

namespace movie_web_app.Services
{
    public class MovieService
    {
        private MovieFirebaseRepository repository;
        public MovieService(){
            repository= new MovieFirebaseRepository();  
        }
        public async Task<List<Movie>> GetAllMovies()
        {
           return await repository.GetAllMovies();
        }

    }
}
