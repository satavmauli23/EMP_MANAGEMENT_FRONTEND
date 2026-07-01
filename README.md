# Employee Management Frontend - Next.js

This is a Next.js migration of the Employee Management System frontend.

## Features

- View employees by department
- Search employees
- View employee details
- Update employee information
- Delete employees
- Download employees report as PDF

## Getting Started

### Prerequisites

- Node.js 16+ and npm/yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env.local` file (or update the existing one):
```bash
NEXT_PUBLIC_API_URL=http://localhost:8082
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout component
│   ├── page.tsx            # Home page (employee list)
│   ├── details/
│   │   └── page.tsx        # Employee details page
│   └── globals.css         # Global styles
├── lib/
│   └── api.ts             # API configuration
├── public/                # Static files
├── package.json           # Dependencies
├── next.config.js         # Next.js configuration
├── tsconfig.json          # TypeScript configuration
├── tailwind.config.js     # Tailwind CSS configuration
└── postcss.config.js      # PostCSS configuration
```

## API Endpoints

The application connects to the backend at `http://localhost:8082` with these endpoints:

- `GET /employees/departments/:id` - Get employees by department
- `GET /employees` - Get all employees
- `PATCH /employees/:id` - Update employee
- `DELETE /employees/departments/:deptId/:empId` - Delete employee
- `GET /pdf/report` - Download employees report

## Technologies

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React 18** - UI library
