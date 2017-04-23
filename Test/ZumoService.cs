using Microsoft.WindowsAzure.MobileServices;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Test
{
    public class ZumoService
    {
        private const string MobileServiceClientUrl = "https://authenticationdemoapi.azurewebsites.net";
        private object locker = new object();

        public static MobileServiceClient MobileService { get; set; }

        public bool IsInitialized { get; private set; }

        public async Task InitializeAsync()
        {
            lock (locker)
            {
                if (IsInitialized)
                    return;

                IsInitialized = true;

                MobileService = new MobileServiceClient(MobileServiceClientUrl);
            }
        }

        public async Task<MobileServiceUser> LoginAsync(string username, string password)
        {
            if (!IsInitialized)
            {
                await InitializeAsync();
            }

            var credentials = new JObject();
            credentials["email"] = username;
            credentials["password"] = password;

            MobileServiceUser user = await MobileService.LoginAsync("custom", credentials);
            return user;
        }
    }
}
