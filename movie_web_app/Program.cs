using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Configuration;
using movie_web_app.Repositories;
using movie_web_app.Services;
using FireSharp.Config;
using FireSharp.Interfaces;
using FireSharp;

var builder = WebApplication.CreateBuilder(args);

// Uèitavanje konfiguracije iz appsettings.json
builder.Configuration.AddJsonFile("appsettings.json", optional: false);

// Konfiguracija Firebase klijenta
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

// Dodavanje CORS politike
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAnyOrigin",
        builder => builder
            .AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader());
});

// Dodavanje servisa i repozitorija
builder.Services.AddScoped<IMovieService, MovieService>();
builder.Services.AddScoped<MovieFirebaseRepository>();
builder.Services.AddScoped<ActorFirebaseRepository>();
builder.Services.AddScoped<UserFiresbaseRepository>();

// Dodavanje kontrolera i pogleda
builder.Services.AddControllersWithViews();

var app = builder.Build();

// Uspostavljanje HTTPS redirekcije
//app.UseHttpsRedirection();

// Omoguæavanje statièkih datoteka (npr. JavaScript, CSS)
app.UseStaticFiles();

// Omoguæavanje rutiranja
app.UseRouting();

// Omoguæavanje CORS politike
app.UseCors("AllowAnyOrigin");

// Registracija servisnog radnika (service worker)
app.Use(async (context, next) =>
{
    context.Response.Headers.Add("Service-Worker-Allowed", "/");
    await next();
});

// Mapiranje putanje za kontrolere
app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

// Mapiranje putanje za fallback na index.html (za Single Page Application)
app.MapFallbackToFile("index.html");

// Pokretanje aplikacije
app.Run();
