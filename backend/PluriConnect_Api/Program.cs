using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using PluriConnect_Api.Database;
using PluriConnect_Api.Extensions;
using PluriConnect_Api.Services;

var builder = WebApplication.CreateBuilder(args);

// CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("FrontendPolicy", policy =>
    {
        policy.WithOrigins("http://localhost:5173")
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

string dBPath = Path.Combine("Data", "pluriconnect.db");
Directory.CreateDirectory("Data");
builder.Services.AddDbContext<PluriConnect_Api.Database.AppDbContext>(options =>
    options.UseSqlite($"Data Source={dBPath}"));

builder.Services.AddScoped(typeof(GenericService<>));

WebApplication app = builder.Build();
app.UseCors("FrontendPolicy");

using (var scope = app.Services.CreateScope())
{
    AppDbContext dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    dbContext.Database.EnsureCreated();

    await SeedLoader.LoadAllJsonAsync(dbContext);
}

app.MapGet("/", () => "Backend OK!");

app.MapCrud<Activity>("activities");
app.MapCrud<ActivityInstance>("activity-instances");
app.MapCrud<Child>("children");
app.MapCrud<ChildContact>("child-contacts");
app.MapCrud<Comment>("comments");

app.Run();
