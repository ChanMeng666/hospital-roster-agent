import React, { useState } from "react";
import { Staff } from "../types/roster";
import StaffManagementModal from "./StaffManagementModal";

interface StaffListProps {
  staff: Staff[];
  onAddStaff?: (staff: Omit<Staff, "id">) => void;
  onEditStaff?: (staff: Staff) => void;
  onDeleteStaff?: (staffId: string) => void;
}

export default function StaffList({ staff, onAddStaff, onEditStaff, onDeleteStaff }: StaffListProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState<Staff | undefined>();
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  return (
    <div className="bg-white p-6 border-b">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Staff Members</h2>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          onClick={() => {
            setModalMode("create");
            setEditingStaff(undefined);
            setIsModalOpen(true);
          }}
        >
          + Add Staff
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {staff.map((member) => (
          <div
            key={member.id}
            className="flex items-center p-3 border rounded-lg hover:shadow-md transition-shadow group relative"
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
            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => {
                  setModalMode("edit");
                  setEditingStaff(member);
                  setIsModalOpen(true);
                }}
                className="p-1 text-blue-600 hover:bg-blue-100 rounded"
                aria-label="Edit staff"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
              <button
                onClick={() => {
                  if (confirm(`Are you sure you want to remove ${member.name}?`)) {
                    onDeleteStaff?.(member.id);
                  }
                }}
                className="p-1 text-red-600 hover:bg-red-100 rounded"
                aria-label="Delete staff"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      <StaffManagementModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        staff={editingStaff}
        mode={modalMode}
        onSave={(staffData) => {
          if (modalMode === "create") {
            onAddStaff?.(staffData);
          } else if (modalMode === "edit" && staffData.id) {
            onEditStaff?.(staffData as Staff);
          }
        }}
      />
    </div>
  );
}