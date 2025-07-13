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

  // Function to add a new column
  const addColumn = () => {
    // Following spreadsheet-agent pattern exactly
    const spreadsheetRows = [...spreadsheet.rows];
    for (let i = 0; i < spreadsheetRows.length; i++) {
      spreadsheetRows[i].push({ value: "" });
    }
    setSpreadsheet({
      ...spreadsheet,
      rows: spreadsheetRows,
    });
  };

  // Function to add a new row
  const addRow = () => {
    const numberOfColumns = spreadsheet.rows[0]?.length || 12;
    const newRow: SpreadsheetRow = [];
    for (let i = 0; i < numberOfColumns; i++) {
      newRow.push({ value: "" });
    }
    setSpreadsheet({
      ...spreadsheet,
      rows: [...spreadsheet.rows, newRow],
    });
  };

  return (
    <div className="bg-gray-50 h-full flex flex-col">
      <div className="bg-white p-6 border-b">
        <div className="flex items-center justify-between">
          <input
            type="text"
            value={spreadsheet.title}
            onChange={(e) => {
              const updatedSpreadsheets = [...spreadsheets];
              updatedSpreadsheets[selectedSpreadsheetIndex] = {
                ...spreadsheet,
                title: e.target.value,
              };
              setSpreadsheets(updatedSpreadsheets);
            }}
            className="text-xl font-semibold bg-transparent border-none outline-none focus:border-b-2 transition-colors"
            style={{ borderColor: "var(--brand-primary)" }}
          />
          <div className="text-sm text-gray-500">
            {spreadsheet.rows.length} rows × {spreadsheet.rows[0]?.length || 0} columns
          </div>
        </div>
      </div>

      <div className="flex-1 p-6 overflow-auto">
        <div className="inline-flex">
          <div className="flex flex-col">
            <div className="flex">
              <div className="inline-block">
                <Spreadsheet
                  data={spreadsheet.rows}
                  onChange={(data) => {
                    setSpreadsheet({ ...spreadsheet, rows: data as any });
                  }}
                />
              </div>
              <button
                onClick={addColumn}
                className="ml-2 px-2 text-gray-500 hover:text-gray-700 rounded transition-colors flex items-center justify-center add-column-btn"
                style={{ 
                  width: "36px",
                  alignSelf: "stretch",
                  minHeight: "100%"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "var(--brand-primary-light)";
                  e.currentTarget.style.color = "var(--brand-primary)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "#6b7280";
                }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </button>
            </div>
            <button
              onClick={addRow}
              className="w-full py-2 mt-2 text-gray-500 hover:text-gray-700 rounded transition-colors flex items-center justify-center"
              style={{ height: "36px" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "var(--brand-primary-light)";
                e.currentTarget.style.color = "var(--brand-primary)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "#6b7280";
              }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Spreadsheet tabs at bottom */}
      <div className="bg-white border-t shadow-lg">
        <div className="flex items-center gap-2 p-3 overflow-x-auto">
          {spreadsheets.map((sheet, index) => (
            <button
              key={index}
              onClick={() => setSelectedSpreadsheetIndex(index)}
              className={`px-4 py-2 rounded-lg transition-colors whitespace-nowrap font-medium ${
                selectedSpreadsheetIndex === index
                  ? "text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              style={
                selectedSpreadsheetIndex === index
                  ? { backgroundColor: "var(--brand-tertiary)" }
                  : {}
              }
            >
              {sheet.title}
            </button>
          ))}
          <button
            onClick={() => {
              const newSpreadsheet: SpreadsheetData = {
                title: `New Roster ${spreadsheets.length + 1}`,
                rows: [
                  Array(12).fill(null).map(() => ({ value: "" }))
                ],
              };
              setSpreadsheets([...spreadsheets, newSpreadsheet]);
              setSelectedSpreadsheetIndex(spreadsheets.length);
            }}
            className="px-3 py-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}