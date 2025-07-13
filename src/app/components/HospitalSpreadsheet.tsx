import React from "react";
import Spreadsheet from "react-spreadsheet";
import { useCopilotAction, useCopilotReadable } from "@copilotkit/react-core";
import { SpreadsheetData, SpreadsheetRow } from "../types/spreadsheet";
import { PreviewSpreadsheetChanges } from "./PreviewSpreadsheetChanges";

interface HospitalSpreadsheetProps {
  spreadsheet: SpreadsheetData;
  setSpreadsheet: (spreadsheet: SpreadsheetData) => void;
  spreadsheets: SpreadsheetData[];
  selectedSpreadsheetIndex: number;
  setSelectedSpreadsheetIndex: (index: number) => void;
  setSpreadsheets: React.Dispatch<React.SetStateAction<SpreadsheetData[]>>;
}

export default function HospitalSpreadsheet({
  spreadsheet,
  setSpreadsheet,
  spreadsheets,
  selectedSpreadsheetIndex,
  setSelectedSpreadsheetIndex,
  setSpreadsheets,
}: HospitalSpreadsheetProps) {
  // Make spreadsheet data readable by AI
  useCopilotReadable({
    description: "Current hospital roster spreadsheet",
    value: spreadsheet,
  });

  useCopilotReadable({
    description: "Available spreadsheets",
    value: spreadsheets.map(s => s.title),
  });

  // AI Action: Create new roster spreadsheet
  useCopilotAction({
    name: "createRosterSpreadsheet",
    description: "Create a new hospital roster spreadsheet",
    parameters: [
      {
        name: "rows",
        type: "object[]",
        description: "The rows of the spreadsheet",
        attributes: [
          {
            name: "cells",
            type: "object[]",
            description: "The cells of the row",
            attributes: [
              {
                name: "value",
                type: "string",
                description: "The value of the cell",
              },
            ],
          },
        ],
      },
      {
        name: "title",
        type: "string",
        description: "The title of the spreadsheet (e.g., 'ICU Weekly Roster', 'Night Shift Schedule')",
        required: true,
      },
    ],
    render: (props) => {
      const { rows, title } = props.args;
      const newRows = rows.map((row: any) => 
        row.cells ? row.cells : row.map((cell: any) => ({ value: cell.value || "" }))
      );

      return (
        <PreviewSpreadsheetChanges
          preCommitTitle="Create new roster spreadsheet"
          postCommitTitle="Roster spreadsheet created"
          newRows={newRows}
          commit={(rows) => {
            const newSpreadsheet: SpreadsheetData = {
              title: title || "Untitled Roster",
              rows: rows,
            };
            setSpreadsheets((prev) => [...prev, newSpreadsheet]);
            setSelectedSpreadsheetIndex(spreadsheets.length);
          }}
        />
      );
    },
    handler: () => {
      // The preview component handles the commit
    },
  });

  // AI Action: Update current spreadsheet
  useCopilotAction({
    name: "updateRosterSpreadsheet",
    description: "Update the current hospital roster spreadsheet",
    parameters: [
      {
        name: "rows",
        type: "object[]",
        description: "The updated rows of the spreadsheet",
        attributes: [
          {
            name: "cells",
            type: "object[]",
            description: "The cells of the row",
            attributes: [
              {
                name: "value",
                type: "string",
                description: "The value of the cell",
              },
            ],
          },
        ],
      },
    ],
    render: (props) => {
      const { rows } = props.args;
      const newRows = rows.map((row: any) => 
        row.cells ? row.cells : row.map((cell: any) => ({ value: cell.value || "" }))
      );

      return (
        <PreviewSpreadsheetChanges
          preCommitTitle="Update roster spreadsheet"
          postCommitTitle="Roster spreadsheet updated"
          newRows={newRows}
          oldRows={spreadsheet.rows}
          commit={(rows) => {
            setSpreadsheet({
              ...spreadsheet,
              rows: rows,
            });
          }}
        />
      );
    },
    handler: () => {
      // The preview component handles the commit
    },
  });

  // AI Action: Add staff member to roster
  useCopilotAction({
    name: "addStaffToRoster",
    description: "Add a new staff member to the current roster",
    parameters: [
      {
        name: "staffId",
        type: "string",
        description: "Staff ID",
        required: true,
      },
      {
        name: "staffName",
        type: "string",
        description: "Full name of the staff member",
        required: true,
      },
      {
        name: "role",
        type: "string",
        description: "Role (Doctor, Nurse, Technician)",
        required: true,
      },
      {
        name: "department",
        type: "string",
        description: "Department",
        required: true,
      },
      {
        name: "shifts",
        type: "object",
        description: "Weekly shifts",
        attributes: [
          { name: "monday", type: "string", description: "Monday shift (e.g., '7:00-15:00' or 'OFF')" },
          { name: "tuesday", type: "string", description: "Tuesday shift" },
          { name: "wednesday", type: "string", description: "Wednesday shift" },
          { name: "thursday", type: "string", description: "Thursday shift" },
          { name: "friday", type: "string", description: "Friday shift" },
          { name: "saturday", type: "string", description: "Saturday shift" },
          { name: "sunday", type: "string", description: "Sunday shift" },
        ],
      },
    ],
    handler: ({ staffId, staffName, role, department, shifts }) => {
      const newRow: SpreadsheetRow = [
        { value: staffId },
        { value: staffName },
        { value: role },
        { value: department },
        { value: shifts.monday || "OFF" },
        { value: shifts.tuesday || "OFF" },
        { value: shifts.wednesday || "OFF" },
        { value: shifts.thursday || "OFF" },
        { value: shifts.friday || "OFF" },
        { value: shifts.saturday || "OFF" },
        { value: shifts.sunday || "OFF" },
        { value: "0" }, // Total hours - could be calculated
      ];

      setSpreadsheet({
        ...spreadsheet,
        rows: [...spreadsheet.rows, newRow],
      });
    },
  });

  return (
    <div className="flex-1 bg-white p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-semibold">Spreadsheet Editor</h2>
          <select
            value={selectedSpreadsheetIndex}
            onChange={(e) => setSelectedSpreadsheetIndex(parseInt(e.target.value))}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            style={{ borderColor: "var(--brand-primary)" }}
          >
            {spreadsheets.map((sheet, index) => (
              <option key={index} value={index}>
                {sheet.title}
              </option>
            ))}
          </select>
        </div>
        <div className="text-sm text-gray-500">
          {spreadsheet.rows.length} rows × {spreadsheet.rows[0]?.length || 0} columns
        </div>
      </div>

      <div className="border rounded-lg overflow-auto" style={{ maxHeight: "calc(100vh - 200px)" }}>
        <Spreadsheet
          data={spreadsheet.rows}
          onChange={(data) => {
            setSpreadsheet({
              ...spreadsheet,
              rows: data as SpreadsheetRow[],
            });
          }}
          columnLabels={["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"]}
        />
      </div>

      <div className="mt-4 text-sm text-gray-600">
        <p>💡 Tips:</p>
        <ul className="list-disc list-inside ml-4 mt-2">
          <li>Click any cell to edit its value</li>
          <li>Use Tab or Enter to navigate between cells</li>
          <li>Ask the AI assistant to help with roster calculations or schedule optimization</li>
        </ul>
      </div>
    </div>
  );
}