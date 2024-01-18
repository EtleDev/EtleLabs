using EtleDev.EtleLabs.Hangfire.SharedKernel;

namespace EtleDev.EtleLabs.Hangfire.One.Facade.Jobs
{
    public class OneShotJob : IJob
    {
        public string Name
        {
            get => "One shot job";
        }
        public async Task Run()
        {
            Console.WriteLine("One shot job started !");
            await Task.Delay(1000);
            Console.WriteLine("One shot job finished !");
        }
    }
}
