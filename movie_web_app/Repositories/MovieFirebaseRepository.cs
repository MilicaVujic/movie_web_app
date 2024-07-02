using FireSharp.Config;
using FireSharp.Interfaces;
using FireSharp.Response;
using movie_web_app.Models;

namespace movie_web_app.Repositories
{
    public class MovieFirebaseRepository
    {
        private readonly IFirebaseClient _client;

        public MovieFirebaseRepository(IFirebaseClient client)
        {
            _client = client;

        }

        public async Task<List<Movie>> GetAllMovies()
        {
            List<Movie> movies = new List<Movie>();

            FirebaseResponse response = await _client.GetAsync("movies");
            if (response.Body != "null")
            {
                dynamic data = response.ResultAs<dynamic>();
                foreach (var movie in data)
                {
                    Movie movieObj = new Movie(movie.Value.Id.ToString(), movie.Value.Title.ToString(), Movie.ParseGenreEnum(movie.Value.Genre.ToString()),Convert.ToDouble(movie.Value.Duration), Convert.ToInt32(movie.Value.Year), Convert.ToDouble(movie.Value.Rating), movie.Value.CoverImage.ToString());
  
                    movies.Add(movieObj);
                }
            }

            return movies;
        }
        
    }



    
}
