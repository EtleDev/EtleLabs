using EtleDev.EtleLabs.Hangfire.JobDefinitions.Jobs;
using Hangfire;
using System.Runtime.CompilerServices;

namespace EtleDev.EtleLabs.Hangfire.SchedulerOne
{
    public static class ServiceBootstrapper
    {
        public static IServiceCollection RegisterJobs(this IServiceCollection services)
        {
            RecurringJob.AddOrUpdate<FirstRecuringJob>(Guid.NewGuid().ToString(), j => j.Run(), Cron.Minutely);

            //RecurringJobManager.AddOrUpdate<FirstRecuringJob>(Guid.NewGuid().ToString(), j => j.Run(), Cron.Minutely);
            RecurringJob.AddOrUpdate<SecondRecuringJob>(Guid.NewGuid().ToString(), j => j.Run(), Cron.Minutely);

            BackgroundJob.Enqueue<OneShotJob>(j => j.Run());
            //BackgroundJob.Enqueue<OneShotJob>("toto", j => j.Run());
            //BackgroundJob.con
            //RecurringJob.AddOrUpdate<FirstRecuringJob>(Guid.NewGuid().ToString(), j => j.Run(), Cron.Minutely()/*, new RecurringJobOptions { }*/);

            return services;
        }

        public static IApplicationBuilder RegisterJobs(this IApplicationBuilder app)
        {
            RecurringJob.AddOrUpdate<FirstRecuringJob>(Guid.NewGuid().ToString(), j => j.Run(), Cron.Minutely);

            //RecurringJobManager.AddOrUpdate<FirstRecuringJob>(Guid.NewGuid().ToString(), j => j.Run(), Cron.Minutely);
            RecurringJob.AddOrUpdate<SecondRecuringJob>(Guid.NewGuid().ToString(), j => j.Run(), Cron.Minutely);

            BackgroundJob.Enqueue<OneShotJob>(j => j.Run());
            //BackgroundJob.Enqueue<OneShotJob>("toto", j => j.Run());
            //BackgroundJob.con
            //RecurringJob.AddOrUpdate<FirstRecuringJob>(Guid.NewGuid().ToString(), j => j.Run(), Cron.Minutely()/*, new RecurringJobOptions { }*/);

            return app;
        }
    }
}
