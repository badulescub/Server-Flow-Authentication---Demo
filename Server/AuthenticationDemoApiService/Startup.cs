using Microsoft.Owin;
using Owin;

[assembly: OwinStartup(typeof(AuthenticationDemoApiService.Startup))]

namespace AuthenticationDemoApiService
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureMobileApp(app);
        }
    }
}