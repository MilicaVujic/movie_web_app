using movie_web_app.Models;

namespace movie_web_app.Dtos
{
    public class MovieDto
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public Genre Genre { get; set; }
        public double Duration { get; set; }
        public int Year { get; set; }
        public double Rating { get; set; }
        public string CoverImage { get; set; }
        public string Description { get; set; }
        public List<Actor> Actors { get; set; }
        public MovieDto() { }
        public MovieDto(string id, string title, Genre genre, double duration, int year, double rating, string coverImage, List<Actor> actors, string description)
        {
            Id = id;
            Title = title;
            Genre = genre;
            Duration = duration;
            Year = year;
            Rating = rating;
            CoverImage = coverImage;
            Actors = actors;
            Description= description;
        }
         
    }
}
