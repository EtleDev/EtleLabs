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
            // appel de l'API
            // l'API lance le job et retourne son Id
            // bool JobIsFinished = false
            // while(!JobIsFinished)
            // {
            //     var result = GetJobState (jobId)
            //     if(result == terminado){
            //         JobIsFinished = true;
            //     }
            // }
        
        }
    }
}
