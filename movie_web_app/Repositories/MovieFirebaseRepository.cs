using FireSharp.Config;
using FireSharp.Interfaces;
using FireSharp.Response;
using movie_web_app.Models;
using Newtonsoft.Json.Linq;

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
                                actorIds,
                                movie.Description.ToString());

                            movies.Add(movieObj);
                        } 
                }
            }

            return movies;
        }


        public async Task<Movie> GetMovieById(string id)
        {
            FirebaseResponse response = await _client.GetAsync($"movies/{id}");

            if (response.Body != "null")
            {
                JObject jsonObject = JObject.Parse(response.Body);
                Movie movie = new Movie(id, jsonObject["Title"].ToString(),Movie.ParseGenreEnum(jsonObject["Genre"].ToString()), Convert.ToDouble(jsonObject["Duration"]), Convert.ToInt32(jsonObject["Year"]), Convert.ToDouble(jsonObject["Rating"]), jsonObject["CoverImage"].ToString(), jsonObject["ActorIds"].ToObject<List<string>>(), jsonObject["Description"].ToString());

                return movie;
            }
            else
            {
                return null;
            }
        }
    }



    
}
