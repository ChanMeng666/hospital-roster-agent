"use client";
import { CopilotKit } from "@copilotkit/react-core";
import { CopilotSidebar } from "@copilotkit/react-ui";
import "@copilotkit/react-ui/styles.css";
import "@toast-ui/calendar/dist/toastui-calendar.min.css";
import "tui-date-picker/dist/tui-date-picker.css";
import "tui-time-picker/dist/tui-time-picker.css";
import RosterCalendar from "./components/RosterCalendar";
import StaffList from "./components/StaffList";
import { RosterAgentState, Staff } from "./types/roster";
import { initialRosterState } from "./data/mockData";
import { useState } from "react";

export default function Home() {
  return (
    <CopilotKit
      runtimeUrl="/api/copilotkit"
    >
      <div className="app-container">
        <MainContent />
        <CopilotSidebar
          defaultOpen={true}
          labels={{
            title: "AI Roster Assistant",
            initial: "Hello! I'm your AI scheduling assistant. I can help you manage staff schedules, create shifts, and optimize rosters. What would you like to do today?",
          }}
          clickOutsideToClose={false}
        />
      </div>
    </CopilotKit>
  );
}

function MainContent() {
  const [rosterState, setRosterState] = useState<RosterAgentState>(initialRosterState);

  const handleAddStaff = (newStaff: Omit<Staff, "id">) => {
    const staff: Staff = {
      ...newStaff,
      id: `staff-${Date.now()}`,
    };
    setRosterState({
      ...rosterState,
      staff: [...rosterState.staff, staff],
    });
  };

  const handleEditStaff = (updatedStaff: Staff) => {
    // Update staff info
    const updatedStaffList = rosterState.staff.map(s =>
      s.id === updatedStaff.id ? updatedStaff : s
    );

    // Update shift titles if name changed
    const oldStaff = rosterState.staff.find(s => s.id === updatedStaff.id);
    let updatedShifts = rosterState.shifts;
    
    if (oldStaff && oldStaff.name !== updatedStaff.name) {
      updatedShifts = rosterState.shifts.map(shift => {
        if (shift.staffId === updatedStaff.id) {
          return {
            ...shift,
            title: shift.title.replace(oldStaff.name, updatedStaff.name),
          };
        }
        return shift;
      });
    }

    setRosterState({
      ...rosterState,
      staff: updatedStaffList,
      shifts: updatedShifts,
    });
  };

  const handleDeleteStaff = (staffId: string) => {
    setRosterState({
      ...rosterState,
      staff: rosterState.staff.filter(s => s.id !== staffId),
      shifts: rosterState.shifts.filter(shift => shift.staffId !== staffId),
    });
  };

  return (
    <div className="calendar-container">
      <h1 className="text-3xl font-bold p-6 bg-white border-b">Hospital Staff Roster</h1>
      <StaffList 
        staff={rosterState.staff}
        onAddStaff={handleAddStaff}
        onEditStaff={handleEditStaff}
        onDeleteStaff={handleDeleteStaff}
      />
      <RosterCalendar 
        rosterState={rosterState}
        onStateChange={setRosterState}
      />
    </div>
  );
}