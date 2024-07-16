using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using movie_web_app.Dtos;
using movie_web_app.Services;
using System.Security.Claims;

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
                Response.Headers.Add("Accesstoken", $"{authLink.FirebaseToken}");
                return Ok(new { Message = "Login successful", UserId = authLink.User.LocalId });
            }
            catch (Exception ex)
            {
                return BadRequest(new { Message = "Login failed", Error = ex.Message });
            }
        }
        [HttpGet]
        [Authorize]
        public async Task<ActionResult<UserDto>> GetUser()
        {
            try
            {
                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                var createdUser = await _userService.GetUser(userId);
                return Ok(createdUser);
            }
            catch (Exception ex)
            {
                return Conflict(ex.Message);
            }
        }

        [HttpPatch]
        [Authorize]
        public async Task<ActionResult<UserDto>> UpdateUser([FromBody] UpdateUserDto userDto)
        {
            if (userDto == null)
            {
                return BadRequest("Invalid user data.");
            }
            try
            {
                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                var updatedUser = await _userService.UpdateUser(userId, userDto.Name, userDto.Surname);
                return Ok(updatedUser);
            }
            catch (Exception ex)
            {
                return Conflict(ex.Message);
            }
        }

    }
}
