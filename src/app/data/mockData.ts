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

// Helper function to generate dates for the current month
const getMonthDates = () => {
  const today = new Date();
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  
  const dates = [];
  for (let i = 0; i < 30; i++) {
    const date = new Date(startOfMonth);
    date.setDate(startOfMonth.getDate() + i);
    dates.push(date);
  }
  return dates;
};

const monthDates = getMonthDates();

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

// Generate shifts for a realistic monthly schedule
const generateMonthlyShifts = (): Shift[] => {
  const shifts: Shift[] = [];
  let shiftId = 1;

  // Emergency Department - 24/7 coverage
  // Pattern: 4 days on, 2 days off for most staff
  const emergencyStaff = [
    { id: "1", name: "Dr. Sarah Johnson", startDay: 0, pattern: [1,1,1,1,0,0] },
    { id: "2", name: "Dr. Michael Chen", startDay: 2, pattern: [0,1,1,1,1,0] },
    { id: "3", name: "Dr. Robert Martinez", startDay: 4, pattern: [1,0,0,1,1,1] },
    { id: "4", name: "Nurse Emily Davis", startDay: 0, pattern: [1,1,0,0,1,1] },
    { id: "5", name: "Nurse James Wilson", startDay: 1, pattern: [0,1,1,1,0,1] },
    { id: "6", name: "Nurse Patricia Brown", startDay: 3, pattern: [1,0,1,1,0,0] },
    { id: "7", name: "Nurse David Kim", startDay: 2, pattern: [1,1,0,1,1,0] },
    { id: "8", name: "Tech Alex Brown", startDay: 0, pattern: [1,0,1,0,1,0] },
    { id: "9", name: "Tech Maria Garcia", startDay: 1, pattern: [0,1,0,1,0,1] }
  ];

  // Generate Emergency shifts
  emergencyStaff.forEach(staff => {
    for (let day = 0; day < 30; day++) {
      const patternIndex = (day + staff.startDay) % staff.pattern.length;
      if (staff.pattern[patternIndex] === 1) {
        const dayOfWeek = monthDates[day].getDay();
        let shiftType: "Morning" | "Afternoon" | "Night" = "Morning";
        let startHour = 7;
        let endHour = 15;
        
        // Rotate shifts based on week
        const weekNumber = Math.floor(day / 7);
        if (staff.id <= "3") { // Doctors
          if (weekNumber % 3 === 0) {
            shiftType = "Morning";
            startHour = 7;
            endHour = 15;
          } else if (weekNumber % 3 === 1) {
            shiftType = "Afternoon";
            startHour = 15;
            endHour = 23;
          } else {
            shiftType = "Morning";
            startHour = 7;
            endHour = 15;
          }
        } else if (staff.id <= "7") { // Nurses
          if (weekNumber % 3 === 0) {
            shiftType = "Morning";
            startHour = 7;
            endHour = 15;
          } else if (weekNumber % 3 === 1) {
            shiftType = "Afternoon";
            startHour = 15;
            endHour = 23;
          } else {
            shiftType = "Night";
            startHour = 23;
            endHour = 7;
          }
        } else { // Techs
          if (day % 2 === 0) {
            shiftType = "Morning";
            startHour = 7;
            endHour = 15;
          } else {
            shiftType = "Afternoon";
            startHour = 15;
            endHour = 23;
          }
        }
        
        shifts.push(createShift(
          `shift${shiftId++}`,
          staff.id,
          staff.name,
          monthDates[day],
          startHour,
          endHour,
          shiftType,
          "Emergency"
        ));
      }
    }
  });

  // ICU Department - Similar 24/7 pattern
  const icuStaff = [
    { id: "10", name: "Dr. Jennifer Lee", days: [0,1,2,4,5,7,8,10,11,12,14,15,17,18,20,21,22,24,25,27,28] },
    { id: "11", name: "Dr. William Taylor", days: [1,2,3,5,6,8,9,11,12,13,15,16,18,19,21,22,23,25,26,28,29] },
    { id: "12", name: "Dr. Lisa Anderson", days: [0,3,4,6,7,9,10,13,14,16,17,19,20,23,24,26,27,29] },
    { id: "13", name: "Nurse Thomas Moore", days: [0,1,3,4,6,7,9,10,12,13,15,16,18,19,21,22,24,25,27,28] },
    { id: "14", name: "Nurse Susan Clark", days: [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29] },
    { id: "15", name: "Nurse Kevin White", days: [0,2,3,5,6,8,9,11,12,14,15,17,18,20,21,23,24,26,27,29] },
    { id: "16", name: "Nurse Angela Martinez", days: [2,3,4,6,7,8,10,11,12,14,15,16,18,19,20,22,23,24,26,27,28] },
    { id: "17", name: "Tech Joseph Hall", days: [0,2,4,6,8,10,12,14,16,18,20,22,24,26,28] }
  ];

  icuStaff.forEach(staff => {
    staff.days.forEach((day, index) => {
      if (day < 30) {
        const weekNumber = Math.floor(day / 7);
        let shiftType: "Morning" | "Afternoon" | "Night" = "Morning";
        let startHour = 7;
        let endHour = 15;
        
        if (staff.id >= "10" && staff.id <= "12") { // Doctors
          shiftType = index % 2 === 0 ? "Morning" : "Afternoon";
          startHour = shiftType === "Morning" ? 7 : 15;
          endHour = shiftType === "Morning" ? 15 : 23;
        } else { // Nurses and techs
          const shiftIndex = index % 3;
          if (shiftIndex === 0) {
            shiftType = "Morning";
            startHour = 7;
            endHour = 15;
          } else if (shiftIndex === 1) {
            shiftType = "Afternoon";
            startHour = 15;
            endHour = 23;
          } else {
            shiftType = "Night";
            startHour = 23;
            endHour = 7;
          }
        }
        
        shifts.push(createShift(
          `shift${shiftId++}`,
          staff.id,
          staff.name,
          monthDates[day],
          startHour,
          endHour,
          shiftType,
          "ICU"
        ));
      }
    });
  });

  // Surgery Department - Weekdays mainly, some weekends
  const surgerySchedule = [
    { id: "18", name: "Dr. Richard Thompson", days: [0,1,2,3,4,7,8,9,10,11,14,15,16,17,18,21,22,23,24,25,28,29] },
    { id: "19", name: "Dr. Catherine Adams", days: [0,1,2,3,4,7,8,9,10,11,14,15,16,17,18,21,22,23,24,25,28,29] },
    { id: "20", name: "Dr. Daniel Wright", days: [1,2,3,4,5,8,9,10,11,12,15,16,17,18,19,22,23,24,25,26] },
    { id: "21", name: "Nurse Barbara Lopez", days: [0,1,2,3,4,7,8,9,10,11,14,15,16,17,18,21,22,23,24,25] },
    { id: "22", name: "Nurse Christopher Lee", days: [1,2,3,4,5,8,9,10,11,12,15,16,17,18,19,22,23,24,25,26] },
    { id: "23", name: "Nurse Michelle Young", days: [0,2,3,4,5,7,9,10,11,12,14,16,17,18,19,21,23,24,25,26] },
    { id: "24", name: "Tech Steven Harris", days: [0,1,2,3,4,7,8,9,10,11,14,15,16,17,18,21,22,23,24,25] },
    { id: "25", name: "Tech Nancy Walker", days: [1,2,3,4,5,8,9,10,11,12,15,16,17,18,19,22,23,24,25,26] }
  ];

  surgerySchedule.forEach(staff => {
    staff.days.forEach(day => {
      if (day < 30) {
        const dayOfWeek = monthDates[day].getDay();
        // Surgery is mostly morning shifts
        shifts.push(createShift(
          `shift${shiftId++}`,
          staff.id,
          staff.name,
          monthDates[day],
          7,
          15,
          "Morning",
          "Surgery"
        ));
        
        // Add some on-call shifts for doctors
        if (staff.id <= "20" && (dayOfWeek === 3 || dayOfWeek === 5) && Math.random() > 0.7) {
          shifts.push(createShift(
            `shift${shiftId++}`,
            staff.id,
            staff.name,
            monthDates[day],
            17,
            7,
            "On-Call",
            "Surgery"
          ));
        }
      }
    });
  });

  // Pediatrics Department
  const pediatricsStaff = [
    { id: "26", name: "Dr. Amanda Robinson", days: [0,1,2,3,4,7,8,9,10,11,14,15,16,17,18,21,22,23,24,25,28,29] },
    { id: "27", name: "Dr. Matthew Clark", days: [1,2,3,4,5,8,9,10,11,12,15,16,17,18,19,22,23,24,25,26,29] },
    { id: "28", name: "Nurse Jessica King", days: [0,1,2,4,5,7,8,9,11,12,14,15,16,18,19,21,22,23,25,26,28,29] },
    { id: "29", name: "Nurse Brian Scott", days: [0,2,3,4,6,7,9,10,11,13,14,16,17,18,20,21,23,24,25,27,28] },
    { id: "30", name: "Nurse Laura Green", days: [1,2,3,5,6,8,9,10,12,13,15,16,17,19,20,22,23,24,26,27,29] },
    { id: "31", name: "Tech Karen Hill", days: [0,1,3,4,7,8,10,11,14,15,17,18,21,22,24,25,28,29] }
  ];

  pediatricsStaff.forEach(staff => {
    staff.days.forEach((day, index) => {
      if (day < 30) {
        let shiftType: "Morning" | "Afternoon" | "Night" = "Morning";
        let startHour = 7;
        let endHour = 15;
        
        if (staff.id === "27" || staff.id === "29") {
          shiftType = "Afternoon";
          startHour = 15;
          endHour = 23;
        } else if (staff.id === "30" && index % 3 === 2) {
          shiftType = "Night";
          startHour = 23;
          endHour = 7;
        }
        
        shifts.push(createShift(
          `shift${shiftId++}`,
          staff.id,
          staff.name,
          monthDates[day],
          startHour,
          endHour,
          shiftType,
          "Pediatrics"
        ));
      }
    });
  });

  // Cardiology Department
  const cardiologyStaff = [
    { id: "32", name: "Dr. Charles Baker", days: [0,1,2,3,4,7,8,9,10,11,14,15,16,17,18,21,22,23,24,25,28,29] },
    { id: "33", name: "Dr. Helen Nelson", days: [1,2,3,4,5,8,9,10,11,12,15,16,17,18,19,22,23,24,25,26] },
    { id: "34", name: "Nurse Ronald Carter", days: [0,1,2,3,4,7,8,9,10,11,14,15,16,17,18,21,22,23,24,25] },
    { id: "35", name: "Nurse Dorothy Mitchell", days: [1,2,3,4,5,8,9,10,11,12,15,16,17,18,19,22,23,24,25,26] },
    { id: "36", name: "Tech Frank Perez", days: [0,2,4,7,9,11,14,16,18,21,23,25,28] }
  ];

  cardiologyStaff.forEach(staff => {
    staff.days.forEach(day => {
      if (day < 30) {
        const shiftType = staff.id === "33" || staff.id === "35" ? "Afternoon" : "Morning";
        const startHour = shiftType === "Morning" ? 7 : 15;
        const endHour = shiftType === "Morning" ? 15 : 23;
        
        shifts.push(createShift(
          `shift${shiftId++}`,
          staff.id,
          staff.name,
          monthDates[day],
          startHour,
          endHour,
          shiftType,
          "Cardiology"
        ));
        
        // Add some on-call shifts
        if (staff.id === "32" && day % 7 === 3) {
          shifts.push(createShift(
            `shift${shiftId++}`,
            staff.id,
            staff.name,
            monthDates[day],
            17,
            7,
            "On-Call",
            "Cardiology"
          ));
        }
      }
    });
  });

  // Add special events throughout the month
  // Training sessions
  [5, 12, 19, 26].forEach(day => {
    if (day < 30) {
      shifts.push(createShift(
        `shift${shiftId++}`,
        "10",
        "Dr. Jennifer Lee",
        monthDates[day],
        14,
        16,
        "Training",
        "ICU"
      ));
    }
  });

  // Department meetings
  [7, 14, 21, 28].forEach(day => {
    if (day < 30) {
      shifts.push(createShift(
        `shift${shiftId++}`,
        "26",
        "Dr. Amanda Robinson",
        monthDates[day],
        13,
        15,
        "Meeting",
        "Pediatrics"
      ));
      
      shifts.push(createShift(
        `shift${shiftId++}`,
        "18",
        "Dr. Richard Thompson",
        monthDates[day],
        14,
        16,
        "Conference",
        "Surgery"
      ));
    }
  });

  return shifts;
};

export const mockShifts: Shift[] = generateMonthlyShifts();

export const initialRosterState: RosterAgentState = {
  staff: mockStaff,
  shifts: mockShifts,
  selectedDate: new Date(),
  viewMode: "week",
};