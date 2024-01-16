using Hangfire;

namespace EtleDev.EtleLabs.Hangfire.SchedulerOne
{
    public static class HangfireExtensions
    {
        public static IApplicationBuilder UseHangfire(this IApplicationBuilder app)
        {
            ArgumentNullException.ThrowIfNull(app, nameof(app));
            var globalConfiguration = app.ApplicationServices.GetService<IGlobalConfiguration>();
            ArgumentNullException.ThrowIfNull(globalConfiguration, nameof(globalConfiguration));
            ArgumentNullException.ThrowIfNull(JobStorage.Current, nameof(JobStorage.Current));

            return app;
        }
    }
}
