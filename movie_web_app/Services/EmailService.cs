namespace movie_web_app.Services
{
    using MailKit.Net.Smtp;
    using MimeKit;
    using Microsoft.Extensions.Configuration;

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
                await client.ConnectAsync("smtp.gmail.com",
                                          587,
                                          MailKit.Security.SecureSocketOptions.StartTls);

                await client.AuthenticateAsync(
                    "medicinskaopremaisa@gmail.com",
                    "xqxbjlapbjmiygcy");

                await client.SendAsync(message);
                await client.DisconnectAsync(true);
            }
        }
    }

}
