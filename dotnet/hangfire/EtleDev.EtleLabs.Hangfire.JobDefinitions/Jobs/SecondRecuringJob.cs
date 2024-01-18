using EtleDev.EtleLabs.Hangfire.SharedKernel;

namespace EtleDev.EtleLabs.Hangfire.One.Facade.Jobs
{
    public class SecondRecuringJob : IJob
    {
        public string Name
        {
            get => "Second Recuring job";
        }
        public async Task Run()
        {
            Console.WriteLine("Second Recuring job started !");
            await Task.Delay(32000);
            Console.WriteLine("Second Recuring job finished !");
        }
    }
}
