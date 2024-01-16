using Hangfire.Dashboard;

namespace EtleDev.EtleLabs.Hangfire.Dashboard
{
    public class NoAuthFilter : IDashboardAuthorizationFilter
    {
        public bool Authorize(DashboardContext context)
        {
            return true;
        }
    }
}
