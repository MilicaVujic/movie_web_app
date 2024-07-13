using movie_web_app.Repositories;
using movie_web_app.Services;
using FireSharp.Config;
using FireSharp.Interfaces;
using FireSharp;
using movie_web_app;
using Firebase.Auth;

var builder = WebApplication.CreateBuilder(args);

builder.Configuration.AddJsonFile("appsettings.json", optional: false);

IFirebaseClient client;
var firebaseConfig = builder.Configuration.GetSection("FirebaseConfig").Get<CustomFirebaseConfig>();

builder.Services.AddSingleton<IFirebaseClient>(serviceProvider =>
{
    var config = new FireSharp.Config.FirebaseConfig
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
builder.Services.AddScoped<ActorFirebaseRepository>();
builder.Services.AddScoped<UserFiresbaseRepository>();

builder.Services.AddScoped<IUserService>(serviceProvider =>
{
    var userRepository = serviceProvider.GetRequiredService<UserFiresbaseRepository>(); 
    return new UserService(firebaseConfig.ApiKey, userRepository); 
});

builder.Services.AddControllersWithViews();

var app = builder.Build();

app.UseStaticFiles();

app.UseRouting();

app.UseCors("AllowAnyOrigin");

app.Use(async (context, next) =>
{
    context.Response.Headers.Add("Service-Worker-Allowed", "/");
    await next();
});

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");

app.Run();
