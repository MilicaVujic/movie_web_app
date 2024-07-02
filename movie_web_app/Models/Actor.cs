namespace movie_web_app.Models
{
    public class Actor
    {
        public string Id {  get; private set; }
        public string Name { get; private set; }
        public string Surname { get; private set; }
        public Actor() { }
        public Actor(string id, string name, string surname)
        {
            Id = id;
            Name = name;
            Surname = surname;
        }
    }
}
