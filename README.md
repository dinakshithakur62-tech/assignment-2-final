# Escape Room Assignment - Interactive Coding Platform

A modern Next.js web application featuring an interactive Escape Room with coding challenges, dynamic tabs generator, and full database integration using Docker and Prisma.

## Student Information

- **Student Name**: Dinakshi Thakur
- **Student Number**: 21782127

## Features

### Core Features (Assignment 1)
- Dynamic tabs generator with HTML5 output
- Dark mode/Light mode theme toggle with localStorage persistence
- Cookie-based navigation memory
- Responsive hamburger menu navigation
- Full WCAG 2.1 AA accessibility compliance
- Student information displayed throughout the application

### New Features (Assignment 2)
- **Escape Room**: 4-stage coding challenge with:
  - Stage 1: Format code correctly (fix indentation and syntax)
  - Stage 2: Debug code (fix array index bug)
  - Stage 3: Generate numbers 0 to 1000
  - Stage 4: Data transformation (JSON to CSV)
  - Manual timer with start/stop/reset controls
  - Custom timer setting
  - Progress tracking and validation

- **Database Integration**: Full CRUD operations using Prisma ORM
- **Docker Setup**: Complete containerization with docker-compose
- **Playwright Testing**: Automated end-to-end tests
- **Instrumentation**: Built-in observability and logging

## Technology Stack

- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript
- **Database**: PostgreSQL 15
- **ORM**: Prisma
- **Styling**: Tailwind CSS
- **Testing**: Playwright
- **Containerization**: Docker & Docker Compose
- **Icons**: Lucide React

## Prerequisites

- Node.js 20 or higher
- Docker and Docker Compose
- npm or yarn

## Installation & Setup

### 1. Clone the Repository

