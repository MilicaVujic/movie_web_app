namespace movie_web_app.Dtos
{
    public class UserDto
    {
        public string Name { get;  set; }
        public string Surname { get;  set; }
        public string Username { get;  set; }
        public UserDto(string name, string surname, string username) {
            Name = name;
            Surname = surname;
            Username = username;
        }
    }
}
