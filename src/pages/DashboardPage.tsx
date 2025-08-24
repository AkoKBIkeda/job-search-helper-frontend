import React, { useState, useEffect, use } from "react";
import Header from "../components/Header";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import CompanyForm from "../forms/AddCompanyForm";
import AddCompanyForm from "../forms/AddCompanyForm";
import Button from "../components/Buttons";
import { CompanyList } from "../components/CompanyList";
import { BASE_URL } from "../constants";

// Set type for TS
type Company = {
  id: number;
  name: string;
  website: string;
  jobTitle: string;
};

// Set type for BE model names to avoid TS error
type BECompany = {
  id: number;
  name: string;
  website: string;
  job_title: string;
};

const DashboardPage = () => {
  const { user, isAuthenticated, ready } = useAuth();
  const navigate = useNavigate();
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);

  // Receive BE model names to map them to FE names to avoid TS error
  const frontendCompany = (be: BECompany): Company => ({
    id: be.id,
    name: be.name,
    website: be.website || "",
    jobTitle: be.job_title || "",
  });

  // Only authenticated users can see this page.
  // Direct access to be redirected to the HomePage
  useEffect(() => {
    if (ready && !isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate, ready]);

  // Set Company for the current user
  useEffect(() => {
    const fetchCompanies = async () => {
      setLoading(true);
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(BASE_URL + "/companies/", {
          headers: {
            Authorization: "Token " + token,
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data: BECompany[] = await response.json();
        console.log("fetched data: ", data);
        // Set companies without causing naming error by using frontendCompany
        setCompanies(data.map(frontendCompany));
      } catch (error) {
        console.error("Error fetching companies:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCompanies();
  }, []);

  // Show loading message while fetching data
  if (!ready || (isAuthenticated && user === null)) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="p-10 space-y-4 max-w-full text-center">
      <Header />
      <h1 className="text-primary text-4xl font-bold">Dashboard</h1>
      <h2 className="text-primary text-lg font-semibold">
        Hi, {user?.username}! View and manage your job research here.
      </h2>
      <div className="flex flex-col items-end lg:pr-28">
        <Button onClick={() => navigate("/dashboard/add-company")}>
          Add Company
        </Button>
      </div>
      <div>
        {loading ? (
          <div className="text-center">Loading companies...</div>
        ) : (
          <CompanyList companies={companies} />
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
