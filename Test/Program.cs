using Microsoft.WindowsAzure.MobileServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Test.JWT;

namespace Test
{
    class Program
    {

        static void Main(string[] args)
        {
            var zumoService = new ZumoService();

            Console.WriteLine("Logging In From Code");


            var user = Login("test@email.com", "pass");

            Console.WriteLine("Success: " + user.Success);
            Console.WriteLine("Email: " + user.User.Email);
            Console.WriteLine("FirstName: " + user.User.FirstName);
            Console.WriteLine("LastName: " + user.User.LastName);

            Console.ReadKey();
        }

        public static AccountResponse Login(string username, string password)
        {
            var zumoService = new ZumoService();

            Console.WriteLine("Logging In From Code");
            var user = zumoService.LoginAsync("test@email.com", "pass");
            user.Wait();

            return AccountFromMobileServiceUser(user.Result);
        }

        public static AccountResponse AccountFromMobileServiceUser(MobileServiceUser user)
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
