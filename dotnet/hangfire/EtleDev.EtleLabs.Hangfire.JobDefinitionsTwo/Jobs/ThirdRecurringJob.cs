using EtleDev.EtleLabs.Hangfire.SharedKernel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EtleDev.EtleLabs.Hangfire.Two.Facade.Jobs
{
    public class ThirdRecurringJob : IJob
    {
        public string Name
        {
            get => "Third Recuring job";
        }
        public async Task Run()
        {
            Console.WriteLine("Third Recuring job started !");
            await Task.Delay(10000);
            Console.WriteLine("Third Recuring job finished !");
        }
    }
}
