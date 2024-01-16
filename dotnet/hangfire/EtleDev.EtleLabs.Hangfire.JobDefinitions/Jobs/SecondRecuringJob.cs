namespace EtleDev.EtleLabs.Hangfire.JobDefinitions.Jobs
{
    public class SecondRecuringJob : IJob
    {
        public async Task Run()
        {
            Console.WriteLine("Second Recuring job started !");
            await Task.Delay(32000);
            Console.WriteLine("Second Recuring job finished !");
        }
    }
}
