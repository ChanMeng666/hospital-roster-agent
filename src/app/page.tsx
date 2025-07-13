"use client";
import { CopilotKit } from "@copilotkit/react-core";
import { CopilotSidebar } from "@copilotkit/react-ui";
import "@copilotkit/react-ui/styles.css";
import dynamic from "next/dynamic";
import { RosterAgentState, Staff } from "./types/roster";
import { initialRosterState } from "./data/mockData";
import { useState, Suspense } from "react";

// Dynamic imports to avoid SSR issues
const CalendarStyles = dynamic(() => import("./components/CalendarStyles"), { ssr: false });
const RosterCalendar = dynamic(() => import("./components/RosterCalendar"), { ssr: false });
const StaffList = dynamic(() => import("./components/StaffList"), { ssr: false });
const Navigation = dynamic(() => import("./components/Navigation"), { ssr: false });

export default function Home() {
  return (
    <CopilotKit
      runtimeUrl="/api/copilotkit"
    >
      <Suspense fallback={<div>Loading styles...</div>}>
        <CalendarStyles />
      </Suspense>
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
      <Suspense fallback={<div>Loading navigation...</div>}>
        <Navigation currentPage="calendar" />
      </Suspense>
      <Suspense fallback={<div>Loading staff list...</div>}>
        <StaffList 
          staff={rosterState.staff}
          onAddStaff={handleAddStaff}
          onEditStaff={handleEditStaff}
          onDeleteStaff={handleDeleteStaff}
        />
      </Suspense>
      <Suspense fallback={<div>Loading calendar...</div>}>
        <RosterCalendar 
          rosterState={rosterState}
          onStateChange={setRosterState}
        />
      </Suspense>
    </div>
  );
}