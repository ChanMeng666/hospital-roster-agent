"use client";
import { CopilotKit } from "@copilotkit/react-core";
import { CopilotSidebar } from "@copilotkit/react-ui";
import "@copilotkit/react-ui/styles.css";
import "@toast-ui/calendar/dist/toastui-calendar.min.css";
import RosterCalendar from "./components/RosterCalendar";
import { RosterAgentState } from "./types/roster";
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

  return (
    <div className="calendar-container">
      <h1 className="text-3xl font-bold mb-6">Hospital Staff Roster</h1>
      <RosterCalendar 
        rosterState={rosterState}
        onStateChange={setRosterState}
      />
    </div>
  );
}