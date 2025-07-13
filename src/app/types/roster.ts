export interface Staff {
  id: string;
  name: string;
  role: "Doctor" | "Nurse" | "Technician";
  department: string;
  color: string;
}

export interface Shift {
  id: string;
  staffId: string;
  title: string;
  start: Date;
  end: Date;
  type: "Morning" | "Afternoon" | "Night" | "On-Call";
  department: string;
}

export interface RosterAgentState {
  staff: Staff[];
  shifts: Shift[];
  selectedDate: Date;
  viewMode: "month" | "week" | "day";
}