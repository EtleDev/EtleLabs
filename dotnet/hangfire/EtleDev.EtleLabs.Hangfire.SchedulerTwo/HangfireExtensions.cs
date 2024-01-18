using EtleDev.EtleLabs.Hangfire.Two.Facade.Jobs;
using Hangfire;

namespace EtleDev.EtleLabs.Hangfire.SchedulerTwo
{
    public static class HangfireExtensions
    {
        public static IHostApplicationBuilder UseHangfire(this IHostApplicationBuilder app)
        {
            ArgumentNullException.ThrowIfNull(app, nameof(app));
            var globalConfiguration = app.Services.BuildServiceProvider().GetService<IGlobalConfiguration>();
            ArgumentNullException.ThrowIfNull(globalConfiguration, nameof(globalConfiguration));
            ArgumentNullException.ThrowIfNull(JobStorage.Current, nameof(JobStorage.Current));

            return app;
        }

        public static IHostApplicationBuilder RegisterJobs(this IHostApplicationBuilder app)
        {
            RecurringJob.AddOrUpdate<ThirdRecurringJob>(nameof(ThirdRecurringJob), "two", j => j.Run(), Cron.Minutely);

            return app;
        }
    }
}
