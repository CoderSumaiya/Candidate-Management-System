import axios, { type AxiosResponse } from "axios";
import type { CandidateReadDto, Skill } from "../types";
const BaseUrl = "http://localhost:5145";
const API = axios.create({
  baseURL: `${BaseUrl}/api`,
});
export const getCandidates = (): Promise<AxiosResponse<CandidateReadDto[]>> =>
  API.get<CandidateReadDto[]>("/candidates");
export const getCandidateById = (
  id: number,
): Promise<AxiosResponse<CandidateReadDto>> =>
  API.get<CandidateReadDto>(`/candidates/${id}`);
export const getSkills = (): Promise<AxiosResponse<Skill[]>> =>
  API.get<Skill[]>("/skills");
export const deleteCandidate = (id: number): Promise<AxiosResponse<void>> =>
  API.delete<void>(`/candidates/${id}`);
export const createCandidate = (
  formData: FormData,
): Promise<AxiosResponse<CandidateReadDto>> =>
  API.post<CandidateReadDto>("/candidates", formData, {
    headers: { "Content-Type": `multipart/form-data` },
  });
export const updateCandidate = (
  id: number,
  formData: FormData,
): Promise<AxiosResponse<void>> =>
  API.put<void>(`/candidates/${id}`, formData, {
    headers: { "Content-Type": `multipart/form-data` },
  });
export const getImagePath = (fileName: string): string =>
  `${BaseUrl}/images/${fileName}`;
