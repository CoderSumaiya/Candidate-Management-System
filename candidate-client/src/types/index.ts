export interface Skill {
  skillId:number;
  skillName:string;
}
export interface CandidateSkillReadDto {
  skillId:number;
  skillName:string;
  duration:number;
}
export interface CandidateReadDto {
  candidateId:number;
  candidateName:string;
  dateOfBirth:string|null;
  mobileNo:string;
  picture:string|null;
  isFresher:boolean;
  candidateSkills:CandidateSkillReadDto[];
}
  export interface CandidateFormState {
  candidateId?:number;
  candidateName:string;
  dateOfBirth:string|null;
  mobileNo:string;
  picture?:string|null;
  isFresher:boolean;
}
export interface CandidateSkillDto {
  skillId:number;
  duration:number;
}