namespace movie_web_app.Models
{
    public class User
    {
        public string Id { get; private set; }
        public string Name { get; private set; }
        public string Surname { get; private set; }
        public string Username { get; private set; }
        public string Password { get; private set; }
        public List<string> FavouriteMoviesIds { get;  set; }
        public User(string id, string name, string surname, string username, string password, List<string> favouriteMoviesIds)
        {
            this.Id = id;
            this.Name = name;
            this.Surname = surname;
            this.Username = username;
            this.Password = password;
            this.FavouriteMoviesIds = favouriteMoviesIds;
        }

        public User() { }



    }
}
