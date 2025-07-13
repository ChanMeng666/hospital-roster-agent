import Link from "next/link";
import React from "react";

interface NavigationProps {
  currentPage: "calendar" | "spreadsheet";
}

export default function Navigation({ currentPage }: NavigationProps) {
  return (
    <nav className="bg-white border-b px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold text-gray-800">Hospital Roster System</h1>
          <span className="text-sm text-gray-500">
            {currentPage === "calendar" ? "Calendar View" : "Spreadsheet View"}
          </span>
        </div>
        
        <div className="flex gap-2">
          <Link
            href="/"
            className={`px-4 py-2 rounded-lg transition-colors font-medium ${
              currentPage === "calendar"
                ? "text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
            style={
              currentPage === "calendar"
                ? { backgroundColor: "var(--brand-tertiary)" }
                : {}
            }
          >
            Calendar View
          </Link>
          <Link
            href="/spreadsheet"
            className={`px-4 py-2 rounded-lg transition-colors font-medium ${
              currentPage === "spreadsheet"
                ? "text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
            style={
              currentPage === "spreadsheet"
                ? { backgroundColor: "var(--brand-tertiary)" }
                : {}
            }
          >
            Spreadsheet View
          </Link>
        </div>
      </div>
    </nav>
  );
}