import React from "react";
// import logo from './logo.svg';
// import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import CompanyForm from "./forms/AddCompanyForm";
import EditCompanyForm from "./forms/EditCompanyForm";
function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/dashboard/add-company" element={<CompanyForm />} />
          <Route path="/dashboard/companies/:id" element={<EditCompanyForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
