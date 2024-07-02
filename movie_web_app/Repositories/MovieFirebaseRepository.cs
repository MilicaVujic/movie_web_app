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

        public async Task<List<Movie>> GetAllMovies(){
            List<Movie> movies = new List<Movie>();

            FirebaseResponse response = await _client.GetAsync("movies");
            if (response.Body != "null")
            {
                dynamic data = response.ResultAs<dynamic>();
                foreach (var movie in data)
                {
                        if (movie != null)
                        {
                            List<string> actorIds = new List<string>();
                             foreach (var actorId in movie.ActorIds)
                             {
                                actorIds.Add(actorId.ToString());
                             }

                            Movie movieObj = new Movie(
                                movie.Id?.ToString(),
                                movie.Title?.ToString(),
                                Movie.ParseGenreEnum(movie.Genre?.ToString()),
                                Convert.ToDouble(movie.Duration),
                                Convert.ToInt32(movie.Year),
                                Convert.ToDouble(movie.Rating),
                                movie.CoverImage?.ToString(),
                                actorIds);

                            movies.Add(movieObj);
                        } 
                }
            }

            return movies;
        }

        
    }



    
}
