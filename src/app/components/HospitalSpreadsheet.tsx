"use client";

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
  const [hoveredRow, setHoveredRow] = React.useState<number | null>(null);
  const [hoveredColumn, setHoveredColumn] = React.useState<number | null>(null);
  const [contextMenu, setContextMenu] = React.useState<{
    show: boolean;
    x: number;
    y: number;
    type: 'row' | 'column';
    index: number;
  } | null>(null);

  // Function to export spreadsheet data
  const exportSpreadsheet = () => {
    if (typeof window === 'undefined') return;
    
    const dataStr = JSON.stringify(spreadsheet, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `${spreadsheet.title.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };
  
  // Function to import spreadsheet data
  const importSpreadsheet = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        if (data.title && data.rows) {
          const newSpreadsheet: SpreadsheetData = {
            title: data.title,
            rows: data.rows,
          };
          setSpreadsheets([...spreadsheets, newSpreadsheet]);
          setSelectedSpreadsheetIndex(spreadsheets.length);
        }
      } catch (error) {
        console.error('Error importing spreadsheet:', error);
        alert('Error importing spreadsheet. Please check the file format.');
      }
    };
    reader.readAsText(file);
    
    // Reset input
    event.target.value = '';
  };
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
      const newRows = rows ? rows.map((row: any) => 
        row.cells ? row.cells : row.map((cell: any) => ({ value: cell.value || "" }))
      ) : [];

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
      const newRows = rows ? rows.map((row: any) => 
        row.cells ? row.cells : row.map((cell: any) => ({ value: cell.value || "" }))
      ) : [];

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

  // Function to delete a row
  const deleteRow = (rowIndex: number) => {
    if (spreadsheet.rows.length > 1) {
      const updatedRows = [...spreadsheet.rows];
      updatedRows.splice(rowIndex, 1);
      setSpreadsheet({
        ...spreadsheet,
        rows: updatedRows,
      });
    }
  };

  // Function to delete a column
  const deleteColumn = (columnIndex: number) => {
    if (spreadsheet.rows[0]?.length > 1) {
      const updatedRows = spreadsheet.rows.map(row => {
        const newRow = [...row];
        newRow.splice(columnIndex, 1);
        return newRow;
      });
      setSpreadsheet({
        ...spreadsheet,
        rows: updatedRows,
      });
    }
  };

  // AI Action: Add empty row
  useCopilotAction({
    name: "addEmptyRow",
    description: "Add an empty row to the current spreadsheet",
    parameters: [
      {
        name: "position",
        type: "string",
        description: "Where to add the row: 'end' (default) or specific row number",
        required: false,
      },
    ],
    handler: ({ position }) => {
      const numberOfColumns = spreadsheet.rows[0]?.length || 12;
      const newRow: SpreadsheetRow = [];
      for (let i = 0; i < numberOfColumns; i++) {
        newRow.push({ value: "" });
      }
      
      if (position && position !== "end" && !isNaN(parseInt(position))) {
        const index = parseInt(position);
        const updatedRows = [...spreadsheet.rows];
        updatedRows.splice(index, 0, newRow);
        setSpreadsheet({
          ...spreadsheet,
          rows: updatedRows,
        });
      } else {
        setSpreadsheet({
          ...spreadsheet,
          rows: [...spreadsheet.rows, newRow],
        });
      }
    },
  });

  // AI Action: Add empty column
  useCopilotAction({
    name: "addEmptyColumn",
    description: "Add an empty column to the current spreadsheet",
    parameters: [
      {
        name: "columnHeader",
        type: "string",
        description: "Optional header for the new column",
        required: false,
      },
    ],
    handler: ({ columnHeader }) => {
      const spreadsheetRows = [...spreadsheet.rows];
      for (let i = 0; i < spreadsheetRows.length; i++) {
        if (i === 0 && columnHeader) {
          spreadsheetRows[i].push({ value: columnHeader });
        } else {
          spreadsheetRows[i].push({ value: "" });
        }
      }
      setSpreadsheet({
        ...spreadsheet,
        rows: spreadsheetRows,
      });
    },
  });

  // AI Action: Delete row
  useCopilotAction({
    name: "deleteRow",
    description: "Delete a row from the current spreadsheet",
    parameters: [
      {
        name: "rowNumber",
        type: "number",
        description: "The row number to delete (1-based index)",
        required: true,
      },
    ],
    handler: ({ rowNumber }) => {
      if (rowNumber > 0 && rowNumber <= spreadsheet.rows.length) {
        const updatedRows = [...spreadsheet.rows];
        updatedRows.splice(rowNumber - 1, 1);
        setSpreadsheet({
          ...spreadsheet,
          rows: updatedRows,
        });
      }
    },
  });

  // AI Action: Delete column
  useCopilotAction({
    name: "deleteColumn",
    description: "Delete a column from the current spreadsheet",
    parameters: [
      {
        name: "columnNumber",
        type: "number",
        description: "The column number to delete (1-based index)",
        required: true,
      },
    ],
    handler: ({ columnNumber }) => {
      if (columnNumber > 0 && columnNumber <= (spreadsheet.rows[0]?.length || 0)) {
        const updatedRows = spreadsheet.rows.map(row => {
          const newRow = [...row];
          newRow.splice(columnNumber - 1, 1);
          return newRow;
        });
        setSpreadsheet({
          ...spreadsheet,
          rows: updatedRows,
        });
      }
    },
  });

  // AI Action: Switch spreadsheet
  useCopilotAction({
    name: "switchSpreadsheet",
    description: "Switch to a different spreadsheet",
    parameters: [
      {
        name: "spreadsheetName",
        type: "string",
        description: "The name of the spreadsheet to switch to",
        required: true,
      },
    ],
    handler: ({ spreadsheetName }) => {
      const index = spreadsheets.findIndex(s => 
        s.title.toLowerCase().includes(spreadsheetName.toLowerCase())
      );
      if (index !== -1) {
        setSelectedSpreadsheetIndex(index);
      }
    },
  });

  // AI Action: Rename spreadsheet
  useCopilotAction({
    name: "renameSpreadsheet",
    description: "Rename the current spreadsheet",
    parameters: [
      {
        name: "newTitle",
        type: "string",
        description: "The new title for the spreadsheet",
        required: true,
      },
    ],
    handler: ({ newTitle }) => {
      const updatedSpreadsheets = [...spreadsheets];
      updatedSpreadsheets[selectedSpreadsheetIndex] = {
        ...spreadsheet,
        title: newTitle,
      };
      setSpreadsheets(updatedSpreadsheets);
    },
  });

  // AI Action: Delete spreadsheet
  useCopilotAction({
    name: "deleteSpreadsheet",
    description: "Delete a spreadsheet",
    parameters: [
      {
        name: "spreadsheetName",
        type: "string",
        description: "The name of the spreadsheet to delete (or 'current' for current spreadsheet)",
        required: true,
      },
    ],
    handler: ({ spreadsheetName }) => {
      if (spreadsheets.length <= 1) {
        console.log("Cannot delete the last spreadsheet");
        return;
      }

      let indexToDelete = selectedSpreadsheetIndex;
      if (spreadsheetName !== "current") {
        indexToDelete = spreadsheets.findIndex(s => 
          s.title.toLowerCase().includes(spreadsheetName.toLowerCase())
        );
      }

      if (indexToDelete !== -1) {
        const updatedSpreadsheets = spreadsheets.filter((_, index) => index !== indexToDelete);
        setSpreadsheets(updatedSpreadsheets);
        
        // Adjust selected index if needed
        if (selectedSpreadsheetIndex >= updatedSpreadsheets.length) {
          setSelectedSpreadsheetIndex(updatedSpreadsheets.length - 1);
        }
      }
    },
  });

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
          <div className="flex items-center gap-4">
            <button
              onClick={exportSpreadsheet}
              className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded transition-colors"
              title="Export spreadsheet"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </button>
            <label className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded transition-colors cursor-pointer">
              <input
                type="file"
                accept=".json"
                onChange={importSpreadsheet}
                className="hidden"
              />
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
            </label>
            <div className="text-sm text-gray-500">
              {spreadsheet.rows.length} rows × {spreadsheet.rows[0]?.length || 0} columns
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 p-6 overflow-auto">
        <div className="inline-flex">
          <div className="flex flex-col">
            <div className="flex">
              <div className="inline-block relative">
                <div 
                  onContextMenu={(e) => {
                    e.preventDefault();
                    setContextMenu(null);
                  }}
                  onClick={() => setContextMenu(null)}
                >
                  <Spreadsheet
                    data={spreadsheet.rows}
                    onChange={(data) => {
                      setSpreadsheet({ ...spreadsheet, rows: data as any });
                    }}
                  />
                </div>
                
                {/* Row numbers and hover delete buttons */}
                <div className="absolute" style={{ left: "-30px", top: "0" }}>
                  {spreadsheet.rows.map((_, index) => (
                    <div 
                      key={index} 
                      className="spreadsheet-row-area flex items-center justify-between px-1 rounded-sm transition-colors duration-150"
                      style={{ height: "33px", width: "28px" }}
                      onMouseEnter={() => setHoveredRow(index)}
                      onMouseLeave={() => setHoveredRow(null)}
                      onContextMenu={(e) => {
                        if (spreadsheet.rows.length > 1) {
                          e.preventDefault();
                          setContextMenu({
                            show: true,
                            x: e.clientX,
                            y: e.clientY,
                            type: 'row',
                            index
                          });
                        }
                      }}
                    >
                      <span className="spreadsheet-row-label">
                        {index + 1}
                      </span>
                      {hoveredRow === index && spreadsheet.rows.length > 1 && (
                        <button
                          onClick={() => deleteRow(index)}
                          className="delete-button-appear w-4 h-4 flex items-center justify-center text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-all duration-200"
                          title="Delete row"
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                
                {/* Column letters and hover delete buttons */}
                <div className="absolute flex" style={{ bottom: "-25px", left: "0" }}>
                  {spreadsheet.rows[0]?.map((_, index) => (
                    <div 
                      key={index} 
                      className="spreadsheet-column-area flex flex-col items-center justify-center py-1 rounded-sm transition-colors duration-150"
                      style={{ width: "80px", height: "24px" }}
                      onMouseEnter={() => setHoveredColumn(index)}
                      onMouseLeave={() => setHoveredColumn(null)}
                      onContextMenu={(e) => {
                        if (spreadsheet.rows[0].length > 1) {
                          e.preventDefault();
                          setContextMenu({
                            show: true,
                            x: e.clientX,
                            y: e.clientY,
                            type: 'column',
                            index
                          });
                        }
                      }}
                    >
                      <span className="spreadsheet-column-label">
                        {String.fromCharCode(65 + index)}
                      </span>
                      {hoveredColumn === index && spreadsheet.rows[0].length > 1 && (
                        <button
                          onClick={() => deleteColumn(index)}
                          className="delete-button-appear w-4 h-4 flex items-center justify-center text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-all duration-200"
                          title="Delete column"
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      )}
                    </div>
                  ))}
                </div>
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
              className="w-full py-2 mt-8 text-gray-500 hover:text-gray-700 rounded transition-colors flex items-center justify-center"
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

      {/* Context Menu */}
      {contextMenu && (
        <>
          <div 
            className="fixed inset-0 z-40"
            onClick={() => setContextMenu(null)}
          />
          <div 
            className="context-menu fixed z-50 bg-white border border-gray-200 rounded-lg shadow-lg py-2 min-w-32"
            style={{ 
              left: contextMenu.x, 
              top: contextMenu.y,
              transform: 'translate(-50%, -100%)'
            }}
          >
            <button
              onClick={() => {
                if (contextMenu.type === 'row') {
                  deleteRow(contextMenu.index);
                } else {
                  deleteColumn(contextMenu.index);
                }
                setContextMenu(null);
              }}
              className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Delete {contextMenu.type}
            </button>
            <button
              onClick={() => {
                if (contextMenu.type === 'row') {
                  addRow();
                } else {
                  addColumn();
                }
                setContextMenu(null);
              }}
              className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 flex items-center gap-2 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add {contextMenu.type}
            </button>
          </div>
        </>
      )}

      {/* Spreadsheet tabs at bottom */}
      <div className="bg-white border-t shadow-lg">
        <div className="flex items-center gap-2 p-3 overflow-x-auto">
          {spreadsheets.map((sheet, index) => (
            <div
              key={index}
              className={`flex items-center gap-1 px-4 py-2 rounded-lg transition-colors whitespace-nowrap font-medium ${
                selectedSpreadsheetIndex === index
                  ? "text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
              style={
                selectedSpreadsheetIndex === index
                  ? { backgroundColor: "var(--brand-tertiary)" }
                  : {}
              }
            >
              <button
                onClick={() => setSelectedSpreadsheetIndex(index)}
                className="flex-1"
              >
                {sheet.title}
              </button>
              {spreadsheets.length > 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (typeof window !== 'undefined' && window.confirm(`Are you sure you want to delete "${sheet.title}"?`)) {
                      const updatedSpreadsheets = spreadsheets.filter((_, i) => i !== index);
                      setSpreadsheets(updatedSpreadsheets);
                      
                      // Adjust selected index if needed
                      if (selectedSpreadsheetIndex >= updatedSpreadsheets.length) {
                        setSelectedSpreadsheetIndex(updatedSpreadsheets.length - 1);
                      } else if (selectedSpreadsheetIndex > index) {
                        setSelectedSpreadsheetIndex(selectedSpreadsheetIndex - 1);
                      }
                    }
                  }}
                  className={`ml-2 p-1 rounded hover:bg-opacity-20 transition-colors ${
                    selectedSpreadsheetIndex === index
                      ? "text-white hover:bg-white"
                      : "text-red-500 hover:bg-red-500 hover:text-white"
                  }`}
                  title="Delete spreadsheet"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
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