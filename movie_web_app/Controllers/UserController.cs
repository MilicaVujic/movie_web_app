using Microsoft.AspNetCore.Mvc;
using movie_web_app.Dtos;
using movie_web_app.Services;

namespace movie_web_app.Controllers
{
    [ApiController]
    [Route("api/users")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }
        [HttpPost("register")]
        public async Task<ActionResult<RegistrationDto>> RegisterUser(RegistrationDto registrationDto)
        {
            try
            {
                var createdUser = await _userService.CreateUser(registrationDto);
                return Ok(createdUser); 
            }
            catch (Exception ex)
            {
                return Conflict(ex.Message); 
            }
        }
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto request)
        {
            try
            {
                var authLink = await _userService.SignInWithEmailAndPasswordAsync(request.Email, request.Password);
                string accessToken = authLink.FirebaseToken;
                Response.Headers.Add("Authorization", $"Bearer {accessToken}");

                return Ok(new { Message = "Login successful", UserId = authLink.User.LocalId });
            }
            catch (Exception ex)
            {
                return BadRequest(new { Message = "Login failed", Error = ex.Message });
            }
        }



    }
}
