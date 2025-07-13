export interface Cell {
  value: string;
}

export type SpreadsheetRow = Cell[];

export interface SpreadsheetData {
  title: string;
  rows: SpreadsheetRow[];
}

export interface HospitalRosterData {
  staffId: string;
  staffName: string;
  role: string;
  department: string;
  mondayShift: string;
  tuesdayShift: string;
  wednesdayShift: string;
  thursdayShift: string;
  fridayShift: string;
  saturdayShift: string;
  sundayShift: string;
  totalHours: number;
}