"use client";

import React, { useState } from "react";
import Spreadsheet from "react-spreadsheet";
import { SpreadsheetRow } from "../types/spreadsheet";

interface PreviewSpreadsheetChangesProps {
  preCommitTitle: string;
  postCommitTitle: string;
  newRows: SpreadsheetRow[];
  oldRows?: SpreadsheetRow[];
  commit: (rows: SpreadsheetRow[]) => void;
}

export function PreviewSpreadsheetChanges({
  preCommitTitle,
  postCommitTitle,
  newRows,
  oldRows,
  commit,
}: PreviewSpreadsheetChangesProps) {
  const [rows, setRows] = useState(newRows);
  const [isCommitted, setIsCommitted] = useState(false);

  const handleCommit = () => {
    commit(rows);
    setIsCommitted(true);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 max-w-4xl">
      <h3 className="text-lg font-semibold mb-3">
        {isCommitted ? postCommitTitle : preCommitTitle}
      </h3>
      
      {!isCommitted && (
        <>
          <div className="mb-4 text-sm text-gray-600">
            Review and edit the changes below before confirming:
          </div>
          
          <div className="border rounded-lg overflow-auto max-h-96 mb-4">
            <Spreadsheet
              data={rows}
              onChange={(data) => setRows(data as SpreadsheetRow[])}
            />
          </div>

          {oldRows && (
            <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                ⚠️ This will replace the existing spreadsheet data
              </p>
            </div>
          )}

          <div className="flex gap-2">
            <button
              onClick={handleCommit}
              className="px-4 py-2 rounded-lg font-medium transition-colors"
              style={{
                backgroundColor: "var(--brand-primary)",
                color: "#000",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--brand-primary-hover)")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "var(--brand-primary)")}
            >
              Confirm Changes
            </button>
            <button
              onClick={() => setRows(newRows)}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium transition-colors"
            >
              Reset
            </button>
          </div>
        </>
      )}

      {isCommitted && (
        <div className="flex items-center gap-2 text-green-600">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span>Changes successfully applied!</span>
        </div>
      )}
    </div>
  );
}