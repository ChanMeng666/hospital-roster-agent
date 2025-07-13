import { RosterAgentState, Staff, Shift } from "../types/roster";

export const mockStaff: Staff[] = [
  { id: "1", name: "Dr. Sarah Johnson", role: "Doctor", department: "Emergency", color: "#FF6B6B" },
  { id: "2", name: "Dr. Michael Chen", role: "Doctor", department: "Emergency", color: "#4ECDC4" },
  { id: "3", name: "Nurse Emily Davis", role: "Nurse", department: "Emergency", color: "#45B7D1" },
  { id: "4", name: "Nurse James Wilson", role: "Nurse", department: "Emergency", color: "#96CEB4" },
  { id: "5", name: "Tech Alex Brown", role: "Technician", department: "Emergency", color: "#FECA57" },
];

const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);

export const mockShifts: Shift[] = [
  {
    id: "shift1",
    staffId: "1",
    title: "Dr. Sarah Johnson - Morning",
    start: new Date(today.setHours(7, 0, 0, 0)),
    end: new Date(today.setHours(15, 0, 0, 0)),
    type: "Morning",
    department: "Emergency",
  },
  {
    id: "shift2",
    staffId: "2",
    title: "Dr. Michael Chen - Afternoon",
    start: new Date(today.setHours(15, 0, 0, 0)),
    end: new Date(today.setHours(23, 0, 0, 0)),
    type: "Afternoon",
    department: "Emergency",
  },
  {
    id: "shift3",
    staffId: "3",
    title: "Nurse Emily Davis - Night",
    start: new Date(today.setHours(23, 0, 0, 0)),
    end: new Date(tomorrow.setHours(7, 0, 0, 0)),
    type: "Night",
    department: "Emergency",
  },
  {
    id: "shift4",
    staffId: "4",
    title: "Nurse James Wilson - Morning",
    start: new Date(today.setHours(7, 0, 0, 0)),
    end: new Date(today.setHours(15, 0, 0, 0)),
    type: "Morning",
    department: "Emergency",
  },
];

export const initialRosterState: RosterAgentState = {
  staff: mockStaff,
  shifts: mockShifts,
  selectedDate: new Date(),
  viewMode: "week",
};