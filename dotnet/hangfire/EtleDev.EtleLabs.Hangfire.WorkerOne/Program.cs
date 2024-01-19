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

builder.Services.AddSingleton(new BackgroundJobServerOptions { Queues = ["one"] });

builder.Services.AddHangfireServer();
//builder.Services.AddHangfireServer((sp, cfg) => cfg = new BackgroundJobServerOptions { Queues = ["one"] });
//builder.Services.AddHangfireServer((cfg) => new BackgroundJobServerOptions { Queues = ["one"] });
//builder.Services.AddHangfireServer((sp, cfg) => new BackgroundJobServerOptions { Queues = new[] { "One" } });

var host = builder.Build();

host.Run();
