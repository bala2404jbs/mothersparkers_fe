# Mother Parkers Procurement Intelligence Platform

## Overview

This is a full-stack procurement intelligence platform built for Mother Parkers Tea & Coffee Inc. The application provides comprehensive supplier management, purchase tracking, commodity price monitoring, and AI-powered insights for procurement decision-making. It's designed as a modern web application with a React frontend and Express.js backend, utilizing PostgreSQL for data persistence.

## System Architecture

The application follows a monorepo structure with clear separation between client and server code:

- **Frontend**: React with TypeScript, using Vite for development and build processes
- **Backend**: Express.js server with TypeScript, serving both API endpoints and static files
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Styling**: Tailwind CSS with shadcn/ui component library for consistent UI design
- **State Management**: TanStack Query for server state management and caching

## Key Components

### Frontend Architecture
- **Component Library**: Uses shadcn/ui components built on Radix UI primitives
- **Routing**: Wouter for lightweight React routing
- **Authentication**: Context-based auth system with localStorage persistence
- **Charts**: Recharts library for data visualization
- **Forms**: React Hook Form with Zod validation

### Backend Architecture
- **API Routes**: RESTful endpoints for suppliers, purchase orders, commodities, and alerts
- **Authentication**: Simple username/password authentication (demo implementation)
- **Database Layer**: Drizzle ORM with PostgreSQL adapter
- **Static Serving**: Serves built React application in production

### Database Schema
The database includes the following main entities:
- **Users**: Authentication and authorization
- **Suppliers**: Comprehensive supplier profiles with performance metrics
- **Purchase Orders**: Contract and spot purchase tracking
- **Commodities**: Real-time price tracking and market data
- **Alerts**: System notifications and risk assessments

### UI Components
- Custom supplier cards with performance indicators
- Interactive charts for spend analysis and market trends
- Alert notification system with priority levels
- Responsive layout with mobile support

## Data Flow

1. **Authentication Flow**: Users authenticate via login form → Express API validates credentials → JWT-like session stored in localStorage
2. **Data Fetching**: React components use TanStack Query → API endpoints → Drizzle ORM → PostgreSQL
3. **Real-time Updates**: Polling-based updates for market data and alerts
4. **State Management**: Server state cached by TanStack Query, UI state managed by React hooks

## External Dependencies

### Core Framework Dependencies
- **React 18**: Frontend framework with modern hooks API
- **Express.js**: Backend web server framework
- **Drizzle ORM**: Type-safe database ORM for PostgreSQL
- **Neon Database**: Serverless PostgreSQL provider

### UI and Styling
- **Tailwind CSS**: Utility-first CSS framework
- **Radix UI**: Unstyled, accessible UI primitives
- **shadcn/ui**: Pre-built component library
- **Recharts**: Composable charting library

### Development Tools
- **Vite**: Fast development server and build tool
- **TypeScript**: Type safety across the entire stack
- **Wouter**: Lightweight React router
- **TanStack Query**: Server state management

## Deployment Strategy

The application is configured for deployment on Replit with the following setup:

### Development Environment
- Node.js 20 runtime with PostgreSQL 16
- Vite dev server on port 5000 with hot module replacement
- Automatic database migrations with Drizzle Kit

### Production Build Process
1. `npm run build`: Builds React frontend and bundles Express server
2. Frontend assets compiled to `dist/public`
3. Server code bundled with esbuild for Node.js execution
4. Static files served by Express in production mode

### Environment Configuration
- Database connection via `DATABASE_URL` environment variable
- Automatic database provisioning on Replit
- Production/development mode switching via `NODE_ENV`

## Changelog

```
Changelog:
- June 21, 2025. Initial setup
- June 21, 2025. Fixed navigation menu visibility - sidebar text now properly displays in white
- June 21, 2025. Enhanced login button styling for better visibility
- June 21, 2025. Improved logout button hover effects in header
- June 21, 2025. Changed sidebar navigation text color to black for better readability
- June 21, 2025. Removed notification badge from Alerts menu item
- June 21, 2025. Updated login button styling to blue background with bold white text
- June 21, 2025. Simplified login page background to clean light blue design
- June 21, 2025. Replaced coffee icon with authentic Mother Parkers historical truck image
- June 21, 2025. Integrated authentic Mother Parkers company details throughout application including supplier network, market intelligence, and historical context
- June 21, 2025. Added real Excel price data to Price Trends & AI Predictions sections with historical coffee market data and AI forecasting
- June 21, 2025. Replaced header coffee icon with authentic Mother Parkers logo and updated company name to full "Tea & Coffee" branding
- June 21, 2025. Removed Contracts and Risk Map navigation items to streamline interface
- June 21, 2025. Built comprehensive tabular alerts system fetching data from all dashboard components with filtering and search
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```