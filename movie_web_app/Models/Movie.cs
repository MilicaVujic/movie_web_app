namespace movie_web_app.Models
{
    public class Movie
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public Genre Genre { get; set; }
        public double Duration { get; set; }
        public int Year { get; set; }
        public double Rating { get; set; }

        public Movie() { }
        public static Genre ParseGenreEnum(string genreStr)
        {
            Enum.TryParse(typeof(Genre), genreStr, true, out object genre);

            return (Genre)genre;

        }
    }
    public enum Genre
    {
        Comedy,
        Action,
        Horror,
        Documentary,
        Cartoon
    }
}
