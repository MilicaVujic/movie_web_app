using Firebase.Auth;
using FirebaseAdmin.Auth;
using Microsoft.AspNetCore.Http;
using movie_web_app.Dtos;
using movie_web_app.Repositories;
using Newtonsoft.Json.Linq;
using System.Security.Claims;

namespace movie_web_app.Services
{
    public class UserService:IUserService
    {
        private readonly FirebaseAuthProvider _authProvider;
        private readonly UserFiresbaseRepository _userRepository;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public UserService(string apiKey, UserFiresbaseRepository userFiresbaseRepository, IHttpContextAccessor httpContextAccessor)
        {
            _authProvider = new FirebaseAuthProvider(new FirebaseConfig(apiKey));
            _userRepository = userFiresbaseRepository;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<FirebaseAuthLink> SignInWithEmailAndPasswordAsync(string email, string password)
        {
            var authLink = await _authProvider.SignInWithEmailAndPasswordAsync(email, password);

            return authLink;
        }

        private async Task<FirebaseAuthLink> CreateUser(string email, string password)
        {
            return await _authProvider.CreateUserWithEmailAndPasswordAsync(email,password);
        }
        public async Task<RegistrationDto> CreateUser(RegistrationDto registrationDto)
        {
            bool userExists = await _userRepository.DoesUserExistAsync(registrationDto.Username); 
            if (userExists)
            {
                throw new Exception("Email already exists.");
            }

            var firebaseAuthUser = await CreateUser(registrationDto.Username, registrationDto.Password);
            Models.User user = new Models.User(firebaseAuthUser.User.LocalId.ToString(), registrationDto.Name, registrationDto.Surname, registrationDto.Username, new List<string>());
            await _userRepository.CreateUserAsync(user);

            return registrationDto;
        }

         public async Task<ClaimsPrincipal> AuthenticateWithFirebaseToken(string token)
    {
        try
        {
            var decodedToken = await FirebaseAdmin.Auth.FirebaseAuth.DefaultInstance.VerifyIdTokenAsync(token);
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, decodedToken.Uid),
            };

            var claimsIdentity = new ClaimsIdentity(claims, "Firebase");
            return new ClaimsPrincipal(claimsIdentity);
        }
        catch (Exception ex)
        {
            throw new UnauthorizedAccessException("Invalid Firebase token", ex);
        }
    }
    }


}
