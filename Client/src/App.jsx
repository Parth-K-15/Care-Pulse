import { useState, useEffect } from "react";
import DepartmentForm from "./pages/Department/DepartmentForm";
import DepartmentList from "./pages/Department/DepartmentList";

function App() {
  return (
    <>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start py-10">
        <DepartmentForm />
        <DepartmentList />
      </div>
    </>
  );
}

export default App;
