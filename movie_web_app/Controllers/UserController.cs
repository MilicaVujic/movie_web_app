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
        [HttpPost]
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

    }
}
