using Firebase.Auth;
using movie_web_app.Dtos;
using movie_web_app.Repositories;

namespace movie_web_app.Services
{
    public class UserService:IUserService
    {
        private readonly FirebaseAuthProvider _authProvider;
        private readonly UserFiresbaseRepository _userRepository;



        public UserService(string apiKey, UserFiresbaseRepository userFiresbaseRepository)
        {
            _authProvider = new FirebaseAuthProvider(new FirebaseConfig(apiKey));
            _userRepository = userFiresbaseRepository;
        }

        public async Task<FirebaseAuthLink> SignInWithEmailAndPasswordAsync(string email, string password)
        {
            return await _authProvider.SignInWithEmailAndPasswordAsync(email, password);
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

    }
}
