import React from "react";
import { Link, useNavigate } from "react-router-dom";

// Set type for TS
type Company = {
  id: number;
  name: string;
  website: string;
  jobTitle: string;
};
type Props = {
  companies: Company[];
};

export const CompanyList = ({ companies }: Props) => {
  const navigate = useNavigate();

  // By clicking each company (row), navigate user to edit company information
  const handleClick = (id: number) => {
    navigate("/dashboard/companies/" + id + "/");
  };
  return (
    <div>
      <h2>Companies List</h2>
      <div className="max-w-full border border-primary m-10">
        <table className="min-w-full divide-y divide-primary text-left">
          <thead className="bg-[#E5DC9F] text-primary text-center">
            <tr className="border-r border-dotted px-4 py-2">
              <th className="border-r border-dotted border-gray-800 px-4 py-2">
                Company Name
              </th>
              <th className="border-r border-dotted border-gray-800 px-4 py-2">
                Website
              </th>
              <th className="border-r border-dotted border-gray-800 px-4 py-2">
                Job Roles
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-primary">
            {companies.map((company) => (
              <tr
                key={company.id}
                onClick={() => handleClick(company.id)}
                className={"cursor-pointer hover:bg-[#EAE7D3] transaction"}
              >
                <td className="border-r border-dotted border-gray-800 px-4 py-2">
                  {company.name}
                </td>
                <td className="border-r border-dotted border-gray-800 px-4 py-2">
                  {company.website}
                </td>
                <td className="border-r border-dotted border-gray-800 px-4 py-2">
                  {company.jobTitle}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
