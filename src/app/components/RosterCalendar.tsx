"use client";
import React, { useRef, useEffect, useCallback } from "react";
import Calendar from "@toast-ui/react-calendar";
import { EventObject, Options } from "@toast-ui/calendar";
import { RosterAgentState } from "../types/roster";
import { useCopilotAction, useCopilotReadable } from "@copilotkit/react-core";

interface RosterCalendarProps {
  rosterState: RosterAgentState;
  onStateChange: (state: RosterAgentState) => void;
}

export default function RosterCalendar({ rosterState, onStateChange }: RosterCalendarProps) {
  const calendarRef = useRef<typeof Calendar>(null);

  // Convert shifts to calendar events
  const events: Partial<EventObject>[] = rosterState.shifts.map(shift => {
    const staff = rosterState.staff.find(s => s.id === shift.staffId);
    return {
      id: shift.id,
      calendarId: shift.staffId,
      title: shift.title,
      category: "time",
      start: shift.start,
      end: shift.end,
      backgroundColor: staff?.color || "#000",
      borderColor: staff?.color || "#000",
    };
  });

  // Calendar configuration
  const calendars: Options["calendars"] = rosterState.staff.map(staff => ({
    id: staff.id,
    name: staff.name,
    backgroundColor: staff.color,
    borderColor: staff.color,
    dragBackgroundColor: staff.color,
  }));

  // Make roster data readable by AI
  useCopilotReadable({
    description: "Current roster data",
    value: {
      staff: rosterState.staff,
      shifts: rosterState.shifts.map(shift => ({
        ...shift,
        staffName: rosterState.staff.find(s => s.id === shift.staffId)?.name,
      })),
      currentView: rosterState.viewMode,
    },
  });

  // AI Action: Create new shift
  useCopilotAction({
    name: "createShift",
    description: "Create a new shift for a staff member",
    parameters: [
      {
        name: "staffId",
        type: "string",
        description: "ID of the staff member",
        required: true,
      },
      {
        name: "date",
        type: "string",
        description: "Date of the shift (YYYY-MM-DD)",
        required: true,
      },
      {
        name: "startTime",
        type: "string",
        description: "Start time (HH:MM)",
        required: true,
      },
      {
        name: "endTime",
        type: "string",
        description: "End time (HH:MM)",
        required: true,
      },
      {
        name: "shiftType",
        type: "string",
        description: "Type of shift: Morning, Afternoon, Night, or On-Call",
        required: true,
      },
    ],
    handler: ({ staffId, date, startTime, endTime, shiftType }) => {
      const staff = rosterState.staff.find(s => s.id === staffId);
      if (!staff) return;

      const [startHour, startMin] = startTime.split(":").map(Number);
      const [endHour, endMin] = endTime.split(":").map(Number);
      
      const start = new Date(date);
      start.setHours(startHour, startMin, 0, 0);
      
      const end = new Date(date);
      end.setHours(endHour, endMin, 0, 0);
      
      if (endHour < startHour) {
        end.setDate(end.getDate() + 1);
      }

      const newShift = {
        id: `shift-${Date.now()}`,
        staffId,
        title: `${staff.name} - ${shiftType}`,
        start,
        end,
        type: shiftType as any,
        department: staff.department,
      };

      onStateChange({
        ...rosterState,
        shifts: [...rosterState.shifts, newShift],
      });
    },
  });

  // AI Action: Remove shift
  useCopilotAction({
    name: "removeShift",
    description: "Remove a shift from the roster",
    parameters: [
      {
        name: "shiftId",
        type: "string",
        description: "ID of the shift to remove",
        required: true,
      },
    ],
    handler: ({ shiftId }) => {
      onStateChange({
        ...rosterState,
        shifts: rosterState.shifts.filter(s => s.id !== shiftId),
      });
    },
  });

  // AI Action: Add staff member
  useCopilotAction({
    name: "addStaffMember",
    description: "Add a new staff member to the roster system",
    parameters: [
      {
        name: "name",
        type: "string",
        description: "Full name of the staff member",
        required: true,
      },
      {
        name: "role",
        type: "string",
        description: "Role of the staff member: Doctor, Nurse, or Technician",
        required: true,
      },
      {
        name: "department",
        type: "string",
        description: "Department where the staff member works",
        required: true,
      },
      {
        name: "color",
        type: "string",
        description: "Color code for the staff member (e.g., #FF5733)",
        required: true,
      },
    ],
    handler: ({ name, role, department, color }) => {
      const newStaff = {
        id: `staff-${Date.now()}`,
        name,
        role: role as "Doctor" | "Nurse" | "Technician",
        department,
        color,
      };

      onStateChange({
        ...rosterState,
        staff: [...rosterState.staff, newStaff],
      });
    },
  });

  // AI Action: Remove staff member
  useCopilotAction({
    name: "removeStaffMember",
    description: "Remove a staff member from the roster system",
    parameters: [
      {
        name: "staffId",
        type: "string",
        description: "ID of the staff member to remove",
        required: true,
      },
    ],
    handler: ({ staffId }) => {
      onStateChange({
        ...rosterState,
        staff: rosterState.staff.filter(s => s.id !== staffId),
        // Also remove all shifts for this staff member
        shifts: rosterState.shifts.filter(shift => shift.staffId !== staffId),
      });
    },
  });

  // Handle calendar events
  const onBeforeCreateEvent = useCallback((eventData: any) => {
    const event = {
      id: String(Date.now()),
      calendarId: eventData.calendarId || rosterState.staff[0].id,
      title: eventData.title,
      category: "time",
      start: eventData.start,
      end: eventData.end,
    };

    // Create shift from calendar interaction
    const staff = rosterState.staff.find(s => s.id === event.calendarId);
    if (staff) {
      const newShift = {
        id: event.id,
        staffId: event.calendarId,
        title: `${staff.name} - Custom Shift`,
        start: event.start,
        end: event.end,
        type: "Morning" as const,
        department: staff.department,
      };
      
      onStateChange({
        ...rosterState,
        shifts: [...rosterState.shifts, newShift],
      });
    }
  }, [rosterState, onStateChange]);

  const onBeforeDeleteEvent = useCallback((res: any) => {
    const { id } = res;
    onStateChange({
      ...rosterState,
      shifts: rosterState.shifts.filter(s => s.id !== id),
    });
  }, [rosterState, onStateChange]);

  return (
    <div className="h-full">
      <Calendar
        ref={calendarRef}
        height="600px"
        view={rosterState.viewMode}
        month={{
          startDayOfWeek: 1,
        }}
        week={{
          startDayOfWeek: 1,
          dayNames: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        }}
        calendars={calendars}
        events={events}
        useFormPopup={true}
        useDetailPopup={true}
        onBeforeCreateEvent={onBeforeCreateEvent}
        onBeforeDeleteEvent={onBeforeDeleteEvent}
      />
    </div>
  );
}