using MasterDetailsApi.Models;
using Microsoft.EntityFrameworkCore;

namespace MasterDetailsApi.Data{
    public class AppDbContext:DbContext{
        public AppDbContext(DbContextOptions<AppDbContext> op) : base(op) { }
        public DbSet<Candidate> Candidates { get; set; }
        public DbSet<CandidateSkill> CandidateSkills { get; set; }
        public DbSet<Skill> Skills { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder){
           modelBuilder.Entity<Skill>().HasData(
                new Skill { SkillId = 1, SkillName = "C#" },
                new Skill { SkillId = 2, SkillName = "ASP.NET Core" },
                new Skill { SkillId = 3, SkillName = "Angular" },
                new Skill { SkillId = 4, SkillName = "SQL Server" },
                new Skill { SkillId = 5, SkillName = "JavaScript" });
            base.OnModelCreating(modelBuilder);}
    }
}
