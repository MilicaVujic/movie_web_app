namespace movie_web_app.Models
{
    public class User
    {
        public string Id { get; private set; }
        public string Name { get;  set; }
        public string Surname { get;  set; }
        public string Username { get; private set; }
        public List<string> FavouriteMoviesIds { get;  set; }
        public User(string id, string name, string surname, string username, List<string> favouriteMoviesIds)
        {
            AreFieldsEmpty(id, name, surname, username);

            this.Id = id;
            this.Name = name;
            this.Surname = surname;
            this.Username = username;
            this.FavouriteMoviesIds = favouriteMoviesIds;
        }

        private static void AreFieldsEmpty(string id, string name, string surname, string username)
        {
            if (string.IsNullOrEmpty(id)) throw new ArgumentNullException("id can't be empty");
            if (string.IsNullOrEmpty(name)) throw new ArgumentNullException("name can't be empty");
            if (string.IsNullOrEmpty(surname)) throw new ArgumentNullException("surname can't be empty");
            if (string.IsNullOrEmpty(username)) throw new ArgumentNullException("username can't be empty");
        }
    }
}
