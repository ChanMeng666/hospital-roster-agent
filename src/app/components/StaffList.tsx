import React, { useState, useMemo } from "react";
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
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Get unique departments
  const departments = useMemo(() => {
    const uniqueDepts = Array.from(new Set(staff.map(s => s.department)));
    const depts = ["All", ...uniqueDepts];
    return depts;
  }, [staff]);

  // Filter staff by department and search
  const filteredStaff = useMemo(() => {
    let filtered = staff;
    
    if (selectedDepartment !== "All") {
      filtered = filtered.filter(s => s.department === selectedDepartment);
    }
    
    if (searchQuery) {
      filtered = filtered.filter(s => 
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.role.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return filtered;
  }, [staff, selectedDepartment, searchQuery]);

  // Group staff by department for compact view
  const staffByDepartment = useMemo(() => {
    const grouped: { [key: string]: Staff[] } = {};
    filteredStaff.forEach(member => {
      if (!grouped[member.department]) {
        grouped[member.department] = [];
      }
      grouped[member.department].push(member);
    });
    return grouped;
  }, [filteredStaff]);

  return (
    <div className="bg-white border-b">
      {/* Header with toggle */}
      <div className="p-4 pb-0">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-2 text-xl font-semibold hover:text-gray-700 transition-colors"
            >
              <svg 
                className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-90' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              Staff Members
            </button>
            <span className="text-sm text-gray-500">
              ({filteredStaff.length} {filteredStaff.length === 1 ? 'member' : 'members'})
            </span>
          </div>
          <button
            className="px-4 py-2 text-sm text-white rounded-lg transition-colors"
            style={{ 
              backgroundColor: "var(--brand-primary)",
              color: "#000"
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "var(--brand-primary-hover)"}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "var(--brand-primary)"}
            onClick={() => {
              setModalMode("create");
              setEditingStaff(undefined);
              setIsModalOpen(true);
            }}
          >
            + Add Staff
          </button>
        </div>

        {/* Quick stats when collapsed */}
        {!isExpanded && (
          <div className="pb-4 flex flex-wrap gap-4 text-sm">
            {Object.entries(staffByDepartment).map(([dept, members]) => (
              <div key={dept} className="flex items-center gap-2">
                <span className="font-medium">{dept}:</span>
                <span className="text-gray-600">{members.length} staff</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Expandable content */}
      {isExpanded && (
        <div className="px-4 pb-4">
          {/* Filter controls */}
          <div className="mb-4 flex flex-wrap gap-3 items-center">
            {/* Department tabs */}
            <div className="flex gap-1 bg-gray-100 p-1 rounded-lg">
              {departments.map(dept => (
                <button
                  key={dept}
                  onClick={() => setSelectedDepartment(dept)}
                  className={`px-3 py-1.5 text-sm rounded transition-all ${
                    selectedDepartment === dept 
                      ? 'bg-white shadow-sm font-medium' 
                      : 'hover:bg-gray-50'
                  }`}
                  style={selectedDepartment === dept ? { 
                    backgroundColor: "var(--brand-secondary-light)",
                    color: "var(--brand-tertiary)"
                  } : {}}
                >
                  {dept}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="flex-1 max-w-xs">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search staff..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50"
                  style={{ 
                    "--tw-ring-color": "var(--brand-primary)",
                  } as React.CSSProperties}
                />
                <svg 
                  className="absolute left-2.5 top-2 w-4 h-4 text-gray-400" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Staff grid with scroll */}
          <div 
            className="overflow-y-auto pr-2 staff-list-scroll" 
            style={{ maxHeight: "400px" }}
          >
            {filteredStaff.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No staff members found
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
                {filteredStaff.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center p-2 border rounded-lg hover:shadow-md transition-all group relative text-sm"
                    style={{ borderColor: member.color }}
                  >
                    <div
                      className="w-2.5 h-2.5 rounded-full mr-2 flex-shrink-0"
                      style={{ backgroundColor: member.color }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate">{member.name}</div>
                      <div className="text-xs text-gray-600 truncate">
                        {member.role} • {member.department}
                      </div>
                    </div>
                    <div className="flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity ml-1">
                      <button
                        onClick={() => {
                          setModalMode("edit");
                          setEditingStaff(member);
                          setIsModalOpen(true);
                        }}
                        className="p-1 rounded transition-colors"
                        style={{ color: "var(--brand-secondary)" }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "var(--brand-secondary-light)"}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                        aria-label="Edit staff"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Are you sure you want to remove ${member.name}?`)) {
                            onDeleteStaff?.(member.id);
                          }
                        }}
                        className="p-1 text-red-600 hover:bg-red-100 rounded transition-colors"
                        aria-label="Delete staff"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Scroll indicator */}
          {filteredStaff.length > 12 && (
            <div className="text-center mt-2 text-xs text-gray-400">
              Scroll to see more staff members
            </div>
          )}
        </div>
      )}

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