using System;
using System.Configuration;
using System.IdentityModel.Tokens;
using System.Security.Claims;
using System.Web.Http;
using Microsoft.Azure.Mobile.Server.Login;
using Newtonsoft.Json.Linq;
using System.Collections.Generic;

namespace AuthenticationDemoApiService.Controllers
{
    [Route(".auth/login/custom")]
    public class CustomAuthController : ApiController
    {
        private const string AuthSigningKeyVariableName = "WEBSITE_AUTH_SIGNING_KEY";
        private const string HostNameVariableName = "WEBSITE_HOSTNAME";
        private string TokenSigningKey => Environment.GetEnvironmentVariable(AuthSigningKeyVariableName) ?? ConfigurationManager.AppSettings["SigningKey"];
        public string WebsiteHostName => Environment.GetEnvironmentVariable(HostNameVariableName) ?? "localhost";

        [HttpPost]
        public IHttpActionResult Post([FromBody] JObject authCredentials)
        {
            var authResult = AuthenticateCredentials(authCredentials.ToObject<UserLoginModel>());

            if (authResult == null)
            {
                return Unauthorized();
            }

            var token = GetJwtSecurityToken(authResult);

            return Ok(new LoginResult { AuthenticationToken = token.RawData, User = authResult });
        }

        private JwtSecurityToken GetJwtSecurityToken(LoginResultUser user)
        {
            IEnumerable<Claim> claims = GetAccountClaims(user);
            string websiteUri = $"https://{WebsiteHostName}/";

            return AppServiceLoginHandler
                .CreateToken(claims, TokenSigningKey, websiteUri, websiteUri, TimeSpan.FromDays(30));
        }

        private LoginResultUser AuthenticateCredentials(UserLoginModel credentials)
        {
            //validate user against db, or service here

            var user = new LoginResultUser { UserId = Guid.NewGuid().ToString(), Email = "test@email.com", FirstName = "Sandbox", LastName = "User" };

            var sucess = (credentials.UserName == user.Email && credentials.Password == "pass"); //dummy validation

            return sucess ? user : null;
        }

        private IEnumerable<Claim> GetAccountClaims(LoginResultUser user) => new Claim[]
         {
                new Claim(JwtRegisteredClaimNames.Sub, user.UserId),
                new Claim(JwtRegisteredClaimNames.GivenName, user.FirstName),
                new Claim(JwtRegisteredClaimNames.FamilyName, user.LastName),
                new Claim(JwtRegisteredClaimNames.NameId, user.Email)
         };
    }
}