# Hospital Roster Agent

An AI-powered hospital staff scheduling system built with Next.js, tui.calendar, and CopilotKit.

## Features

- Interactive calendar view for staff scheduling
- AI assistant for natural language scheduling commands
- Support for different shift types (Morning, Afternoon, Night, On-Call)
- Real-time schedule updates through AI conversation

## Getting Started

1. Clone the repository
2. Copy `.env.example` to `.env` and add your OpenAI API key:
   ```
   cp .env.example .env
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

- View and manage staff schedules on the calendar
- Use the AI assistant on the right to:
  - Create new shifts: "Create a morning shift for Dr. Sarah Johnson tomorrow from 7 AM to 3 PM"
  - Remove shifts: "Remove shift shift1"
  - Ask about schedules: "Who is working tonight?"

## Project Structure

- `/src/app` - Next.js app router pages and components
- `/src/app/components` - React components
- `/src/app/types` - TypeScript type definitions
- `/src/app/data` - Mock data for development
- `/src/app/api/copilotkit` - CopilotKit API integration

## Future Enhancements

- Integration with real hospital databases
- Advanced scheduling algorithms
- Conflict detection and resolution
- Staff preferences and availability management
- Reporting and analytics