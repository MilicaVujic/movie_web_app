using FireSharp.Interfaces;
using FireSharp.Response;
using movie_web_app.Models;
using Newtonsoft.Json.Linq;

namespace movie_web_app.Repositories
{
    public class UserFiresbaseRepository
    {
        private readonly IFirebaseClient _client;
        public UserFiresbaseRepository(IFirebaseClient client)
        {
            _client = client;
        }

        public async Task<User> GetUserAsync(string userId)
        {
            FirebaseResponse response = await _client.GetAsync($"users/{userId}");
            User user;

            if (response.Body != "null")
            {
                JObject jsonObject = JObject.Parse(response.Body);
                if (response.Body.Contains("FavouriteMoviesIds")) {
                    user = new User(userId, jsonObject["Name"].ToString(), jsonObject["Surname"].ToString(), jsonObject["Username"].ToString(), jsonObject["Password"].ToString(), jsonObject["FavouriteMoviesIds"].ToObject<List<string>>());
                }
                else {
                    user = new User(userId, jsonObject["Name"].ToString(), jsonObject["Surname"].ToString(), jsonObject["Username"].ToString(), jsonObject["Password"].ToString(), new List<string>());
                }
                return user;
            }
            else
            {
                return null;
            }
        }

        public async Task AddFavoriteMovie(string userId, string movieId)
        {
            try
            {
                User user= await GetUserAsync(userId);

                if (!(user.FavouriteMoviesIds.Contains(movieId)))
                {
                    user.FavouriteMoviesIds.Add(movieId);

                    await _client.UpdateAsync($"users/{userId}", user);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                throw;
            }
        }

        public async Task RemoveFavoriteMovie(string userId, string movieId)
        {
            try
            {
                User user = await GetUserAsync(userId);

                if (user.FavouriteMoviesIds.Contains(movieId))
                {
                    user.FavouriteMoviesIds.Remove(movieId);


                    await _client.UpdateAsync($"users/{userId}", user);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                throw;
            }
        }
    }
}
