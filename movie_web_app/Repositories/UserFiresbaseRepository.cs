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

            if (response.Body != "null")
            {
                JObject jsonObject = JObject.Parse(response.Body);

                User user = new User(userId, jsonObject["Name"].ToString(), jsonObject["Surname"].ToString(), jsonObject["Username"].ToString(), jsonObject["Password"].ToString(), jsonObject["FavouriteMoviesIds"].ToObject<List<string>>());

                return user;
            }
            else
            {
                return null;
            }
        }
    }
}
