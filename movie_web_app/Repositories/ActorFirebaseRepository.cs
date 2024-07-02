using FireSharp.Interfaces;
using FireSharp.Response;
using movie_web_app.Models;
using Newtonsoft.Json.Linq;

namespace movie_web_app.Repositories
{
    public class ActorFirebaseRepository
    {
        private readonly IFirebaseClient _client;
        public ActorFirebaseRepository(IFirebaseClient client)
        {
            _client = client;
        }

        public async Task<Actor> GetActorAsync(string actorId)
        {
            FirebaseResponse response = await _client.GetAsync($"actors/{actorId}");

            if (response.Body != "null")
            {
                JObject jsonObject = JObject.Parse(response.Body);

                Actor actor = new Actor(jsonObject["Id"].ToString(),jsonObject["Name"].ToString(),jsonObject["Surname"].ToString());

                return actor;
            }
            else
            {
                return null;
            }
        }
    }
}
