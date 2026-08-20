import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { CandidateReadDto } from "../types";
import { deleteCandidate, getCandidates, getImagePath } from "../services/api";

const CandidateList: React.FC = () => {
  const navigate = useNavigate();
  const [candidates, setCandidates] = useState<CandidateReadDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const loadRecords = (isInitialLoad = false): void => {
    setTimeout(() => {
      if (!isInitialLoad) {
        setLoading(true);
      }
      getCandidates()
        .then((response) => {
          setCandidates(response.data);
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }, 0);
  };
  useEffect(() => {
    loadRecords(true);
  }, []);
  const handleDelete = async (id: number): Promise<void> => {
    const userConfirmed = window.confirm("Are you sure to delete this record?");
    if (userConfirmed) {
      try {
        await deleteCandidate(id);
        loadRecords();
      } catch (error) {
        console.error(error);
      }
    }
  };
  if (loading) {
    return (
      <div className="text-center my-5">
        <div className="text-primary" role="status">
          <span className="visually-hidden">Loading data from server.....</span>
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="card p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="mb-0 text-dark">Candidate List</h3>
          <Link to="/candidates/new" className="btn btn-primary fw-bold">
            +Add New Candidate
          </Link>
        </div>
        <div className="table-response">
          <table className="table table-bordered">
            <thead className="table-dark">
              <tr>
                <th>Image</th>
                <th>Candidate Name</th>
                <th>Date of Birth</th>
                <th>Mobile No</th>
                <th>Fresher?</th>
                <th className="text-start">Skills</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {candidates.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center">
                    No Record Found
                  </td>
                </tr>
              ) : (
                candidates.map((candidateItem) => (
                  <tr key={candidateItem.candidateId}>
                    <td>
                      <img
                        src={getImagePath(
                          candidateItem.picture || "noimage.png",
                        )}
                        style={{ width: "60px", objectFit: "cover" }}
                      />
                    </td>
                    <td className="fw-bold">{candidateItem.candidateName}</td>
                    <td className="fw-bold">
                      {candidateItem.dateOfBirth
                        ? new Date(
                            candidateItem.dateOfBirth,
                          ).toLocaleDateString()
                        : "N/A"}
                    </td>
                    <td className="fw-bold">{candidateItem.mobileNo}</td>
                    <td className="fw-bold">
                      {candidateItem.isFresher ? (
                        <span className="badge bg-success">Yes</span>
                      ) : (
                        <span className="badge bg-secondary">No</span>
                      )}
                    </td>
                    <td className="text-start">
                      {candidateItem.candidateSkills &&
                      candidateItem.candidateSkills.length > 0 ? (
                        <ul className="mb-0 small">
                          {candidateItem.candidateSkills.map(
                            (skillItem, index) => (
                              <li
                                key={index}
                                className="mb-0 text-dark text-start"
                              >
                                <span className="fw-bold">
                                  {skillItem.skillName}
                                  <span className="fw-bold">
                                    {""}({skillItem.duration} Years)
                                  </span>
                                </span>
                              </li>
                            ),
                          )}
                        </ul>
                      ) : (
                        <span className="text-muted small d-block text-start">
                          No Skill Found
                        </span>
                      )}
                    </td>
                    <td className="text-center">
                      <div className="btn-group shadow-sm">
                        <button
                        onClick={()=>navigate(`candidates/edit/${candidateItem.candidateId}`)}
                          type="button"
                          className="btn btn-warning btn-sm"
                        >
                          <i className="bi bi-pencil"></i>
                        </button>
                        |
                        <button onClick={()=>handleDelete(candidateItem.candidateId)} type="button" className="btn btn-danger btn-sm">
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default CandidateList;
