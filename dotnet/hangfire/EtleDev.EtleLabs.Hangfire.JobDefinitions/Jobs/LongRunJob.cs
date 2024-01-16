namespace EtleDev.EtleLabs.Hangfire.JobDefinitions.Jobs
{
    public class LongRunJob : IJob
    {
        public async Task Run()
        {
            Console.WriteLine("Long job started !");
            await Task.Delay(10000);
            Console.WriteLine("Long job finished !");
        }
    }
}
