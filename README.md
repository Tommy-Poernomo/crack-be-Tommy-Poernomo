# ⚙️ DKV LMS - Backend API Gateway Engine

A robust, enterprise-grade RESTful API Gateway engine built on top of NestJS. This server handles secure identity propagation, PostgreSQL transactional consistency, and data validation rules for the DKV LMS platform.

---

## 🔗 Deployment & Database Reference Links
* **Production API Server:**  [Will available soon]()
* **Interactive Database ERD Diagram:** [Desain Database Schema](https://dbdiagram.io/d/6a095de79f1f8ec47b30c153)

---

## 📝 Project Description

**DKV LMS Backend** serves as the central orchestration core of the learning system. Utilizing a structured module architecture, it translates complex relationship layers (Users, Courses, Lessons, Assignments, and Submissions) into performant SQL queries while keeping execution contexts safe.

Key system design constraints solved at the server layer:
* **Strict Role Segregation:** Endpoint authorization verification powered by Passport guard configurations.
* **Cascading Lifecycles:** Automatic deletion triggers configured at the relational database tier preventing corrupted data or orphan foreign keys.
* **Locked-Down Identifiers:** Critical core credentials like user login email strings are deliberately excluded from patch payloads to eliminate profile takeover security vectors.

---

## 🚀 Core Backend Engineering Features

* **Fail-Safe Identity Resolver:** Direct object parameter discovery (`req.user.userId`) inside the controllers bypassing typical passport context latencies, ensuring reliable entity ID lookup.
* **Adaptive Type Casting:** Intelligent route extraction that automatically validates payload variations (e.g., matching text param inputs with integer base IDs safely).
* **Double-Pass Password Sanitation:** String evaluators built into the service layer to prevent blank input submissions from overwriting existing cryptographic strings during metadata profile changes.
* **Supabase Port Configuration:** Native routing via Port 5432 directly avoiding standard transaction pooler constraints, allowing smooth schema migrations.

---

## 🛠️ Tech Stack Used

* **Core Core Framework:** NestJS (TypeScript Platform)
* **Database Driver System:** Prisma ORM Client
* **Target Engine Infrastructure:** PostgreSQL (Hosted on Supabase cloud nodes)
* **Access Tokens Management:** Passport JWT Protocol & Cryptographic Bcrypt Hashing

---

## 📁 Backend Project Structure

```text
src/
├── assignment/    # Inline tracking, task updates, and simulation handlers
├── auth/          # Central authentication, Passport JWT strategy, and User updates
├── course/        # Content meta-controllers for structural listings
├── enrollment/    # Student class relationship maps and completions logic
├── lesson/        # Sequential curriculum chapters modules
├── prisma/        # Singular global database Client mapping provider
└── main.ts        # Server instance bootstrapping entry point
```
---

## Database Design
![Landing Page](./assets/Skema%20Database%20LMS%20DKV%20Tommy%20Poernomo.png)


## 💻 Installation and Usage Instructions
1. Prerequisites

-    Node.js (v18 or higher)

-    PostgreSQL Database Node (Supabase setup recommended)

2. Local Server Setup
a.   Move into the root backend project workspace:
```bash
      cd lms-dkv-be
```
b.  Fetch dependencies:
```bash
      npm install
```
c. Set up a secure `.env` configuration file in the project root containing your secret variables:
```
      DATABASE_URL="postgresql://postgres.***.supabase.com:6543/postgres?pgbouncer=true"
      DIRECT_URL="postgresql://postgres.***.supabase.com:5432/postgres"
      JWT_SECRET="yourSecretKey"
```
d. Push your models and compile the active Client schema:
```bash
      npx prisma generate
      npx prisma db push
```
e. Initiate the development watch listener:
```bash
      npm run start:dev
```

---

## 🔑 Comprehensive API Endpoints Reference

Protected routes require a valid `Authorization: Bearer <JWT_TOKEN>` header string.

### 👥 Authentication & Identity
-    `POST /auth/register` - Registers system access (Admin restricted for Teacher account processing).
-    `POST /auth/login` - Generates signed access tokens alongside user metadata.
-    `PATCH /auth/profile-update` - Flexible name and security password mutation portal.

### 📚 Course Management

-    `GET /course` - Open database stream returning all active course records.
-    `POST /course` - Publishes a new curriculum entry (Teacher privilege).
-    `GET /course/:id` - Returns complex course entity structures nested with relational sequential lessons.
-    `PATCH /course/:id` - Updates specific course descriptions.
-    `DELETE /course/:id` - Drops target course and automatically triggers relational cleanups.

### 🎓 Enrollments & Learning Progress
-    `POST /enrollment` - Connects a Student entity directly with an active Course identifier.
-    `GET /enrollment/my-courses` - Queries a customized list of courses associated with the current student token context.
-    `PATCH /enrollment/:courseId/complete` - Transitions student completion state parameter values directly to "COMPLETED".

### 📐 Practical Assignment Engine
-    `POST /assignments` - Emits a new practical task block accompanied by localized WITA timeline deadlines.
-    `GET /assignments?courseId=X` - Returns published task blocks belonging to a singular class node.
-    `PATCH /assignments/:id` - Advanced inline patch allowing mutation of instructions or transformation of target dates into standardized ISO timestamps.
-    `DELETE /assignments/:id` - Erases target parameters completely from table rows.
---

## 👩‍💻 Author

Created by Tommy Poernomo (2026) ✨

---

## 📄 License

This architecture is built for professional portfolio validation records. All rights reserved.