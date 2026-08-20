import React, { useEffect, useState, type ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type {
  CandidateFormState,
  CandidateSkillReadDto,
  Skill,
} from "../types";
import {
  createCandidate,
  getCandidateById,
  getImagePath,
  getSkills,
  updateCandidate,
} from "../services/api";

const CandidateForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const candidateId = id ? parseInt(id) : null;
  const [skillsLookup, setSkillsLookup] = useState<Skill[]>([]);
  const [candidate, setCandidate] = useState<CandidateFormState>({
    candidateName: "",
    dateOfBirth: "",
    mobileNo: "",
    picture: "",
    isFresher: false,
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [candidateSkills, setCandidateSkills] = useState<
    CandidateSkillReadDto[]
  >([]);
  const [currentSkillId, setCurrentSkillId] = useState<string>("");
  const [currentDuration, setCurrentDuration] = useState<string>("");
  useEffect(() => {
    getSkills()
      .then((res) => setSkillsLookup(res.data))
      .catch((err) => console.error(err));
    if (candidateId) {
      getCandidateById(candidateId)
        .then((res) => {
          const data = res.data;
          setCandidate({
            candidateId: data.candidateId,
            candidateName: data.candidateName,
            dateOfBirth: data.dateOfBirth ? data.dateOfBirth.split("T")[0] : "",
            mobileNo: data.mobileNo,
            picture: data.picture || "",
            isFresher: data.isFresher,
          });
          if (data.picture) {
            setImagePreview(getImagePath(data.picture));
          }
          setCandidateSkills(
            data.candidateSkills.map((s) => ({
              skillId: s.skillId,
              skillName: s.skillName,
              duration: s.duration,
            })),
          );
        })
        .catch((err) => console.error(err));
    }
  }, [candidateId]);
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCandidate((prev) => ({ ...prev, [name]: value }));
  };
  const handleCheckBoxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setCandidate((prev) => ({ ...prev, [name]: checked }));
  };
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };
  const addSkillItem = (): void => {
    if (!currentSkillId || !currentDuration) return;
    const targetSkillId = parseInt(currentSkillId);
    if (candidateSkills.some((s) => s.skillId === targetSkillId)) {
      alert("This skill is already assigned");
      return;
    }
    const matchedSkillObj = skillsLookup.find(
      (s) => s.skillId === targetSkillId,
    );
    if (!matchedSkillObj) return;
    setCandidateSkills([
      ...candidateSkills,
      {
        skillId: targetSkillId,
        skillName: matchedSkillObj.skillName,
        duration: parseInt(currentDuration),
      },
    ]);
    setCurrentSkillId("");
    setCurrentDuration("");
  };
  const removeSkillItem = (index: number): void => {
    setCandidateSkills(candidateSkills.filter((_, i) => i !== index));
  };
  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("candidateName", candidate.candidateName);
    formData.append("dateOfBirth", candidate.dateOfBirth || "");
    formData.append("mobileNo", candidate.mobileNo);
    formData.append("isFresher", candidate.isFresher.toString());
    if (candidate.picture) {
      formData.append("picture", candidate.picture);
    }
    if (selectedFile) {
      formData.append("pictureFile", selectedFile);
    }
    const skills = candidateSkills.map((s) => ({
      skillId: s.skillId,
      duration: s.duration,
    }));
    formData.append("candidateSkillsJson", JSON.stringify(skills));
    try {
      if (candidateId) {
        await updateCandidate(candidateId, formData);
      } else {
        await createCandidate(formData);
      }
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <div className="card shadow-sm p-4">
        <h3 className="mb-4 text-dark fw-bold border-bottom pb-2">
          {candidateId ? "Update Candidate" : "Add Candidate"}
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="row align-item-end mb-3">
            <div className="col-md-4">
              <label className="form-label fw-bold">Candidate Name</label>
              <input
                type="text"
                className="form-control"
                name="candidateName"
                value={candidate.candidateName}
                onChange={handleInputChange}
                required
                maxLength={100}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label fw-bold">Date of Birth</label>
              <input
                type="date"
                className="form-control"
                name="dateOfBirth"
                value={candidate.dateOfBirth || ""}
                onChange={handleInputChange}
                required
                maxLength={100}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label fw-bold">Mobile No</label>
              <input
                type="text"
                className="form-control"
                name="mobileNo"
                value={candidate.mobileNo}
                onChange={handleInputChange}
                required
                maxLength={100}
              />
            </div>
          </div>
          <div className="row align-item-end mb-3">
            <div className="col-md-4">
              <label className="form-label fw-bold">Select</label>
              <div
                className="form-check form-switch p-3 border rounded w-100"
                style={{
                  height: "43px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <input
                name="isFresher"
                  className="form-check-input ms-2 me-3"
                  type="checkbox"
                  id="isFresherCheck"
                  checked={candidate.isFresher}
                  onChange={handleCheckBoxChange}
                />
                <label className="form-label" htmlFor="isFresherCheck">
                  Fresher?
                </label>
              </div>
            </div>
            <div className="col-md-4">
              <label className="form-label fw-bold">Upload Image</label>
              <input
                type="file"
                className="form-control"
                onChange={handleFileChange}
                accept="image/*"
              />
            </div>
            <div className="col-md-4">
              {imagePreview ? (
                <div
                  className="p-2 border rounded bg-light d-flex align-items-center gap-3"
                  style={{ minHeight: "75px" }}
                >
                  <img
                    src={imagePreview}
                    className="img-thumbnail"
                    style={{
                      width: "60px",
                      height: "60px",
                      objectFit: "cover",
                    }}
                  />
                  <span>Image Preview</span>
                </div>
              ) : (
                <div>
                  <span>No image linked</span>
                </div>
              )}
            </div>
          </div>
          <hr className="my-4" />
          <div className="row g-3 align-items-end mb-3">
            <div className="col-md-4">
              <label className="form-label fw-bold">Select List</label>
              <select
                className="form-select"
                value={currentSkillId}
                onChange={(e) => setCurrentSkillId(e.target.value)}
              >
                <option value={""}>Select Skill</option>
                {skillsLookup.map((s) => (
                  <option key={s.skillId} value={s.skillId}>
                    {s.skillName}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-4">
              <label className="form-label fw-bold">Durations(Years)</label>
              <input
                className="form-control"
                type="number"
                min="0"
                max="100"
                value={currentDuration}
                onChange={(e) => setCurrentDuration(e.target.value)}
                placeholder="Years of experience"
              />
            </div>
            <div className="col-md-4">
              <button
                onClick={addSkillItem}
                type="button"
                className="btn btn-primary btn-sm"
              >
                Add Skill
              </button>
            </div>
          </div>
          <div className="row g-3 align-items-end mb-3">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Skill Name</th>
                  <th>Duration</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {candidateSkills.length === 0 ? (
                  <tr>
                    <td colSpan={3}>No Skill Found</td>
                  </tr>
                ) : (
                  candidateSkills.map((item, index) => (
                    <tr key={index}>
                      <td>{item.skillName}</td>
                      <td>{item.duration}</td>
                      <td>
                        <button
                          onClick={() => removeSkillItem(index)}
                          type="button"
                          className="btn btn-danger"
                        >
                          <i className="bi bi-trash me-1"></i>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            <div className="d-flex justify-content-end gap-2 mt-4 border-top pt-3">
              <button
                onClick={() => navigate("/")}
                type="button"
                className="btn btn-warning px-4"
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-success px-4">
                Commit Candidate
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default CandidateForm;
