import { RosterAgentState, Staff, Shift } from "../types/roster";

export const mockStaff: Staff[] = [
  // Emergency Department
  { id: "1", name: "Dr. Sarah Johnson", role: "Doctor", department: "Emergency", color: "#FF6B6B" },
  { id: "2", name: "Dr. Michael Chen", role: "Doctor", department: "Emergency", color: "#4ECDC4" },
  { id: "3", name: "Dr. Robert Martinez", role: "Doctor", department: "Emergency", color: "#F97F51" },
  { id: "4", name: "Nurse Emily Davis", role: "Nurse", department: "Emergency", color: "#45B7D1" },
  { id: "5", name: "Nurse James Wilson", role: "Nurse", department: "Emergency", color: "#96CEB4" },
  { id: "6", name: "Nurse Patricia Brown", role: "Nurse", department: "Emergency", color: "#DFE4EA" },
  { id: "7", name: "Nurse David Kim", role: "Nurse", department: "Emergency", color: "#A29BFE" },
  { id: "8", name: "Tech Alex Brown", role: "Technician", department: "Emergency", color: "#FECA57" },
  { id: "9", name: "Tech Maria Garcia", role: "Technician", department: "Emergency", color: "#48DBFB" },
  
  // ICU Department
  { id: "10", name: "Dr. Jennifer Lee", role: "Doctor", department: "ICU", color: "#E77F67" },
  { id: "11", name: "Dr. William Taylor", role: "Doctor", department: "ICU", color: "#786FA6" },
  { id: "12", name: "Dr. Lisa Anderson", role: "Doctor", department: "ICU", color: "#CF6A87" },
  { id: "13", name: "Nurse Thomas Moore", role: "Nurse", department: "ICU", color: "#546DE5" },
  { id: "14", name: "Nurse Susan Clark", role: "Nurse", department: "ICU", color: "#574B90" },
  { id: "15", name: "Nurse Kevin White", role: "Nurse", department: "ICU", color: "#F8B500" },
  { id: "16", name: "Nurse Angela Martinez", role: "Nurse", department: "ICU", color: "#3C6382" },
  { id: "17", name: "Tech Joseph Hall", role: "Technician", department: "ICU", color: "#40407A" },
  
  // Surgery Department
  { id: "18", name: "Dr. Richard Thompson", role: "Doctor", department: "Surgery", color: "#B33771" },
  { id: "19", name: "Dr. Catherine Adams", role: "Doctor", department: "Surgery", color: "#6D214F" },
  { id: "20", name: "Dr. Daniel Wright", role: "Doctor", department: "Surgery", color: "#CD6133" },
  { id: "21", name: "Nurse Barbara Lopez", role: "Nurse", department: "Surgery", color: "#84817A" },
  { id: "22", name: "Nurse Christopher Lee", role: "Nurse", department: "Surgery", color: "#CC8E35" },
  { id: "23", name: "Nurse Michelle Young", role: "Nurse", department: "Surgery", color: "#F97F51" },
  { id: "24", name: "Tech Steven Harris", role: "Technician", department: "Surgery", color: "#33D9B2" },
  { id: "25", name: "Tech Nancy Walker", role: "Technician", department: "Surgery", color: "#34ACE0" },
  
  // Pediatrics Department
  { id: "26", name: "Dr. Amanda Robinson", role: "Doctor", department: "Pediatrics", color: "#706FD3" },
  { id: "27", name: "Dr. Matthew Clark", role: "Doctor", department: "Pediatrics", color: "#40407A" },
  { id: "28", name: "Nurse Jessica King", role: "Nurse", department: "Pediatrics", color: "#FFB8B8" },
  { id: "29", name: "Nurse Brian Scott", role: "Nurse", department: "Pediatrics", color: "#FF5252" },
  { id: "30", name: "Nurse Laura Green", role: "Nurse", department: "Pediatrics", color: "#FF793F" },
  { id: "31", name: "Tech Karen Hill", role: "Technician", department: "Pediatrics", color: "#D1CEFE" },
  
  // Cardiology Department
  { id: "32", name: "Dr. Charles Baker", role: "Doctor", department: "Cardiology", color: "#227093" },
  { id: "33", name: "Dr. Helen Nelson", role: "Doctor", department: "Cardiology", color: "#218C74" },
  { id: "34", name: "Nurse Ronald Carter", role: "Nurse", department: "Cardiology", color: "#B33939" },
  { id: "35", name: "Nurse Dorothy Mitchell", role: "Nurse", department: "Cardiology", color: "#CD6133" },
  { id: "36", name: "Tech Frank Perez", role: "Technician", department: "Cardiology", color: "#84817A" },
];

