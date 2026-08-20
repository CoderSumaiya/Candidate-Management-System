using MasterDetailsApi.Data;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers()
    .AddNewtonsoftJson(options => {
        options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
    });
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("con"))); 
builder.Services.AddCors(options =>{
    options.AddPolicy(name: "AllowSpecificOrigin",
    policy =>{ policy.AllowAnyOrigin()
    .AllowAnyHeader().AllowAnyMethod();});  });
var app = builder.Build();
if (app.Environment.IsDevelopment()){
    app.UseSwagger();app.UseSwaggerUI();}
app.UseHttpsRedirection(); 
app.UseStaticFiles(); 
app.UseRouting();
app.UseCors("AllowSpecificOrigin"); 
app.UseAuthorization(); 
app.MapControllers();
app.Run();
