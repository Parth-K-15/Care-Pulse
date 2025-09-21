import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const PatientTable = () => {
  const [patients, setPatients] = useState([]);

  // Fetch patients
  useEffect(() => {
    fetch("http://localhost:5000/api/patients")
      .then((res) => res.json())
      .then((data) => setPatients(data))
      .catch((err) => console.error("Error fetching patients:", err));
  }, []);

  // Helper: calculate age
  const calculateAge = (dob) => {
    if (!dob) return "-";
    const diff = Date.now() - new Date(dob).getTime();
    return Math.abs(new Date(diff).getUTCFullYear() - 1970);
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-bold mb-6">Patients</h1>
      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-800/50">
              <TableHead className="text-white">Name</TableHead>
              <TableHead className="text-white">Age / Gender</TableHead>
              <TableHead className="text-white">Status</TableHead>
              <TableHead className="text-white">Last Visit</TableHead>
              <TableHead className="text-white">Condition</TableHead>
              <TableHead className="text-white">Doctor</TableHead>
              <TableHead className="text-white text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {patients.map((p) => (
              <TableRow key={p._id} className="hover:bg-gray-800/30">
                <TableCell>
                  {p.firstName} {p.lastName}
                </TableCell>
                <TableCell>
                  {calculateAge(p.dob)} / {p.gender}
                </TableCell>
                <TableCell>
                  <span
                    className={`px-3 py-1 text-sm rounded-full ${
                      p.status === "Admitted"
                        ? "bg-green-500/20 text-green-400"
                        : p.status === "Discharged"
                        ? "bg-blue-500/20 text-blue-400"
                        : "bg-gray-500/20 text-gray-400"
                    }`}
                  >
                    {p.status || "Unknown"}
                  </span>
                </TableCell>
                <TableCell>
                  {p.lastVisit ? new Date(p.lastVisit).toLocaleDateString() : "-"}
                </TableCell>
                <TableCell>{p.condition || "-"}</TableCell>
                <TableCell>{p.doctor || "-"}</TableCell>
                <TableCell className="text-center space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-xs"
                    onClick={() => alert(`Viewing profile of ${p.firstName}`)}
                  >
                    Profile
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-xs"
                    onClick={() => alert(`Editing ${p.firstName}`)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-xs"
                    onClick={() => alert(`Prescription for ${p.firstName}`)}
                  >
                    Prescription
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-xs"
                    onClick={() => alert(`History of ${p.firstName}`)}
                  >
                    History
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default PatientTable;
