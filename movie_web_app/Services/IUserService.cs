using Firebase.Auth;
using movie_web_app.Dtos;
using System.Security.Claims;

namespace movie_web_app.Services
{
    public interface IUserService
    {
        public Task<FirebaseAuthLink> SignInWithEmailAndPasswordAsync(string email, string password);
        public Task<RegistrationDto> CreateUser(RegistrationDto registrationDto);
        public Task<ClaimsPrincipal> AuthenticateWithFirebaseToken(string token);
        public Task<UserDto> GetUser(string userId);
        public Task<UserDto> UpdateUser(string userId, string name, string surname);



    }
}
