import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import NavbarLayout from "./components/NavbarLayout";
import CandidateList from "./components/CandidateList";
import CandidateForm from "./components/CandidateForm";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NavbarLayout />}>
          <Route index element={<CandidateList />} />
          <Route path="/candidates/new" element={<CandidateForm />} />
          <Route path="/candidates/edit/:id" element={<CandidateForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}