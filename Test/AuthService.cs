using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.WindowsAzure.MobileServices;
using Test.JWT;

namespace Test
{
    public class AuthService
    {
        private readonly ZumoService _zumoService;

        public AuthService(ZumoService zumoService)
        {
            _zumoService = zumoService;
        }

        public async Task<AccountResponse> LoginAsync(string username, string password)
        {
            MobileServiceUser user = await _zumoService.LoginAsync(username, password);

            return AccountFromMobileServiceUser(user);
        }

        public Task LogoutAsync()
        {
            throw new NotImplementedException();
        }

        private AccountResponse AccountFromMobileServiceUser(MobileServiceUser user)
        {
            if (user == null)
            {
                throw new ArgumentNullException(nameof(user));
            }

            IDictionary<string, string> claims = JwtUtility.GetClaims(user.MobileServiceAuthenticationToken);

            var account = new AccountResponse();
            account.Success = true;
            account.User = new AccountUser
            {
                Email = claims[JwtClaimNames.Subject],
                FirstName = claims[JwtClaimNames.GivenName],
                LastName = claims[JwtClaimNames.FamilyName]
            };

            return account;
        }
    }
}
