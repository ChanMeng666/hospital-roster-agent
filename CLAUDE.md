# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `npm run dev` - Start development server on localhost:3000
- `npm run build` - Build production application
- `npm run start` - Start production server
- `npm run lint` - Run ESLint to check code quality

### Environment Setup
- Copy `.env.example` to `.env` and add your OpenAI API key
- Required environment variables:
  - `OPENAI_API_KEY` - OpenAI API key for AI functionality
  - `OPENAI_MODEL` - Optional, defaults to "gpt-4o-mini-2024-07-18"

## Architecture Overview

This is a Next.js 14 application with App Router that provides an AI-powered hospital staff scheduling system with two main views:

### Core Structure
- **Calendar View** (`/` - `src/app/page.tsx`): Interactive calendar interface using TOAST UI Calendar
- **Spreadsheet View** (`/spreadsheet` - `src/app/spreadsheet/page.tsx`): Excel-like interface using react-spreadsheet
- **AI Integration**: CopilotKit framework with OpenAI integration for natural language scheduling

### Key Components
- `RosterCalendar.tsx` - Main calendar component with drag-and-drop scheduling
- `HospitalSpreadsheetEnhanced.tsx` - Enhanced spreadsheet component for bulk data management
- `StaffList.tsx` - Staff management with filtering and CRUD operations
- `Navigation.tsx` - Navigation between calendar and spreadsheet views

### State Management
The application uses React state with the following core interfaces:
```typescript
interface RosterAgentState {
  staff: Staff[];
  shifts: Shift[];
  selectedDate: Date;
  viewMode: "month" | "week" | "day";
}
```

### AI Actions Architecture
CopilotKit actions are defined within components using `useCopilotAction`. Key action categories:
- **Calendar Management**: createShift, updateShift, removeShift, queryShifts, navigateCalendar
- **Staff Management**: addStaffMember, updateStaffMember, removeStaffMember
- **Spreadsheet Operations**: updateCellValue, addEmptyRow, deleteRow, createRosterSpreadsheet
- **Navigation**: navigateToSpreadsheet, navigateToCalendar

### Data Models
- **Staff**: id, name, role (Doctor/Nurse/Technician), department, color
- **Shift**: id, staffId, title, start/end dates, type (Morning/Afternoon/Night/On-Call/Training/Meeting/Conference), department
- **Departments**: Emergency, ICU, Surgery, Pediatrics, Cardiology

### Mock Data
Initial data is provided through:
- `src/app/data/mockData.ts` - Staff and shift data for calendar view
- `src/app/data/spreadsheetData.ts` - Tabular roster data for spreadsheet view

## Technical Details

### SSR Considerations
Components using external libraries (TOAST UI Calendar, react-spreadsheet) are dynamically imported with `ssr: false` to avoid server-side rendering issues.

### API Route
`src/app/api/copilotkit/route.ts` handles CopilotKit integration with OpenAI using LangChain adapter.

### Styling
- TailwindCSS for utility styling
- Custom calendar themes in `src/app/utils/calendarTheme.ts`
- Calendar templates in `src/app/utils/calendarTemplates.ts`

### TypeScript
Comprehensive type definitions in `src/app/types/` for roster and spreadsheet data structures.

## Development Guidelines

### Code Standards
- All text content in pages and components must be in English - no Chinese content allowed
- Use Conventional Commits format for all code commits
- GitHub CLI is available for GitHub-related operations

### Testing Requirements
- Create functional tests for the project
- Test thoroughly after implementing each small milestone
- Ensure stable development progress with comprehensive testing

### Development Notes
- Use dynamic imports for client-side only components
- All AI actions should follow CopilotKit patterns with proper parameter descriptions
- State updates should maintain immutability
- Color-coded staff members for visual organization
- Shift filtering by staff selection is supported in calendar view