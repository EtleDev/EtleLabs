namespace EtleDev.EtleLabs.Hangfire.SharedKernel
{
    public interface IJob
    {
        public string Name { get; }
        Task Run();
    }
}
