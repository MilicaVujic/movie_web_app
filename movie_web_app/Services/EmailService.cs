using MailKit.Net.Smtp;
using MimeKit;

namespace movie_web_app.Services
{
    public class EmailService
    {
        private readonly IConfiguration _configuration;

        public EmailService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task SendEmailAsync(string to, string subject, string body)
        {
            var message = new MimeMessage();
            message.From.Add(new MailboxAddress("MovieWebApp", _configuration["SmtpSettings:From"]));
            message.To.Add(new MailboxAddress(to, to));
            message.Subject = subject;

            message.Body = new TextPart("html") { Text = body };

            using (var client = new SmtpClient())
            {
                await client.ConnectAsync(
                    _configuration["SmtpSettings:Host"],
                    int.Parse(_configuration["SmtpSettings:Port"]),
                    MailKit.Security.SecureSocketOptions.StartTls);

                await client.AuthenticateAsync(
                    _configuration["SmtpSettings:Username"],
                    _configuration["SmtpSettings:Password"]);

                await client.SendAsync(message);
                await client.DisconnectAsync(true);
            }
        }
    }
}
