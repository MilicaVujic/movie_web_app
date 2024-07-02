namespace movie_web_app.Models
{
    public class Movie
    {
        public string Id { get; private set; }
        public string Title { get; private set; }
        public Genre Genre { get; private set; }
        public double Duration { get; private set; }
        public int Year { get; private set; }
        public double Rating { get; private set; }
        public string CoverImage { get; private set; }
        public List<string> ActorIds { get; private set; }

        public Movie(string id, string title, Genre Genre, double duration, int year, double rating, string coverImage, List<String> actors)
        {
            this.Id = id;
            this.Title = title;
            this.Genre = Genre;
            this.Duration = duration;
            this.Year = year;
            this.Rating = rating;
            this.CoverImage = coverImage;
            this.ActorIds = actors;
       }

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