\`\`\`bash
git clone https://github.com/dinakshithakur62-tech/assignment-2-final
cd escape-room-assignment
\`\`\`

### 2. Install Dependencies

\`\`\`bash
npm install
\`\`\`

### 3. Set Up Environment Variables

Create a \`.env\` file in the root directory:

\`\`\`env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/escaperoom?schema=public"
NEXT_PUBLIC_STUDENT_NAME="Dinakshi Thakur"
NEXT_PUBLIC_STUDENT_NUMBER="21782127"
\`\`\`

### 4. Start Database with Docker

\`\`\`bash
# Start PostgreSQL database
docker-compose up -d postgres

# Wait a few seconds for database to be ready
\`\`\`

### 5. Run Database Migrations

\`\`\`bash
npx prisma migrate dev --name init
\`\`\`

### 6. Start Development Server

\`\`\`bash
npm run dev
\`\`\`

The application will be available at http://localhost:3000

## Docker Commands

### Start All Services (Application + Database)

\`\`\`bash
# Build and start all services
docker-compose up --build

# Run in background
docker-compose up -d
\`\`\`

### Stop All Services

\`\`\`bash
docker-compose down
\`\`\`

### Stop and Remove Volumes (Clean Slate)

\`\`\`bash
docker-compose down -v
\`\`\`

### View Logs

\`\`\`bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f next-app
docker-compose logs -f postgres
\`\`\`

### Rebuild Application

\`\`\`bash
docker-compose up --build next-app
\`\`\`

## Database Management

### Prisma Commands

\`\`\`bash
# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate dev

# Deploy migrations (production)
npx prisma migrate deploy

# Open Prisma Studio (Database GUI)
npx prisma studio
\`\`\`

### Database Schema

The application uses a single table:

**output_codes**
- \`id\` (Int, Primary Key, Auto-increment)
- \`outputType\` (String) - Type of output: 'tabs', 'escape_room', etc.
- \`htmlContent\` (Text) - Generated HTML content
- \`createdAt\` (DateTime) - Creation timestamp
- \`updatedAt\` (DateTime) - Last update timestamp

## API Endpoints

### Get All Outputs
\`\`\`
GET /api/outputs
Response: Array of OutputCode objects
\`\`\`

### Get Single Output
\`\`\`
GET /api/outputs/[id]
Response: Single OutputCode object
\`\`\`

### Create Output
\`\`\`
POST /api/outputs
Body: {
  "outputType": "tabs",
  "htmlContent": "<html>...</html>"
}
Response: Created OutputCode object
\`\`\`

### Update Output
\`\`\`
PUT /api/outputs/[id]
Body: {
  "outputType": "tabs",
  "htmlContent": "<html>...</html>"
}
Response: Updated OutputCode object
\`\`\`

### Delete Output
\`\`\`
DELETE /api/outputs/[id]
Response: Success message
\`\`\`

## Testing

### Run Playwright Tests

\`\`\`bash
# Install Playwright browsers (first time only)
npx playwright install

# Run tests
npm test

# Run tests in headed mode (see browser)
npm run test:headed

# Run specific test file
npx playwright test tests/tabs.spec.ts
\`\`\`

### Test Coverage

- **Test 1**: Tabs HTML generation with inline CSS validation
- **Test 2**: Escape Room Stage 3 auto-generation and validation
- **Test 3**: Database save/retrieve functionality

## Project Structure

\`\`\`
escape-room-assignment/
├── app/
│   ├── api/
│   │   └── outputs/           # API routes for CRUD operations
│   ├── about/                 # About page
│   ├── tabs/                  # Tabs generator page
│   ├── escape-room/           # Escape Room feature
│   ├── coding-races/          # Coding Races placeholder
│   ├── court-room/            # Court Room placeholder
│   ├── layout.tsx             # Root layout
│   ├── page.tsx               # Home page
│   └── globals.css            # Global styles
├── components/
│   ├── Header.tsx             # Navigation header
│   └── Footer.tsx             # Footer component
├── lib/
│   ├── prisma.ts              # Prisma client
│   ├── theme-context.tsx      # Theme provider
│   ├── cookies.ts             # Cookie utilities
│   └── logger.ts              # Logging utility
├── prisma/
│   └── schema.prisma          # Database schema
├── tests/
│   ├── tabs.spec.ts           # Tabs tests
│   ├── escape-room.spec.ts    # Escape Room tests
│   └── database.spec.ts       # Database integration tests
├── docker-compose.yml         # Docker orchestration
├── Dockerfile                 # Application container
├── instrumentation.ts         # Next.js instrumentation
└── README.md                  # This file
\`\`\`

## Accessibility Features

- Semantic HTML5 elements
- ARIA labels on all interactive elements
- Keyboard navigation support
- Focus indicators
- Screen reader compatible
- High contrast ratios (WCAG AA compliant)
- Responsive design for all screen sizes

## Instrumentation & Observability

The application includes built-in instrumentation for monitoring:

- API request/response times
- Database operation metrics
- Page load performance
- User interaction tracking
- Error logging with context

View instrumentation logs in the console when running the application.

## Development Workflow

1. **Make Changes**: Edit files in your preferred editor
2. **Hot Reload**: Next.js automatically reloads on changes
3. **Test Locally**: Run tests with \`npm test\`
4. **Check Database**: Use Prisma Studio to view data
5. **Build**: Run \`npm run build\` to verify production build
6. **Commit**: Commit changes with descriptive messages

## Building for Production

\`\`\`bash
# Build the application
npm run build

# Start production server
npm start
\`\`\`

## Troubleshooting

### Database Connection Issues

\`\`\`bash
# Check if PostgreSQL is running
docker-compose ps

# Restart database
docker-compose restart postgres

# Check logs
docker-compose logs postgres
\`\`\`

### Prisma Client Issues

\`\`\`bash
# Regenerate Prisma Client
npx prisma generate

# Reset database (WARNING: Deletes all data)
npx prisma migrate reset
\`\`\`

### Port Already in Use

\`\`\`bash
# Change port in package.json dev script
"dev": "next dev -p 3001"

# Or kill process on port 3000
# macOS/Linux:
lsof -ti:3000 | xargs kill -9

# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F
\`\`\`

## Screenshots & Documentation

All screenshots are located in the **`/screenshots`** folder.

### 🧪 1. Playwright Test Results  
**File:** `screenshots/image1.png`  
This screenshot shows the **Playwright test results**, demonstrating successful end-to-end test execution for the web application.  

![Playwright Test Results](./screenshots/image1.png)

---

### 🗃️ 2. Prisma Studio  
**File:** `screenshots/image2.png`  
This screenshot displays **Prisma Studio**, confirming that the database schema is correctly connected and the data entries are visible and editable through the Prisma interface.  

![Prisma Studio](./screenshots/image2.png)

---

### ⚙️ 3. JMeter Performance Test  
**File:** `screenshots/image3.png`  
This image shows **Apache JMeter** load test results, verifying the application's performance under simulated user load.  

![JMeter Performance Test](./screenshots/image3.png)

---

### 💡 4. Lighthouse Performance Report  
**File:** `screenshots/image4.png`  
This screenshot presents the **Lighthouse report** for the application, detailing performance, accessibility, SEO, and best practices scores.  

![Lighthouse Report](./screenshots/image4.png)

---

### 🧾 5. GitHub Commit History  
**File:** `screenshots/image5.png`  
This screenshot captures the **GitHub commit history**, showing the version control activity and contributions throughout the development process.  

![GitHub Commit History](./screenshots/image5.png)

---


## License

This project is for educational purposes as part of Assignment 2.