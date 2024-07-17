using FirebaseAdmin;
using Google.Apis.Auth.OAuth2;
using movie_web_app.Repositories;
using movie_web_app.Services;
using FireSharp.Interfaces;
using movie_web_app;

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
            .AllowAnyHeader()
            .WithExposedHeaders("Accesstoken"));
});

FirebaseApp.Create(new AppOptions()
{
    Credential = GoogleCredential.FromFile("movieapp-ecd38-firebase-adminsdk-nnh5t-854f14681d.json"),
});

builder.Services.AddHttpContextAccessor();

builder.Services.AddScoped<IMovieService, MovieService>();
builder.Services.AddScoped<MovieFirebaseRepository>();
builder.Services.AddScoped<ActorFirebaseRepository>();
builder.Services.AddScoped<UserFiresbaseRepository>();
builder.Services.AddScoped<EmailService>();

builder.Services.AddScoped<IUserService>(serviceProvider =>
{
    var userRepository = serviceProvider.GetRequiredService<UserFiresbaseRepository>();
    var emailService = serviceProvider.GetRequiredService<EmailService>();
    return new UserService(firebaseConfig.ApiKey, userRepository,emailService);
});

builder.Services.AddControllersWithViews();

var app = builder.Build();

app.UseStaticFiles();
app.UseRouting();
app.UseCors("AllowAnyOrigin");

app.Use(async (context, next) =>
{
    var authHeader = context.Request.Headers["Authorization"].FirstOrDefault();
    if (authHeader != null && authHeader.StartsWith("Bearer "))
    {
        var token = authHeader.Substring("Bearer ".Length).Trim();
        var userService = context.RequestServices.GetRequiredService<IUserService>();

        try
        {
            var user = await userService.AuthenticateWithFirebaseToken(token);
            context.User = user; 
        }
        catch (UnauthorizedAccessException)
        {
            context.Response.StatusCode = StatusCodes.Status401Unauthorized;
            return;
        }
    }

    await next();
});


app.UseAuthentication();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");

app.Run();
