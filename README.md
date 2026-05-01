# Student Connect 🎓

A comprehensive full-stack College Ecosystem Platform designed to bridge the gap between students, mentors, clubs, and opportunities. Student Connect provides a unified hub for campus networking, event discovery, mentorship, and career growth.

## 🌟 Key Features

- **Authentication & Profiles:** Secure login with Google OAuth2 and JWT. Customizable student and mentor profiles.
- **Clubs & Organizations:** Discover, join, and manage campus clubs.
- **Events Management:** Browse and RSVP to upcoming university events.
- **Mentorship Program:** Find alumni and senior mentors, book 1-on-1 slots.
- **Career Opportunities:** Dedicated board for internships, jobs, and research positions.
- **Real-time Networking:** Live chat with peers and mentors using WebSockets.
- **Gamification:** Earn badges and points for active participation in the ecosystem.

## 🛠️ Tech Stack

### Frontend (Client)
- **Framework:** Next.js 16 (App Router)
- **UI Library:** React 19
- **Styling:** TailwindCSS
- **Animations:** Framer Motion
- **State Management:** Zustand
- **Real-time:** StompJS & SockJS (WebSockets)
- **HTTP Client:** Axios

### Backend (Server)
- **Framework:** Spring Boot 3.4.4 (Java 17)
- **Security:** Spring Security (OAuth2 Client, JWT)
- **Database ORM:** Spring Data JPA
- **Database Migrations:** Flyway
- **Real-time:** Spring WebSockets
- **API Documentation:** OpenAPI (Swagger UI)

### Infrastructure & Services
- **Database:** PostgreSQL (Supabase)
- **File Storage:** Cloudinary
- **Email Service:** SendGrid
- **Deployment:** Vercel (Frontend) & Render (Backend)

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- Java 17+ (JDK)
- Maven 3.8+
- PostgreSQL database (or Supabase account)

### Environment Variables
1. Copy the example environment file in the root directory:
   ```bash
   cp .env.example .env
   ```
2. Fill in the required API keys (Supabase, Cloudinary, SendGrid, Google OAuth).

### Running the Backend (Local)
1. Navigate to the `backend` directory.
2. Build the project:
   ```bash
   mvn clean install
   ```
3. Run the Spring Boot application:
   ```bash
   mvn spring-boot:run
   ```
   *The backend will start on `http://localhost:8080`.*

### Running the Frontend (Local)
1. Navigate to the `frontend` directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Next.js development server:
   ```bash
   npm run dev
   ```
   *The frontend will start on `http://localhost:3000`.*

## 📚 API Documentation
Once the backend is running, you can access the interactive Swagger API documentation at:
`http://localhost:8080/swagger-ui.html` (or `http://localhost:8080/v3/api-docs` for JSON).

## 🐳 Docker Deployment
A multi-stage `Dockerfile` is provided in the `backend/` directory for containerized deployment.
```bash
cd backend
docker build -t student-connect-backend .
docker run -p 8080:8080 --env-file ../.env student-connect-backend
```

## 📜 License
This project is proprietary.
