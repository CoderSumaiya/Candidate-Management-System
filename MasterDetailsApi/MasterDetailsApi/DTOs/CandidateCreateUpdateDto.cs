using System.ComponentModel.DataAnnotations;

namespace MasterDetailsApi.DTOs{
    public class CandidateReadDto{
        public int CandidateId { get; set; }
        public string CandidateName { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string MobileNo { get; set; }
        public bool IsFresher { get; set; }
        public string? Picture { get; set; }
        public List<CandidateSkillReadDto> CandidateSkills { get; set; }
    }
    public class CandidateCreateUpdateDto{
        public int CandidateId { get; set; }
        public string CandidateName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string MobileNo { get; set; }
        public bool IsFresher { get; set; }
        public IFormFile? PictureFile { get; set; }
        public string? Picture { get; set; }
        public string CandidateSkillsJson { get; set; }
    }
    public class CandidateSkillDto{
        public int SkillId { get; set; }
        public int Duration { get; set; }
    }
    public class CandidateSkillReadDto{
        public int SkillId { get; set; }
        public string SkillName { get; set; }
        public int Duration { get; set; }
    }
    public class SkillReadDto {
        public int SkillId { get; set; }
        public string SkillName { get; set; }
    }
}
