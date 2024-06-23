import BreadCrumb from "@/components/breadcrumb";
import { PatientForm } from "@/components/forms/users-forms/patient-form/add-edit-patiants";
import React from "react";

export default async function Page() {
  const breadcrumbItems = [
    { title: "Patients", link: "/dashboard/patients" },
    { title: "Create", link: "/dashboard/patients/new" },
  ];

  return (
    <div className="flex-1 space-y-4 p-8">
      <BreadCrumb items={breadcrumbItems}  />
      <PatientForm  />
    </div>
  );
}
