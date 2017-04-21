using Newtonsoft.Json;

namespace AuthenticationDemoApiService.Controllers
{
    public class LoginResultUser
    {
        [JsonProperty(PropertyName = "userId")]
        public string UserId { get; set; }
    }
}