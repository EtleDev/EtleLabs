using EtleDev.EtleLabs.Hangfire.WorkerOne;

var builder = Host.CreateApplicationBuilder(args);
builder.Services.AddHostedService<Worker>();

var host = builder.Build();
host.Run();
