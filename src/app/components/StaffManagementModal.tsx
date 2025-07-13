import React, { useState, useEffect } from "react";
import { Staff } from "../types/roster";

interface StaffManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
  staff?: Staff;
  onSave: (staff: Omit<Staff, "id"> & { id?: string }) => void;
  mode: "create" | "edit";
}

export default function StaffManagementModal({
  isOpen,
  onClose,
  staff,
  onSave,
  mode,
}: StaffManagementModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    role: "Doctor" as Staff["role"],
    department: "Emergency",
    color: "#9B59B6",
  });

  useEffect(() => {
    if (staff && mode === "edit") {
      setFormData({
        name: staff.name,
        role: staff.role,
        department: staff.department,
        color: staff.color,
      });
    }
  }, [staff, mode]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "edit" && staff) {
      onSave({ ...formData, id: staff.id });
    } else {
      onSave(formData);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">
          {mode === "create" ? "Add New Staff Member" : "Edit Staff Member"}
        </h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Role
            </label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value as Staff["role"] })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Doctor">Doctor</option>
              <option value="Nurse">Nurse</option>
              <option value="Technician">Technician</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Department
            </label>
            <input
              type="text"
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Color
            </label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={formData.color}
                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                className="h-10 w-20"
              />
              <input
                type="text"
                value={formData.color}
                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                pattern="^#[0-9A-Fa-f]{6}$"
                required
              />
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-md transition-colors font-medium"
              style={{ 
                backgroundColor: "var(--brand-primary)",
                color: "#000"
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "var(--brand-primary-hover)"}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "var(--brand-primary)"}
            >
              {mode === "create" ? "Add Staff" : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}