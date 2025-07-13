"use client";
import { CopilotKit } from "@copilotkit/react-core";
import { CopilotSidebar } from "@copilotkit/react-ui";
import "@copilotkit/react-ui/styles.css";
import { useState } from "react";
import HospitalSpreadsheet from "../components/HospitalSpreadsheet";
import Navigation from "../components/Navigation";
import { SpreadsheetData } from "../types/spreadsheet";
import { initialSpreadsheetData } from "../data/spreadsheetData";

export default function SpreadsheetPage() {
  return (
    <CopilotKit runtimeUrl="/api/copilotkit">
      <div className="app-container">
        <SpreadsheetContent />
        <CopilotSidebar
          defaultOpen={true}
          clickOutsideToClose={false}
          instructions="You are a hospital roster management assistant. Help users manage staff schedules, shifts, and roster data in spreadsheet format. You can create new spreadsheets, edit existing ones, and help with scheduling calculations."
          labels={{
            title: "AI Roster Assistant",
            initial: "Welcome to the Hospital Roster Spreadsheet! How can I help you manage the roster data?",
          }}
        />
      </div>
    </CopilotKit>
  );
}

function SpreadsheetContent() {
  const [spreadsheets, setSpreadsheets] = useState<SpreadsheetData[]>(initialSpreadsheetData);
  const [selectedSpreadsheetIndex, setSelectedSpreadsheetIndex] = useState(0);

  return (
    <div className="calendar-container">
      <Navigation currentPage="spreadsheet" />
      <HospitalSpreadsheet
        spreadsheets={spreadsheets}
        selectedSpreadsheetIndex={selectedSpreadsheetIndex}
        setSelectedSpreadsheetIndex={setSelectedSpreadsheetIndex}
        spreadsheet={spreadsheets[selectedSpreadsheetIndex]}
        setSpreadsheet={(spreadsheet) => {
          setSpreadsheets((prev) => {
            const newSpreadsheets = [...prev];
            newSpreadsheets[selectedSpreadsheetIndex] = spreadsheet;
            return newSpreadsheets;
          });
        }}
        setSpreadsheets={setSpreadsheets}
      />
    </div>
  );
}