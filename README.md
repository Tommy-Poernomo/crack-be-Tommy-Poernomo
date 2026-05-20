This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/PzCCy7VV)

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>

# DKV LMS - Full Stack Application

A robust, full-stack Learning Management System (LMS) custom-built for Digital Visual Communication (DKV) and Photography education. This platform streamlines course delivery, student tracking, and user management through a secure, role-based ecosystem.

---

## 🔗 Deployment & Demo Links
*   **Frontend Deployment:** [Front End DKV LMS](https://crack-fe-tommy-poernomo.vercel.app/)
*   **Backend Deployment:** [Insert your Railway/Render Link Here]
*   **Database ERD Diagram:** [Desain Database](https://dbdiagram.io/d/6a095de79f1f8ec47b30c153)

---

## 📝 Project Description

**DKV LMS** is a centralized educational platform designed to bridge the gap between creative instructors and students in Vocational High School. Built using a modern decoupled architecture (Next.js for Frontend and NestJS for Backend), the application provides a seamless, high-performance environment for managing design modules and photography tracking. 

The system implements strict **Role-Based Access Control (RBAC)** split into three distinct dashboards:
*   **Admin:** Full CRUD operations over Teacher accounts to maintain institutional data integrity.
*   **Teacher:** Complete autonomy to create, read, update, and delete course materials and monitor student enrollment.
*   **Student:** An interactive portal to browse available courses, self-enroll, and track learning progress in real-time.

---

## 🚀 Key Features

*   **Secure Authentication:** Secure login and registration powered by JWT (JSON Web Tokens) with robust password hashing using Bcrypt.
*   **Fail-Safe Request Handling:** Implements manual token decoding on the backend controller to bypass guard latencies and guarantee precise extraction of user credentials.
*   **Full CRUD Multi-Dashboard:** Comprehensive data manipulation capabilities tailored specifically for each user role (Admin manages Teachers, Teachers manage Courses, Students manage Enrollments).
*   **Optimized Database Architecture:** Built on top of PostgreSQL (Supabase) using Prisma ORM with explicit session-based connections (`Direct URL` via Port 5432) to guarantee zero-downtime schema migrations.
*   **Interactive UI/UX:** Designed with a modern, dark-themed responsive interface using Tailwind CSS, complete with programmatic loading states (`isSubmitting`, `isEditing`, `isSaving`) to prevent duplicate form submissions and enhance user experience.

---

## 🛠️ Tech Stack

### Frontend
*   **Framework:** [Next.js (App Router)](https://github.com/nestjs/nest)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **HTTP Client:** [Axios (with centralized interceptors and instance setup)](https://axios.rest/nest)

### Backend
*   **Framework:** [NestJS (TypeScript)](https://nestjs.com/)
*   **ORM:** [Prisma ORM](https://www.prisma.io/)
*   **Database:** [PostgreSQL (Hosted on Supabase)](https://www.postgresql.org/)
*   **Authentication:** [Passport JWT](https://www.passportjs.org/) & Bcrypt hashing

---

## 📁 Project Structure

### Backend Layout
```text
src/
├── auth/           # Authentication logic, JWT strategy, and User CRUD
├── course/         # Course management modules for Teachers
├── enrollment/     # Student self-enrollment and course progress tracking
├── prisma/         # Prisma client instance service
└── main.ts         # NestJS application bootstrap entry point
```

### Frontend Layout
```text
src/
├── app/
│   ├── dashboard/
│   │   ├── admin/      # Teacher management panel (Create, Read, Edit, Delete)
│   │   ├── student/    # Course catalog, enrollment, and completion tracking
│   │   └── teacher/    # Course creation and materials management
│   ├── login/          # Unified auth page
│   └── page.tsx        # Public landing page showcasing available courses
└── lib/
    └── axios.ts        # Axios configuration with baseURL instance
```

---

## 📷 Screenshots & Visual Demo

### Public Landing Page
![Landing Page](https://placehold.co/600x400?text=Insert+Landing+Page+Screenshot+Here)

### Login page
![Login Page Layout](./assets/Login%20Page.jpg)

### Admin Panel & Teacher Management
![Admin CRUD](https://placehold.co/600x400?text=Insert+Admin+Panel+Screenshot+Here)

### Teacher Course Dashboard
![Teacher Dashboard](https://placehold.co/600x400?text=Insert+Teacher+Dashboard+Screenshot+Here)

### Student Learning Tracking
![Student Dashboard](https://placehold.co/600x400?text=Insert+Student+Dashboard+Screenshot+Here)

---

## 💻 Getting Started

### Prerequisites
*   Node.js (v18 or higher)
*   NPM or Yarn
*   PostgreSQL Instance (Supabase recommended)

### Backend Installation (`lms-dkv-be`)
1. Clone the repository and navigate to the backend folder.
2. Install dependencies:
```bash
   npm install
```
3. Configure your .env file with your database credentials:
```env
   DATABASE_URL="your_supabase_pooler_url"
   DIRECT_URL="your_supabase_direct_url_port_5432"
   JWT_SECRET="your_secure_jwt_secret"
```
4. Generate Prisma Client and push the schema:
```bash
   npx prisma generate
   npx prisma db push
```
5. Run the development server:
```bash
   npm run start:dev
```

### Frontend Installation (`lms-dkv-fe`)
1. Navigate to the frontend folder.
2. Install dependencies:
```bash
   npm install
```
3. Configure your .env.local file to point to the backend API:
```env
   NEXT_PUBLIC_API_URL="http://localhost:3000"
```
4. Run the development server:
```bash
  # watch mode
   npm run dev
```
5. Open http://localhost:3001 in your browser to view the landing page.

---

## 🔑 List of API Endpoints with Request/Response Format

All API requests must be prefixed with `http://localhost:3000/` or your production backend URL.

### 1. User Authentication (Login)
*   **URL:** `POST /auth/login`
*   **Headers:** `Content-Type: application/json`
*   **Request Body Format:**
```json
{
  "email": "teacher@mail.com",
  "password": "securepassword123"
}
```
- **Success Response Format (201 Created):**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 2,
    "name": "Teacher Name, S.ST",
    "email": "teacher@mail.com",
    "role": "TEACHER"
  }
}
```
### 2. Admin Create Teacher

*   **URL:** POST /auth/register

*   **Headers:** Content-Type: application/json

*   **Request Body Format:**
```json
{
  "name": "New Lecturer, S.ST",
  "email": "lecturer@mail.com",
  "password": "lecturerpassword",
  "role": "TEACHER"
}
```
- **Success Response Format (201 Created):**
```json
{
  "id": 5,
  "name": "New Lecturer, S.ST",
  "email": "lecturer@mail.com",
  "role": "TEACHER",
  "createdAt": "2026-05-18T15:00:00.000Z"
}
```
### 3. Get All Courses (Public Catalogue)

    URL: GET /course

    Headers: None

    Success Response Format (200 OK):

## 🔑 API Endpoints Reference

All API requests must be prefixed with `http://localhost:3000/`. Protected routes require a Bearer Token inside the Authorization header.

### 👥 Authentication & User Management
*   `POST /auth/register` - Create a new user account (Admin can lock role to TEACHER).
*   `POST /auth/login` - Authenticate user and return JWT Access Token.
*   `GET /auth/users` - Fetch all registered users (Used by Admin to filter Teachers).
*   `PATCH /auth/users/:id` - Update user profile credentials (Admin only).
*   `DELETE /auth/users/:id` - Remove user account from system (Admin only).

### 📚 Course Management (Teachers)
*   `GET /course` - Public endpoint to browse all available courses.
*   `POST /course` - Create a new course entry.
*   `GET /course/:id` - Get specific course details with teacher relations.
*   `PATCH /course/:id` - Update course metadata or descriptions.
*   `DELETE /course/:id` - Delete a course and clean associated relations.

### 🎓 Enrollment & Tracking (Students)
*   `POST /enrollment` - Self-enroll into a specific active course.
*   `GET /enrollment/my-classes` - Fetch all courses the current student has joined.
*   `PATCH /enrollment/:id` - Update learning progress status to "COMPLETED".
*   `DELETE /enrollment/:id` - Drop out / unenroll from a course.

---

## 💡 Demo Guide for Team Lead Evaluation

When demonstrating this platform, follow this exact workflow to showcase the robust Full-CRUD functionality:

1.  **Public Layer:** Visit `http://localhost:3001/` to verify the public catalog successfully fetches live courses from the database without requiring authentication.
2.  **Admin Flow:** Log in as Admin -> Create a new Teacher account -> Edit the Teacher's title -> Verify the live updates on the data table.
3.  **Teacher Flow:** Log in using the newly created Teacher credentials -> Create a new DKV/Photography course topic -> Modify the description.
4.  **Student Flow:** Log in as Student -> Browse the catalog -> Click "Ikuti Kelas" -> Click "Selesai Belajar" -> Verify the status instantly transforms into a permanent "Selesai" badge.

---

## 📄 License
This project is developed as part of the Full-Stack Software Engineering curriculum assignment. All rights reserved.

---



  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ pnpm install
```

## Compile and run the project

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Run tests

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ pnpm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

