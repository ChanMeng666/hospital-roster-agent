import React from "react";

interface CalendarToolbarProps {
  currentDate: Date;
  viewMode: "month" | "week" | "day";
  onViewModeChange: (mode: "month" | "week" | "day") => void;
  onNavigate: (direction: "today" | "prev" | "next") => void;
  dateRangeText: string;
}

export default function CalendarToolbar({
  currentDate,
  viewMode,
  onViewModeChange,
  onNavigate,
  dateRangeText,
}: CalendarToolbarProps) {
  const viewModes = [
    { value: "month", label: "Month" },
    { value: "week", label: "Week" },
    { value: "day", label: "Day" },
  ];

  return (
    <div className="flex items-center justify-between p-6 bg-white border-b">
      <div className="flex items-center gap-4">
        {/* View Mode Selector */}
        <div className="flex bg-gray-100 rounded-lg p-1">
          {viewModes.map((mode) => (
            <button
              key={mode.value}
              onClick={() => onViewModeChange(mode.value as any)}
              className={`px-4 py-2 rounded-md transition-colors ${
                viewMode === mode.value
                  ? "bg-blue-500 text-white"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
            >
              {mode.label}
            </button>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate("today")}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md transition-colors"
          >
            Today
          </button>
          <button
            onClick={() => onNavigate("prev")}
            className="p-2 bg-gray-200 hover:bg-gray-300 rounded-md transition-colors"
            aria-label="Previous"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => onNavigate("next")}
            className="p-2 bg-gray-200 hover:bg-gray-300 rounded-md transition-colors"
            aria-label="Next"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Date Range Display */}
      <div className="text-lg font-semibold text-gray-700">
        {dateRangeText}
      </div>
    </div>
  );
}