# Quick Start Guide

## Prerequisites
- Node.js 20+
- Docker and Docker Compose
- npm

## Quick Setup (5 minutes)

### 1. Install Dependencies
```bash
npm install
```

### 2. Update Environment Variables
Edit `.env` and add your student information:
```env
NEXT_PUBLIC_STUDENT_NAME="Your Full Name"
NEXT_PUBLIC_STUDENT_NUMBER="Your Student Number"
```

### 3. Start Database
```bash
docker-compose up -d postgres
```

### 4. Run Migrations
```bash
npx prisma migrate dev --name init
```

### 5. Start Development Server
```bash
npm run dev
```

Visit http://localhost:3000

## Features to Test

1. **Home Page** - Navigate through all features
2. **Tabs Generator** - Create HTML with inline CSS
   - Configure tabs
   - Generate HTML output
   - Copy to clipboard
   - Save to database

3. **Escape Room** - Complete 4 coding challenges
   - Stage 1: Format code correctly
   - Stage 2: Debug array index bug
   - Stage 3: Generate numbers 0-1000
   - Stage 4: Transform JSON to CSV
   - Use the timer and save progress

4. **Dark Mode** - Toggle theme (persists in localStorage)

5. **Navigation** - Uses cookies to remember last page visited

## Running Tests

```bash
# Install Playwright browsers (first time only)
npx playwright install

# Run all tests
npm test

# Run tests in headed mode (see browser)
npm run test:headed
```

## Docker Deployment

### Build and Run Everything
```bash
docker-compose up --build
```

### Access the Application
- App: http://localhost:3000
- Database: localhost:5432

### Stop Everything
```bash
docker-compose down
```

## API Endpoints

Test the API with curl:

```bash
# Create an output
curl -X POST http://localhost:3000/api/outputs \
  -H "Content-Type: application/json" \
  -d '{"outputType":"test","htmlContent":"<html>Test</html>"}'

# Get all outputs
curl http://localhost:3000/api/outputs

# Get specific output (replace 1 with actual ID)
curl http://localhost:3000/api/outputs/1

# Update output
curl -X PUT http://localhost:3000/api/outputs/1 \
  -H "Content-Type: application/json" \
  -d '{"htmlContent":"<html>Updated</html>"}'

# Delete output
curl -X DELETE http://localhost:3000/api/outputs/1
```

## Troubleshooting

### Database Connection Issues
```bash
# Check if postgres is running
docker-compose ps

# View logs
docker-compose logs postgres

# Restart
docker-compose restart postgres
```

### Port 3000 Already in Use
```bash
# Change port in package.json
"dev": "next dev -p 3001"
```

### Prisma Issues
```bash
# Regenerate client
npx prisma generate

# View database
npx prisma studio
```

## For Assignment Submission

### Required Screenshots
1. GitHub commit history
2. Application homepage
3. Escape Room in progress
4. Docker containers running (`docker ps`)
5. Database with saved records
6. Playwright test results
7. Lighthouse audit scores
8. Console showing instrumentation logs

### Video Demo (3-8 minutes)
- Show all pages and features
- Demonstrate Tabs generator
- Complete at least one Escape Room stage
- Show database save functionality
- Run Playwright tests
- Show Docker containers
- Demonstrate instrumentation output

## Additional Commands

```bash
# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Type check
npm run typecheck

# View database in browser
npx prisma studio
```

## Next Steps

1. Customize `.env` with your information
2. Test all features locally
3. Run the build to ensure no errors
4. Set up Git repository
5. Make regular commits with clear messages
6. Run Playwright tests
7. Take screenshots
8. Record video walkthrough
9. Prepare assignment documentation