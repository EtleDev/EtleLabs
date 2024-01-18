using EtleDev.EtleLabs.Hangfire.SharedKernel;

namespace EtleDev.EtleLabs.Hangfire.One.Facade.Jobs
{
    public class LongRunJob : IJob
    {
        public string Name
        {
            get => "Long job";
        }
        public async Task Run()
        {
            Console.WriteLine("Long job started !");
            var taskList = new List<Task>();
            for (int i = 0; i < 1000; i++)
            {
                taskList.Add(Task.Delay(1000));
            }

            await Task.WhenAll(taskList);

            Console.WriteLine("Long job finished !");
        }
    }
}
