using System;
using System.Configuration;
using System.IdentityModel.Tokens;
using System.Security.Claims;
using System.Web.Http;
using Microsoft.Azure.Mobile.Server.Login;

namespace AuthenticationDemoApiService.Controllers
{
    [Route(".auth/login/custom")]
    public class CustomAuthController : ApiController
    {
        [HttpPost, HttpOptions]
        public IHttpActionResult Post([FromBody] UserLoginModel user)
        {
//            var telemetry = new TelemetryClient();
            try
            {
                // telemetry.TrackEvent("AUTHENTICATE", new Dictionary<string, string> {{"UserName", user?.UserName}});
                if (string.IsNullOrEmpty(user?.UserName) || string.IsNullOrEmpty(user.Password))
                {
                    return BadRequest();
                }

                var memberUser = IsValidUser(user);
                if (memberUser == null)
                {
                    return Unauthorized();
                }
                var claims = new[]
                {
                    new Claim(JwtRegisteredClaimNames.Sub, memberUser.UserId.ToString())
                };

                var token = JwtSecurityToken(claims);
                if (token == null)
                {
                    // telemetry.TrackDependency("JWT", "TOKEN", DateTimeOffset.UtcNow, new TimeSpan(), false);
                    return Unauthorized();
                }

                return Ok(new LoginResult
                {
                    AuthenticationToken = token.RawData,
                    User = new LoginResultUser {UserId = user.UserName}
                });
            }
            catch 
            {
                // telemetry.TrackException(ex);
                return Unauthorized();
            }
        }

        private static JwtSecurityToken JwtSecurityToken(Claim[] claims)
        {
            var signingKey = GenerateSigningKey();

            var website = Environment.GetEnvironmentVariable("WEBSITE_HOSTNAME");

            var audience = $"https://{website}/";
            var issuer = $"https://{website}/";
            if (string.IsNullOrEmpty(website))
            {
                audience = ConfigurationManager.AppSettings["ValidAudience"];
                issuer = ConfigurationManager.AppSettings["ValidIssuer"];
            }

            try
            {
                var token = AppServiceLoginHandler.CreateToken(claims, signingKey, audience, issuer, TimeSpan.FromDays(30));
                return token;
            }
            catch (Exception ex)
            {
                //telemetry.TrackException(ex, new Dictionary<string, string>
                //{
                //    { "KEY", signingKey },
                //    { "WEBSITE", website },
                //    { "AUDIENCE", audience },
                //    { "ISSUER", issuer }
                //});
                throw ex;
            }
        }

        private LoginResultUser IsValidUser(UserLoginModel user)
        {
            var memberUser = new LoginResultUser {
                UserId = Guid.NewGuid().ToString()
            };
            

            //Use Your own database, table storage, json, config, way
            if ("pass" == user.Password)
            {
                return memberUser;
            }

            return null;
        }

        private static string GenerateSigningKey() {
            var g = Guid.NewGuid();
            return Convert.ToBase64String(g.ToByteArray());            
        }
    }
}