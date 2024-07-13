using Firebase.Auth;
using movie_web_app.Dtos;

namespace movie_web_app.Services
{
    public interface IUserService
    {
        public Task<FirebaseAuthLink> SignInWithEmailAndPasswordAsync(string email, string password);
        public Task<RegistrationDto> CreateUser(RegistrationDto registrationDto);


    }
}
