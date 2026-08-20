
using MasterDetailsApi.Data;
using MasterDetailsApi.DTOs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MasterDetailsApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]  
    public class SkillsController : ControllerBase
    {
        private readonly AppDbContext _context;
        public SkillsController(AppDbContext context){
            _context = context; }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<SkillReadDto>>> GetSkills(){
            var skills = await _context.Skills.ToListAsync();
            var skillDtos = skills.Select(s => new SkillReadDto{
                SkillId = s.SkillId, SkillName = s.SkillName
            }).ToList(); 
            return Ok(skillDtos);
        }
    }
}