// Helper function to generate dates for the current week
const getWeekDates = () => {
  const today = new Date();
  const currentDay = today.getDay();
  const monday = new Date(today);
  monday.setDate(today.getDate() - currentDay + 1);
  
  const dates = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(monday);
    date.setDate(monday.getDate() + i);
    dates.push(date);
  }
  return dates;
};

const weekDates = getWeekDates();

// Helper function to create a shift
const createShift = (id: string, staffId: string, staffName: string, date: Date, startHour: number, endHour: number, type: "Morning" | "Afternoon" | "Night" | "On-Call" | "Training" | "Meeting" | "Conference", department: string): Shift => {
  const start = new Date(date);
  start.setHours(startHour, 0, 0, 0);
  const end = new Date(date);
  if (endHour < startHour) {
    // Night shift that ends next day
    end.setDate(end.getDate() + 1);
  }
  end.setHours(endHour, 0, 0, 0);
  
  return {
    id,
    staffId,
    title: `${staffName} - ${type}`,
    start,
    end,
    type,
    department,
  };
};

export const mockShifts: Shift[] = [
  // Monday - Emergency Department
  createShift("shift1", "1", "Dr. Sarah Johnson", weekDates[0], 7, 15, "Morning", "Emergency"),
  createShift("shift2", "2", "Dr. Michael Chen", weekDates[0], 15, 23, "Afternoon", "Emergency"),
  createShift("shift3", "4", "Nurse Emily Davis", weekDates[0], 7, 15, "Morning", "Emergency"),
  createShift("shift4", "5", "Nurse James Wilson", weekDates[0], 15, 23, "Afternoon", "Emergency"),
  createShift("shift5", "6", "Nurse Patricia Brown", weekDates[0], 23, 7, "Night", "Emergency"),
  createShift("shift6", "8", "Tech Alex Brown", weekDates[0], 7, 15, "Morning", "Emergency"),
  
  // Tuesday - Emergency Department
  createShift("shift7", "1", "Dr. Sarah Johnson", weekDates[1], 7, 15, "Morning", "Emergency"),
  createShift("shift8", "3", "Dr. Robert Martinez", weekDates[1], 15, 23, "Afternoon", "Emergency"),
  createShift("shift9", "4", "Nurse Emily Davis", weekDates[1], 7, 15, "Morning", "Emergency"),
  createShift("shift10", "7", "Nurse David Kim", weekDates[1], 15, 23, "Afternoon", "Emergency"),
  createShift("shift11", "6", "Nurse Patricia Brown", weekDates[1], 23, 7, "Night", "Emergency"),
  createShift("shift12", "9", "Tech Maria Garcia", weekDates[1], 15, 23, "Afternoon", "Emergency"),
  
  // Wednesday - Emergency Department
  createShift("shift13", "2", "Dr. Michael Chen", weekDates[2], 7, 15, "Morning", "Emergency"),
  createShift("shift14", "3", "Dr. Robert Martinez", weekDates[2], 15, 23, "Afternoon", "Emergency"),
  createShift("shift15", "5", "Nurse James Wilson", weekDates[2], 7, 15, "Morning", "Emergency"),
  createShift("shift16", "7", "Nurse David Kim", weekDates[2], 15, 23, "Afternoon", "Emergency"),
  createShift("shift17", "4", "Nurse Emily Davis", weekDates[2], 23, 7, "Night", "Emergency"),
  createShift("shift18", "8", "Tech Alex Brown", weekDates[2], 15, 23, "Afternoon", "Emergency"),
  
  // Monday - ICU Department
  createShift("shift19", "10", "Dr. Jennifer Lee", weekDates[0], 7, 15, "Morning", "ICU"),
  createShift("shift20", "11", "Dr. William Taylor", weekDates[0], 15, 23, "Afternoon", "ICU"),
  createShift("shift21", "13", "Nurse Thomas Moore", weekDates[0], 7, 15, "Morning", "ICU"),
  createShift("shift22", "14", "Nurse Susan Clark", weekDates[0], 7, 15, "Morning", "ICU"),
  createShift("shift23", "15", "Nurse Kevin White", weekDates[0], 15, 23, "Afternoon", "ICU"),
  createShift("shift24", "16", "Nurse Angela Martinez", weekDates[0], 23, 7, "Night", "ICU"),
  
  // Tuesday - ICU Department
  createShift("shift25", "10", "Dr. Jennifer Lee", weekDates[1], 7, 15, "Morning", "ICU"),
  createShift("shift26", "12", "Dr. Lisa Anderson", weekDates[1], 15, 23, "Afternoon", "ICU"),
  createShift("shift27", "13", "Nurse Thomas Moore", weekDates[1], 7, 15, "Morning", "ICU"),
  createShift("shift28", "15", "Nurse Kevin White", weekDates[1], 15, 23, "Afternoon", "ICU"),
  createShift("shift29", "16", "Nurse Angela Martinez", weekDates[1], 23, 7, "Night", "ICU"),
  createShift("shift30", "17", "Tech Joseph Hall", weekDates[1], 7, 15, "Morning", "ICU"),
  
  // Monday - Surgery Department
  createShift("shift31", "18", "Dr. Richard Thompson", weekDates[0], 7, 15, "Morning", "Surgery"),
  createShift("shift32", "19", "Dr. Catherine Adams", weekDates[0], 7, 15, "Morning", "Surgery"),
  createShift("shift33", "21", "Nurse Barbara Lopez", weekDates[0], 7, 15, "Morning", "Surgery"),
  createShift("shift34", "22", "Nurse Christopher Lee", weekDates[0], 7, 15, "Morning", "Surgery"),
  createShift("shift35", "24", "Tech Steven Harris", weekDates[0], 7, 15, "Morning", "Surgery"),
  
  // Tuesday - Surgery Department
  createShift("shift36", "18", "Dr. Richard Thompson", weekDates[1], 7, 15, "Morning", "Surgery"),
  createShift("shift37", "20", "Dr. Daniel Wright", weekDates[1], 7, 15, "Morning", "Surgery"),
  createShift("shift38", "21", "Nurse Barbara Lopez", weekDates[1], 7, 15, "Morning", "Surgery"),
  createShift("shift39", "23", "Nurse Michelle Young", weekDates[1], 7, 15, "Morning", "Surgery"),
  createShift("shift40", "25", "Tech Nancy Walker", weekDates[1], 7, 15, "Morning", "Surgery"),
  
  // Monday - Pediatrics Department
  createShift("shift41", "26", "Dr. Amanda Robinson", weekDates[0], 7, 15, "Morning", "Pediatrics"),
  createShift("shift42", "27", "Dr. Matthew Clark", weekDates[0], 15, 23, "Afternoon", "Pediatrics"),
  createShift("shift43", "28", "Nurse Jessica King", weekDates[0], 7, 15, "Morning", "Pediatrics"),
  createShift("shift44", "29", "Nurse Brian Scott", weekDates[0], 15, 23, "Afternoon", "Pediatrics"),
  createShift("shift45", "30", "Nurse Laura Green", weekDates[0], 23, 7, "Night", "Pediatrics"),
  
  // Tuesday - Pediatrics Department
  createShift("shift46", "26", "Dr. Amanda Robinson", weekDates[1], 7, 15, "Morning", "Pediatrics"),
  createShift("shift47", "27", "Dr. Matthew Clark", weekDates[1], 15, 23, "Afternoon", "Pediatrics"),
  createShift("shift48", "28", "Nurse Jessica King", weekDates[1], 7, 15, "Morning", "Pediatrics"),
  createShift("shift49", "30", "Nurse Laura Green", weekDates[1], 15, 23, "Afternoon", "Pediatrics"),
  createShift("shift50", "31", "Tech Karen Hill", weekDates[1], 7, 15, "Morning", "Pediatrics"),
  
  // Monday - Cardiology Department
  createShift("shift51", "32", "Dr. Charles Baker", weekDates[0], 7, 15, "Morning", "Cardiology"),
  createShift("shift52", "33", "Dr. Helen Nelson", weekDates[0], 15, 23, "Afternoon", "Cardiology"),
  createShift("shift53", "34", "Nurse Ronald Carter", weekDates[0], 7, 15, "Morning", "Cardiology"),
  createShift("shift54", "35", "Nurse Dorothy Mitchell", weekDates[0], 15, 23, "Afternoon", "Cardiology"),
  createShift("shift55", "36", "Tech Frank Perez", weekDates[0], 7, 15, "Morning", "Cardiology"),
  
  // Weekend shifts - Emergency (Critical department, needs 24/7 coverage)
  createShift("shift56", "1", "Dr. Sarah Johnson", weekDates[5], 7, 15, "Morning", "Emergency"),
  createShift("shift57", "2", "Dr. Michael Chen", weekDates[5], 15, 23, "Afternoon", "Emergency"),
  createShift("shift58", "4", "Nurse Emily Davis", weekDates[5], 23, 7, "Night", "Emergency"),
  createShift("shift59", "5", "Nurse James Wilson", weekDates[6], 7, 15, "Morning", "Emergency"),
  createShift("shift60", "7", "Nurse David Kim", weekDates[6], 15, 23, "Afternoon", "Emergency"),
  
  // Weekend shifts - ICU (Critical department, needs 24/7 coverage)
  createShift("shift61", "10", "Dr. Jennifer Lee", weekDates[5], 7, 15, "Morning", "ICU"),
  createShift("shift62", "11", "Dr. William Taylor", weekDates[5], 15, 23, "Afternoon", "ICU"),
  createShift("shift63", "13", "Nurse Thomas Moore", weekDates[5], 23, 7, "Night", "ICU"),
  createShift("shift64", "14", "Nurse Susan Clark", weekDates[6], 7, 15, "Morning", "ICU"),
  createShift("shift65", "15", "Nurse Kevin White", weekDates[6], 15, 23, "Afternoon", "ICU"),
  
  // Special shifts - On-call duties
  createShift("shift66", "18", "Dr. Richard Thompson", weekDates[3], 17, 7, "On-Call", "Surgery"),
  createShift("shift67", "19", "Dr. Catherine Adams", weekDates[4], 17, 7, "On-Call", "Surgery"),
  createShift("shift68", "32", "Dr. Charles Baker", weekDates[3], 17, 7, "On-Call", "Cardiology"),
  
  // Additional weekday shifts to fill out the schedule
  createShift("shift69", "1", "Dr. Sarah Johnson", weekDates[3], 7, 15, "Morning", "Emergency"),
  createShift("shift70", "2", "Dr. Michael Chen", weekDates[3], 15, 23, "Afternoon", "Emergency"),
  createShift("shift71", "3", "Dr. Robert Martinez", weekDates[4], 7, 15, "Morning", "Emergency"),
  createShift("shift72", "1", "Dr. Sarah Johnson", weekDates[4], 15, 23, "Afternoon", "Emergency"),
  
  // Training and meeting events
  createShift("shift73", "10", "Dr. Jennifer Lee", weekDates[2], 14, 16, "Training", "ICU"),
  createShift("shift74", "26", "Dr. Amanda Robinson", weekDates[3], 13, 15, "Meeting", "Pediatrics"),
  createShift("shift75", "18", "Dr. Richard Thompson", weekDates[2], 14, 16, "Conference", "Surgery"),
];

export const initialRosterState: RosterAgentState = {
  staff: mockStaff,
  shifts: mockShifts,
  selectedDate: new Date(),
  viewMode: "week",
};