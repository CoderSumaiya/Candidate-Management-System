using MasterDetailsApi.Data;
using MasterDetailsApi.DTOs;
using MasterDetailsApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace MasterDetailsApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CandidatesController : ControllerBase{
        private readonly AppDbContext _context;       
        private readonly IWebHostEnvironment _env;
        public CandidatesController(AppDbContext context, IWebHostEnvironment env){
            _context = context;   _env = env;  }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CandidateReadDto>>> GetCandidates()
        {
            var candidates = await _context.Candidates
                .Include(c => c.CandidateSkills)
                    .ThenInclude(cs => cs.Skill) .ToListAsync();            
            var candidateReadDtos = candidates.Select(c => new CandidateReadDto
            {
                CandidateId = c.CandidateId,
                CandidateName = c.CandidateName,
                DateOfBirth = c.DateOfBirth,
                MobileNo = c.MobileNo,
                IsFresher = c.IsFresher,
                Picture = c.Picture,
                CandidateSkills = c.CandidateSkills.Select(cs => new CandidateSkillReadDto
                {
                    SkillId = cs.SkillId,
                    SkillName = cs.Skill?.SkillName, 
                    Duration = cs.Duration
                }).ToList()
            }).ToList();
            return Ok(candidateReadDtos);
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<CandidateReadDto>> GetCandidate(int id)
        {
            var candidate = await _context.Candidates
                .Include(c => c.CandidateSkills)
                    .ThenInclude(cs => cs.Skill)
                .FirstOrDefaultAsync(c => c.CandidateId == id);
            if (candidate == null){ return NotFound(); }
            var candidateReadDto = new CandidateReadDto{
                CandidateId = candidate.CandidateId,
                CandidateName = candidate.CandidateName,
                DateOfBirth = candidate.DateOfBirth,
                MobileNo = candidate.MobileNo,
                IsFresher = candidate.IsFresher,
                Picture = candidate.Picture,
                CandidateSkills = candidate.CandidateSkills.Select(cs => new CandidateSkillReadDto{
                    SkillId = cs.SkillId,
                    SkillName = cs.Skill?.SkillName,
                    Duration = cs.Duration
                }).ToList()
            };
            return candidateReadDto;
        }
        [HttpPost]
        public async Task<ActionResult<CandidateReadDto>> CreateCandidate([FromForm] CandidateCreateUpdateDto candidateDto){
            if (!ModelState.IsValid){
                return BadRequest(ModelState);
            }
            string uniqueFileName = "noimage.png";
            if (candidateDto.PictureFile != null){
                uniqueFileName = await SavePictureFile(candidateDto.PictureFile);
            }
            var candidate = new Candidate {
                CandidateName = candidateDto.CandidateName,
                DateOfBirth = candidateDto.DateOfBirth,
                MobileNo = candidateDto.MobileNo,
                IsFresher= candidateDto.IsFresher,
                Picture = uniqueFileName,
                CandidateSkills = new List<CandidateSkill>() 
            };
            if (!string.IsNullOrEmpty(candidateDto.CandidateSkillsJson))
            {
                var candidateSkillDtos = JsonConvert.DeserializeObject<List<CandidateSkillDto>>(candidateDto.CandidateSkillsJson);
                foreach (var skillDto in candidateSkillDtos){
                    candidate.CandidateSkills.Add(new CandidateSkill
                    {
                        SkillId = skillDto.SkillId,
                        Duration = skillDto.Duration
                    });
                }
            }
            _context.Candidates.Add(candidate);
            await _context.SaveChangesAsync();
            var savedCandidate = await _context.Candidates
                .Include(c => c.CandidateSkills)
                .ThenInclude(cs => cs.Skill)
                .FirstOrDefaultAsync(c => c.CandidateId == candidate.CandidateId);
            var createdCandidateReadDto = new CandidateReadDto{
                CandidateId = savedCandidate.CandidateId,
                CandidateName = savedCandidate.CandidateName,
                DateOfBirth = savedCandidate.DateOfBirth,
                MobileNo = savedCandidate.MobileNo,
                IsFresher = savedCandidate.IsFresher,
                Picture = savedCandidate.Picture,
                CandidateSkills = savedCandidate.CandidateSkills.Select(cs => new CandidateSkillReadDto{
                    SkillId = cs.SkillId,
                    SkillName = cs.Skill?.SkillName,
                    Duration = cs.Duration
                }).ToList()
            };

            return CreatedAtAction(nameof(GetCandidate), new { id = createdCandidateReadDto.CandidateId }, createdCandidateReadDto);
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCandidate(int id, [FromForm] CandidateCreateUpdateDto candidateDto){            
            if (id != candidateDto.CandidateId && candidateDto.CandidateId != 0) 
            {
                return BadRequest("Candidate ID mismatch or invalid ID in form data.");
            }
            var existingCandidate = await _context.Candidates
                .Include(c => c.CandidateSkills)
                .FirstOrDefaultAsync(c => c.CandidateId == id);
            if (existingCandidate == null){return NotFound();}           
            if (candidateDto.PictureFile != null){               
                if (existingCandidate.Picture != "noimage.png"){
                    DeletePictureFile(existingCandidate.Picture);
                }
                existingCandidate.Picture = await SavePictureFile(candidateDto.PictureFile);
            }
            else if (!string.IsNullOrEmpty(candidateDto.Picture)){
                existingCandidate.Picture = candidateDto.Picture;
            }
            existingCandidate.CandidateName = candidateDto.CandidateName;
            existingCandidate.DateOfBirth = candidateDto.DateOfBirth;
            existingCandidate.MobileNo = candidateDto.MobileNo;
            existingCandidate.IsFresher = candidateDto.IsFresher;
            existingCandidate.CandidateSkills.Clear(); 
            if (!string.IsNullOrEmpty(candidateDto.CandidateSkillsJson))
            {
                var candidateSkillDtos = JsonConvert.DeserializeObject<List<CandidateSkillDto>>(candidateDto.CandidateSkillsJson);
                foreach (var skillDto in candidateSkillDtos)
                {
                    existingCandidate.CandidateSkills.Add(new CandidateSkill
                    {
                        CandidateId = existingCandidate.CandidateId, 
                        SkillId = skillDto.SkillId,
                        Duration = skillDto.Duration
                    });
                }
            }
            try{ await _context.SaveChangesAsync();}
            catch (DbUpdateConcurrencyException){
                if (!CandidateExists(id)){return NotFound();}
                else{  throw; }
            }
            return NoContent();
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCandidate(int id)
        {
            var candidate = await _context.Candidates
                .Include(c => c.CandidateSkills) 
                .FirstOrDefaultAsync(c => c.CandidateId == id);
            if (candidate == null){
                return NotFound();
            }          
            if (candidate.Picture != "noimage.png"){
                DeletePictureFile(candidate.Picture);
            }
            _context.Candidates.Remove(candidate);
            await _context.SaveChangesAsync();
            return NoContent();
        }
        private bool CandidateExists(int id){
            return _context.Candidates.Any(e => e.CandidateId == id);
        }
        private async Task<string> SavePictureFile(IFormFile file){
            var uploadsFolder = Path.Combine(_env.WebRootPath, "images");
            if (!Directory.Exists(uploadsFolder)){
                Directory.CreateDirectory(uploadsFolder);
            }
            var uniqueFileName = Guid.NewGuid().ToString() + "_" + file.FileName;
            var filePath = Path.Combine(uploadsFolder, uniqueFileName);
            using (var fileStream = new FileStream(filePath, FileMode.Create)){
                await file.CopyToAsync(fileStream);
            }
            return uniqueFileName;
        }
        private void DeletePictureFile(string fileName){
            var filePath = Path.Combine(_env.WebRootPath, "images", fileName); 
            if (System.IO.File.Exists(filePath)){
                System.IO.File.Delete(filePath);
            }
        }
    }
}
