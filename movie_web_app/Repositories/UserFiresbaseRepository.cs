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
                List<string> favoriteMoviesIds = jsonObject.ContainsKey("FavouriteMoviesIds")
               ? jsonObject["FavouriteMoviesIds"].ToObject<List<string>>()
               : new List<string>(); 

                user = new User(
                    userId,
                    jsonObject["Name"].ToString(),
                    jsonObject["Surname"].ToString(),
                    jsonObject["Username"].ToString(),
                    favoriteMoviesIds
                );
                return user;
            }
            else
            {
                return null;
            }
        }
        public async Task UpdateUser(string userId, User user)
        {
            try
            {
                await _client.UpdateAsync($"users/{userId}", user);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                throw;
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
        public async Task CreateUserAsync(User user)
        {
            try
            {
                await _client.SetAsync($"users/{user.Id}", user);            
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                throw;
            }
        }
        public async Task<bool> DoesUserExistAsync(string email)
        {      

            FirebaseResponse response = await _client.GetAsync($"users"); 
            var users = JObject.Parse(response.Body);

            foreach (var user in users)
            {
                if (user.Value["Username"].ToString() == email) 
                {
                    return true;
                }
            }
            return false;
        }


    }
}
