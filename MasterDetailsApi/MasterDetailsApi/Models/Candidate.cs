using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace MasterDetailsApi.Models{
    public class Candidate{
        public int CandidateId { get; set; }
        [Required(ErrorMessage = "Required.")]
        [StringLength(100, ErrorMessage = "Cannot exceed 100 characters.")]
        public string CandidateName { get; set; }
        [Column(TypeName = "date")]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)] public DateTime? DateOfBirth { get; set; }
        [Required(ErrorMessage = "Required.")]
        [StringLength(15, ErrorMessage = "Cannot exceed 11 characters.")]
        public string MobileNo { get; set; }
        public string Picture { get; set; } = "noimage.png";
        [NotMapped]
        public IFormFile? PictureFile { get; set; }
        public bool IsFresher { get; set; }
        public ICollection<CandidateSkill> CandidateSkills { get; set; } = new List<CandidateSkill>();
    }
    public class CandidateSkill{
        public int CandidateSkillId { get; set; }
        public int CandidateId { get; set; }
        public virtual Candidate Candidate { get; set; }
        public int SkillId { get; set; }
        public virtual Skill Skill { get; set; }
        [Required]
        [Range(0, 100, ErrorMessage = "Duration must be between 0 and 100 years.")]
        public int Duration { get; set; }
    }
    public class Skill{
        public int SkillId { get; set; }

        [Required(ErrorMessage = "Required.")]
        [StringLength(50, ErrorMessage = "Cannot exceed 50 characters.")]
        public string SkillName { get; set; }
        public ICollection<CandidateSkill> CandidateSkills { get; set; } = new List<CandidateSkill>();
    }
}
