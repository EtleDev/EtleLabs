namespace EtleDev.EtleLabs.Hangfire.JobDefinitions.Jobs
{
    public class OneShotJob : IJob
    {
        public async Task Run()
        {
            Console.WriteLine("One shot job started !");
            await Task.Delay(1000);
            Console.WriteLine("One shot job finished !");
        }
    }
}
