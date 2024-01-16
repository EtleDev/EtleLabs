namespace EtleDev.EtleLabs.Hangfire.JobDefinitions.Jobs
{
    public class FirstRecuringJob : IJob
    {
        public async Task Run()
        {
            Console.WriteLine("First Recuring job started !");
            await Task.Delay(10000);
            Console.WriteLine("First Recuring job finished !");
        }
    }
}
