namespace EtleDev.EtleLabs.Hangfire.JobDefinitions.Jobs
{
    public interface IJob
    {
        Task Run();
    }
}
