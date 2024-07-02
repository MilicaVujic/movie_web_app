using FireSharp.Config;
using FireSharp.Interfaces;
using FireSharp.Response;
using movie_web_app.Models;

namespace movie_web_app.Repositories
{
    public class MovieFirebaseRepository
    {
        private string authSecret = "ZHkL9H3dtNEZzTA2BsULCJPuCNGYCh2rrRFnz4Lt";
        private string connectionString = "https://movieapp-ecd38-default-rtdb.europe-west1.firebasedatabase.app/";
        private  IFirebaseClient client;

        public MovieFirebaseRepository() {
            IFirebaseConfig config = new FirebaseConfig { AuthSecret = authSecret, BasePath = connectionString };
            client = new FireSharp.FirebaseClient(config);
        }

        public async Task<List<Movie>> GetAllMovies()
        {
            List<Movie> movies = new List<Movie>();

            FirebaseResponse response = await client.GetAsync("movies");
            if (response.Body != "null")
            {
                dynamic data = response.ResultAs<dynamic>();
                foreach (var movie in data)
                {
                    Movie movieObj = new Movie
                    {
                        Id = movie.Value.Id,
                        Title = movie.Value.Title,
                        Genre = Movie.ParseGenreEnum(movie.Value.Genre.ToString()), 
                        Duration = Convert.ToDouble(movie.Value.Duration),
                        Year = Convert.ToInt32(movie.Value.Year),
                        Rating = Convert.ToDouble(movie.Value.Rating)
                    };
                    movies.Add(movieObj);
                }
            }

            return movies;
        }
        
    }



    
}
