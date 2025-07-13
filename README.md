# Hospital Roster Agent 🏥

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-14.2.5-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js">
  <img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React">
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/CopilotKit-Latest-06F9C0?style=for-the-badge" alt="CopilotKit">
  <img src="https://img.shields.io/badge/License-CC%20BY--NC--ND%204.0-lightgrey.svg?style=for-the-badge" alt="License">
</div>

<div align="center">
  <h3>AI-Powered Hospital Staff Scheduling System</h3>
  <p>Revolutionize hospital workforce management with intelligent scheduling and real-time AI assistance</p>
</div>

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Demo](#demo)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Usage Guide](#usage-guide)
- [AI Capabilities](#ai-capabilities)
- [Project Structure](#project-structure)
- [API Reference](#api-reference)
- [Contributing](#contributing)
- [Roadmap](#roadmap)
- [License](#license)

## 🌟 Overview

Hospital Roster Agent is a cutting-edge staff scheduling system designed specifically for healthcare facilities. It combines the power of AI with an intuitive user interface to streamline the complex process of managing hospital staff schedules, shifts, and rotations.

### Key Benefits:
- **Efficiency**: Reduce scheduling time by up to 70%
- **Accuracy**: Minimize scheduling conflicts and errors
- **Flexibility**: Adapt to changing staffing needs in real-time
- **Compliance**: Ensure adherence to labor regulations and hospital policies
- **Staff Satisfaction**: Consider preferences and work-life balance

## ✨ Features

### 📅 Calendar View
- **Interactive Calendar**: Drag-and-drop interface powered by TOAST UI Calendar
- **Multiple Views**: Month, week, and day views for comprehensive scheduling
- **Real-time Updates**: Instant synchronization of schedule changes
- **Staff Filtering**: View schedules by individual staff members or departments
- **Color-coded Shifts**: Visual distinction between different shift types and departments

### 📊 Spreadsheet View
- **Excel-like Interface**: Familiar spreadsheet layout for bulk data management
- **Batch Operations**: Edit multiple schedules simultaneously
- **Data Import/Export**: JSON format support for data portability
- **Advanced Filtering**: Sort and filter by department, role, or shift type
- **Multiple Spreadsheets**: Manage different roster types (weekly, monthly, departmental)

### 🤖 AI Assistant
- **Natural Language Processing**: Communicate with the system using everyday language
- **Smart Scheduling**: AI-powered shift recommendations based on patterns
- **Conflict Resolution**: Automatic detection and resolution of scheduling conflicts
- **Query Support**: Ask questions about schedules, availability, and coverage
- **Bulk Operations**: Execute complex scheduling tasks through simple commands

### 👥 Staff Management
- **Comprehensive Profiles**: Manage staff information including roles and departments
- **Department Organization**: Group staff by Emergency, ICU, Surgery, Pediatrics, and Cardiology
- **Role-based Views**: Filter by Doctors, Nurses, and Technicians
- **Quick Actions**: Add, edit, or remove staff members with ease

## 🎬 Demo

### Calendar View
![Calendar View](https://via.placeholder.com/800x400?text=Calendar+View+Screenshot)
*Interactive calendar interface with drag-and-drop functionality*

### Spreadsheet View
![Spreadsheet View](https://via.placeholder.com/800x400?text=Spreadsheet+View+Screenshot)
*Excel-like interface for bulk schedule management*

### AI Assistant in Action
```
User: "Create a morning shift for Dr. Sarah Johnson next Monday from 7 AM to 3 PM"
AI: "I'll create a morning shift for Dr. Sarah Johnson on Monday from 7:00 AM to 3:00 PM."
[Shift created successfully]

User: "Who's working in the Emergency department tonight?"
AI: "In the Emergency department tonight (11:00 PM - 7:00 AM):
- Nurse Patricia Brown
- Nurse David Kim"
```

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend (Next.js)                    │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────────┐  │
│  │   Calendar   │  │  Spreadsheet │  │  Staff Manager   │  │
│  │     View     │  │     View     │  │    Component     │  │
│  └─────────────┘  └──────────────┘  └──────────────────┘  │
├─────────────────────────────────────────────────────────────┤
│                    State Management (React)                  │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────┐   │
│  │              CopilotKit Integration                  │   │
│  │  ┌─────────────┐  ┌──────────────┐  ┌───────────┐  │   │
│  │  │   Actions   │  │   Readable   │  │    UI     │  │   │
│  │  │   Handler   │  │    State     │  │ Sidebar   │  │   │
│  │  └─────────────┘  └──────────────┘  └───────────┘  │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                               │
                               ▼
                    ┌──────────────────┐
                    │   OpenAI API     │
                    └──────────────────┘
```

## 🛠️ Tech Stack

### Frontend
- **Framework**: [Next.js 14.2.5](https://nextjs.org/) - React framework with App Router
- **UI Library**: [React 18](https://react.dev/) - Component-based UI
- **Language**: [TypeScript 5](https://www.typescriptlang.org/) - Type-safe development
- **Styling**: [Tailwind CSS 3](https://tailwindcss.com/) - Utility-first CSS

### AI Integration
- **CopilotKit**: AI assistant framework for seamless integration
- **OpenAI API**: GPT-4 powered natural language processing

### UI Components
- **Calendar**: [@toast-ui/react-calendar](https://ui.toast.com/tui-calendar) - Feature-rich calendar
- **Spreadsheet**: [react-spreadsheet](https://github.com/iddan/react-spreadsheet) - Excel-like grid

### Development Tools
- **Package Manager**: npm/yarn
- **Linting**: ESLint with Next.js config
- **Version Control**: Git

## 🚀 Getting Started

### Prerequisites
- Node.js 18.0 or higher
- npm or yarn
- OpenAI API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ChanMeng666/hospital-roster-agent.git
   cd hospital-roster-agent
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment setup**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your OpenAI API key:
   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   ```

4. **Run development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open the application**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Production Build

```bash
npm run build
npm start
# or
yarn build
yarn start
```

## 📖 Usage Guide

### Calendar View Operations

#### Manual Operations
- **Create Shift**: Click and drag on the calendar
- **Edit Shift**: Drag to move or resize shifts
- **Delete Shift**: Click on a shift and press delete
- **Navigate**: Use month/week/day buttons and arrow navigation
- **Filter Staff**: Click on staff cards to filter the calendar

#### AI Commands
```
"Create a morning shift for Dr. Johnson tomorrow"
"Move Sarah's shift from Monday to Tuesday"
"Delete all night shifts for next week"
"Show me who's working this weekend"
"Navigate to next month"
```

### Spreadsheet View Operations

#### Manual Operations
- **Edit Cell**: Click any cell to edit
- **Select Multiple**: Click and drag or use Shift+Click
- **Add/Delete Rows**: Use the + button or Delete key
- **Export/Import**: Use toolbar buttons for data transfer

#### AI Commands
```
"Add a new row for Dr. Smith"
"Update cell B3 to 'Morning Shift'"
"Delete row 5"
"Export current spreadsheet"
"Create a new roster for next month"
```

## 🤖 AI Capabilities

### Supported AI Actions

#### Calendar Management
- `createShift` - Create new shifts with natural language
- `updateShift` - Modify existing shifts
- `removeShift` - Delete shifts
- `queryShifts` - Search and filter shifts
- `navigateCalendar` - Control calendar navigation
- `filterCalendarByStaff` - Filter view by staff selection

#### Staff Management
- `addStaffMember` - Add new staff to the system
- `updateStaffMember` - Modify staff information
- `removeStaffMember` - Remove staff from system

#### Spreadsheet Operations
- `updateCellValue` - Edit specific cells
- `addEmptyRow/Column` - Expand spreadsheet
- `deleteRow/Column` - Remove data
- `createRosterSpreadsheet` - Generate new rosters
- `exportCurrentSpreadsheet` - Export data

#### Navigation
- `navigateToSpreadsheet` - Switch to spreadsheet view
- `navigateToCalendar` - Switch to calendar view

## 📁 Project Structure

```
hospital-roster-agent/
├── src/
│   ├── app/
│   │   ├── components/         # React components
│   │   │   ├── RosterCalendar.tsx
│   │   │   ├── HospitalSpreadsheet.tsx
│   │   │   ├── StaffList.tsx
│   │   │   └── Navigation.tsx
│   │   ├── types/             # TypeScript definitions
│   │   │   ├── roster.ts
│   │   │   └── spreadsheet.ts
│   │   ├── data/              # Mock data
│   │   │   ├── mockData.ts
│   │   │   └── spreadsheetData.ts
│   │   ├── utils/             # Utility functions
│   │   ├── api/               # API routes
│   │   │   └── copilotkit/
│   │   ├── page.tsx           # Calendar view page
│   │   └── spreadsheet/       # Spreadsheet view
│   │       └── page.tsx
├── public/                    # Static assets
├── .env.example              # Environment template
├── package.json              # Dependencies
├── tsconfig.json             # TypeScript config
└── README.md                 # This file
```

## 🔌 API Reference

### CopilotKit Actions

All AI actions follow this pattern:
```typescript
useCopilotAction({
  name: "actionName",
  description: "What this action does",
  parameters: [...],
  handler: (params) => {
    // Action implementation
  }
});
```

### State Management

```typescript
interface RosterAgentState {
  staff: Staff[];
  shifts: Shift[];
  selectedDate: Date;
  viewMode: "month" | "week" | "day";
}
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Maintain existing code style
- Write meaningful commit messages
- Update documentation as needed
- Add tests for new features

## 🗺️ Roadmap

### Phase 1 (Current)
- ✅ Basic calendar and spreadsheet views
- ✅ AI integration with CopilotKit
- ✅ Staff management system
- ✅ Multi-department support

### Phase 2 (Q1 2025)
- [ ] Real-time collaboration
- [ ] Mobile responsive design
- [ ] Advanced scheduling algorithms
- [ ] Integration with HR systems

### Phase 3 (Q2 2025)
- [ ] Predictive scheduling
- [ ] Staff preference management
- [ ] Compliance tracking
- [ ] Advanced analytics dashboard

### Phase 4 (Q3 2025)
- [ ] Multi-hospital support
- [ ] API for third-party integrations
- [ ] Machine learning optimization
- [ ] Automated reporting

## 📄 License

This project is licensed under the Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International (CC BY-NC-ND 4.0) License - see the [LICENSE](LICENSE) file for details.

### License Summary
- **Attribution**: You must give appropriate credit, provide a link to the license, and indicate if changes were made
- **NonCommercial**: You may not use the material for commercial purposes
- **NoDerivatives**: If you remix, transform, or build upon the material, you may not distribute the modified material

For more information about this license, visit: https://creativecommons.org/licenses/by-nc-nd/4.0/

## 🙏 Acknowledgments

- [TOAST UI Calendar](https://ui.toast.com/tui-calendar) for the calendar component
- [CopilotKit](https://copilotkit.ai/) for AI integration framework
- [OpenAI](https://openai.com/) for GPT-4 API
- All contributors and supporters of this project

---

<div align="center">
  <p>Made with ❤️ by the Hospital Roster Agent Team</p>
  <p>
    <a href="https://github.com/ChanMeng666/hospital-roster-agent">GitHub</a> •
    <a href="https://github.com/ChanMeng666/hospital-roster-agent/issues">Issues</a> •
    <a href="https://github.com/ChanMeng666/hospital-roster-agent/pulls">Pull Requests</a>
  </p>
</div>