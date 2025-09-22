import { useState } from "react";

export default function PrescriptionForm({ onSubmit }) {
  const [prescriptionDate, setPrescriptionDate] = useState(new Date().toISOString().slice(0, 10));
  const [prescriptionType, setPrescriptionType] = useState("Standard");
  const [diagnosis, setDiagnosis] = useState("");
  const [templateUsed, setTemplateUsed] = useState("");
  const [notesForPharmacist, setNotesForPharmacist] = useState("");
  const [medications, setMedications] = useState([
    {
      name: "",
      dosage: "",
      route: "Oral",
      frequency: "",
      duration: 0,
      specialInstructions: "",
      allowRefills: false,
      numberOfRefills: 0,
    },
  ]);

  // Add new medication block
  const addMedication = () => {
    setMedications([
      ...medications,
      {
        name: "",
        dosage: "",
        route: "Oral",
        frequency: "",
        duration: 0,
        specialInstructions: "",
        allowRefills: false,
        numberOfRefills: 0,
      },
    ]);
  };

  // Update medication
  const updateMedication = (index, field, value) => {
    const updated = [...medications];
    updated[index][field] = value;
    setMedications(updated);
  };

  // Remove medication
  const removeMedication = (index) => {
    const updated = medications.filter((_, i) => i !== index);
    setMedications(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const prescription = {
      prescriptionDate,
      prescriptionType,
      diagnosis,
      templateUsed,
      medications,
      notesForPharmacist,
    };

    if (onSubmit) {
      onSubmit(prescription);
    }

    console.log("Prescription Submitted:", prescription);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto bg-black text-white p-6 rounded-xl shadow-lg space-y-6">
      <h2 className="text-2xl font-bold">Prescription Details</h2>

      {/* Prescription Meta */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1">Prescription Date</label>
          <input
            type="date"
            value={prescriptionDate}
            onChange={(e) => setPrescriptionDate(e.target.value)}
            className="w-full px-3 py-2 rounded bg-gray-900 border border-gray-700"
          />
        </div>
        <div>
          <label className="block mb-1">Prescription Type</label>
          <select
            value={prescriptionType}
            onChange={(e) => setPrescriptionType(e.target.value)}
            className="w-full px-3 py-2 rounded bg-gray-900 border border-gray-700"
          >
            <option>Standard</option>
            <option>Emergency</option>
            <option>Repeat</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block mb-1">Diagnosis</label>
        <input
          type="text"
          value={diagnosis}
          onChange={(e) => setDiagnosis(e.target.value)}
          placeholder="Enter diagnosis..."
          className="w-full px-3 py-2 rounded bg-gray-900 border border-gray-700"
        />
      </div>

      <div>
        <label className="block mb-1">Use Medication Template (optional)</label>
        <input
          type="text"
          value={templateUsed}
          onChange={(e) => setTemplateUsed(e.target.value)}
          placeholder="Enter template name..."
          className="w-full px-3 py-2 rounded bg-gray-900 border border-gray-700"
        />
      </div>

      {/* Medications Section */}
      <div>
        <h3 className="text-xl font-semibold mb-2">Medications</h3>
        {medications.map((med, index) => (
          <div key={index} className="border border-gray-700 p-4 rounded-lg mb-4 bg-gray-900">
            <h4 className="font-medium mb-2">Medication #{index + 1}</h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
              <input
                type="text"
                placeholder="Medication Name"
                value={med.name}
                onChange={(e) => updateMedication(index, "name", e.target.value)}
                className="px-3 py-2 rounded bg-black border border-gray-700"
              />
              <input
                type="text"
                placeholder="Dosage (e.g. 500mg)"
                value={med.dosage}
                onChange={(e) => updateMedication(index, "dosage", e.target.value)}
                className="px-3 py-2 rounded bg-black border border-gray-700"
              />
              <select
                value={med.route}
                onChange={(e) => updateMedication(index, "route", e.target.value)}
                className="px-3 py-2 rounded bg-black border border-gray-700"
              >
                <option>Oral</option>
                <option>IV</option>
                <option>IM</option>
                <option>Topical</option>
              </select>
              <input
                type="text"
                placeholder="Frequency (e.g. Twice daily)"
                value={med.frequency}
                onChange={(e) => updateMedication(index, "frequency", e.target.value)}
                className="px-3 py-2 rounded bg-black border border-gray-700"
              />
              <input
                type="number"
                placeholder="Duration (days)"
                value={med.duration}
                onChange={(e) => updateMedication(index, "duration", e.target.value)}
                className="px-3 py-2 rounded bg-black border border-gray-700"
              />
              <input
                type="text"
                placeholder="Special Instructions"
                value={med.specialInstructions}
                onChange={(e) => updateMedication(index, "specialInstructions", e.target.value)}
                className="px-3 py-2 rounded bg-black border border-gray-700"
              />
            </div>

            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={med.allowRefills}
                  onChange={(e) => updateMedication(index, "allowRefills", e.target.checked)}
                />
                Allow Refills
              </label>
              {med.allowRefills && (
                <input
                  type="number"
                  placeholder="Number of Refills"
                  value={med.numberOfRefills}
                  onChange={(e) => updateMedication(index, "numberOfRefills", e.target.value)}
                  className="w-28 px-3 py-2 rounded bg-black border border-gray-700"
                />
              )}
            </div>

            {medications.length > 1 && (
              <button
                type="button"
                onClick={() => removeMedication(index)}
                className="mt-3 text-red-400 hover:text-red-600"
              >
                Remove Medication
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={addMedication}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg"
        >
          ➕ Add Medication
        </button>
      </div>

      {/* Notes */}
      <div>
        <label className="block mb-1">Notes for Pharmacist</label>
        <textarea
          value={notesForPharmacist}
          onChange={(e) => setNotesForPharmacist(e.target.value)}
          placeholder="Enter additional notes..."
          className="w-full px-3 py-2 rounded bg-gray-900 border border-gray-700"
        />
      </div>

      <button
        type="submit"
        className="w-full py-3 bg-green-600 hover:bg-green-700 rounded-lg font-semibold"
      >
        Save Prescription
      </button>
    </form>
  );
}
