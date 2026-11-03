using Microsoft.EntityFrameworkCore;
using TaskManager.Api.Data;
using Microsoft.AspNetCore.Routing;
var builder = WebApplication.CreateBuilder(args);

// Register controllers
builder.Services.AddControllers();

// Configure SQLite database
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite("Data Source=tasks.db"));

// Register OpenAPI
builder.Services.AddOpenApi();

// Configure CORS for React frontend
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy
            .WithOrigins("http://localhost:5173")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

// Configure centralized error handling
builder.Services.AddProblemDetails();

var app = builder.Build();

// Centralized exception handling
app.UseExceptionHandler();

// OpenAPI in development
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

// Middleware pipeline
app.UseCors("AllowReactApp");

app.UseHttpsRedirection();

app.UseAuthorization();

// Map controller routes
app.MapControllers();


app.MapGet("/debug/routes", (IEnumerable<EndpointDataSource> sources) =>
{
    return sources
        .SelectMany(source => source.Endpoints)
        .Select(endpoint => endpoint.DisplayName);
});

app.Run();