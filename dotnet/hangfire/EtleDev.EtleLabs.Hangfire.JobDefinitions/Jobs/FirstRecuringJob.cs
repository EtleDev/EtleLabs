using EtleDev.EtleLabs.Hangfire.SharedKernel;

namespace EtleDev.EtleLabs.Hangfire.One.Facade.Jobs
{
    public class FirstRecuringJob : IJob
    {
        public string Name
        {
            get => "First Recuring job";
        }
        public async Task Run()
        {
            Console.WriteLine("First Recuring job started !");
            await Task.Delay(10000);
            Console.WriteLine("First Recuring job finished !");
        }
    }
}
