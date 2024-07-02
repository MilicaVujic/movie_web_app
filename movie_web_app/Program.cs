using FireSharp.Config;
using FireSharp.Interfaces;
using movie_web_app.Repositories;
using movie_web_app.Services;

var builder = WebApplication.CreateBuilder(args);
builder.Configuration.AddJsonFile("appsettings.json", optional: false);

IFirebaseClient client;

builder.Services.AddSingleton<IFirebaseClient>(serviceProvider =>
{
    var firebaseConfig = builder.Configuration.GetSection("FirebaseConfig").Get<FirebaseConfig>();
    var config = new FirebaseConfig
    {
        AuthSecret = firebaseConfig.AuthSecret,
        BasePath = firebaseConfig.BasePath
    };
    client = new FireSharp.FirebaseClient(config);
    return client;
});

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAnyOrigin",
        builder => builder
            .AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader());
});
builder.Services.AddScoped<IMovieService, MovieService>();
builder.Services.AddScoped<MovieFirebaseRepository>();

builder.Services.AddControllersWithViews();

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

app.UseCors("AllowAnyOrigin");

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");

app.Run();
