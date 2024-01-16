using EtleDev.EtleLabs.Hangfire.WorkerOne;
using Hangfire;
using Hangfire.Redis.StackExchange;
using StackExchange.Redis;

var builder = Host.CreateApplicationBuilder(args);
//builder.Services.AddHostedService<Worker>();
builder.Services.AddHangfire(configuration => configuration
            .SetDataCompatibilityLevel(CompatibilityLevel.Version_180)
            .UseSimpleAssemblyNameTypeSerializer()
            .UseRecommendedSerializerSettings()
            //.UseSQLiteStorage("Data Source=./hfdb.db"));
            .UseRedisStorage(ConnectionMultiplexer.Connect("redis-db:6379,allowAdmin=true,defaultDatabase=3,name=HF"), new RedisStorageOptions { Db = 3 }));

builder.Services.AddHangfireServer();

var host = builder.Build();

host.Run();
