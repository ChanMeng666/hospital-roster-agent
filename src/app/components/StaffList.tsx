import React from "react";
import { Staff } from "../types/roster";

interface StaffListProps {
  staff: Staff[];
}

export default function StaffList({ staff }: StaffListProps) {
  return (
    <div className="mb-6 bg-white rounded-lg shadow p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Staff Members</h2>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          onClick={() => {
            // This will be handled by a modal in the future
            alert("Add Staff feature coming soon! For now, use the AI assistant.");
          }}
        >
          + Add Staff
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {staff.map((member) => (
          <div
            key={member.id}
            className="flex items-center p-3 border rounded-lg hover:shadow-md transition-shadow"
            style={{ borderColor: member.color }}
          >
            <div
              className="w-3 h-3 rounded-full mr-3"
              style={{ backgroundColor: member.color }}
            />
            <div className="flex-1">
              <div className="font-medium">{member.name}</div>
              <div className="text-sm text-gray-600">
                {member.role} - {member.department}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}