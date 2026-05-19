# Job Finder

A job portal web application for the education sector, connecting schools/colleges with job seekers. Built with Next.js, React, and TypeScript, deployed as a Progressive Web App.

**Live:** https://job-portal-sigma.vercel.app/

## Tech Stack

- **Framework:** Next.js 12 (Pages Router)
- **Language:** TypeScript 4.6
- **UI:** React 18, Tailwind CSS 3
- **Data Fetching:** React Query 3
- **HTTP:** Axios (with JWT interceptors)
- **Forms:** Formik + Yup validation
- **Icons:** Heroicons, Font Awesome 6
- **PWA:** next-pwa (service worker, installable)
- **Backend:** Django REST Framework (Heroku)
- **Deployment:** Vercel

## Features

**For Job Seekers:**
- Browse, search, and filter job listings by subject, level, and location
- View detailed job posts and apply with CV upload
- Manage personal profile and availability status

**For Organizations (Schools/Colleges):**
- Create and manage job posts
- View submitted applications
- Organization profile page

**Platform:**
- JWT-based authentication with email verification
- Role-based access control (Individual vs Organization)
- PWA support (installable, offline-ready)
- Responsive design with mobile bottom navigation
- Paginated listings and social sharing

## Architecture

### System Overview

```
Browser (Next.js PWA)
│
├── Pages ──── Components ──── Tailwind CSS
│
├── Context Layer
│   ├── AlertContext ─── Toast notifications
│   ├── TokenContext ─── JWT persistence (localStorage)
│   ├── AxiosContext ─── Auth + guest HTTP clients
│   └── AuthContext ──── User state + route guards
│
├── API Layer (Axios + React Query)
│   ├── user.api.ts
│   ├── post.api.ts
│   ├── auth.api.ts
│   ├── application.api.ts
│   └── education.api.ts
│
│  HTTPS (Bearer JWT)
▼
Django REST API (Heroku)
├── /user/auth/register/
├── /user/auth/login/
├── /user/auth/get_profile/
├── /post/
├── /post/field/
├── /application/submit/
└── /grade/
```

### Context Provider Hierarchy

Defined in `_app.tsx` — each provider depends on the one above it:

```
AlertProvider
 └─ TokenProvider
     └─ AxiosProvider
         └─ AuthProvider
             └─ QueryClientProvider
                 └─ Layout (Header + BottomNav + Footer)
                     └─ Page
```

### Data Flow

```
User Input ──▶ Formik State ──▶ React Query (useMutation)
                                      │
                                      ▼
                                API Module (Axios)
                                      │
                                      ▼
                                Django REST API
                                      │
                                      ▼
                                React Query Cache ──▶ UI Re-render
```

## Project Structure

```
job-portal/
├── @types/                 # TypeScript declarations
│   ├── user.d.ts           #   User, AuthContextType
│   ├── token.d.ts          #   Token, TokenContextType
│   ├── alert.d.ts          #   Alert, AlertContextType
│   ├── application.d.ts    #   Application
│   ├── axiosContextType.d.ts
│   ├── grade.d.ts
│   └── lesson.d..tsx
│
├── API/                    # REST API service modules
│   ├── http-common.ts      #   Base Axios instance
│   ├── auth.api.ts         #   getCurrentUser
│   ├── user.api.ts         #   Register, login, update, list users
│   ├── post.api.ts         #   CRUD posts, search, fields
│   ├── application.api.ts  #   Submit and list applications
│   └── education.api.ts    #   Grades
│
├── components/
│   ├── account/            #   Profile editing (8 components)
│   ├── alerts/             #   SideAlert
│   ├── buttons/            #   PrimaryButton, WhiteButton, TextButton
│   ├── common/             #   Heading, Spinner, Dropdown, FormErrorMessage
│   ├── icons/              #   Google, ShowHidePassword
│   ├── index/              #   Search widget
│   ├── inputs/             #   TextInput, TextArea, ImageInput, FileInput, Toggles
│   ├── login/              #   TopReview testimonial
│   ├── modals/             #   DialogModal, SuccessModal
│   ├── navigation/         #   Header, BottomNav, Footer, Pagination, TabView
│   ├── post/               #   PostListItem, PostManagerList, ApplicationFormModal
│   ├── staff/              #   ProfileListItem
│   ├── studentServices/    #   NavigationGrid
│   └── svgs/               #   Custom SVG icons
│
├── contexts/               # React Context providers
│   ├── alertContext.tsx
│   ├── tokenContext.tsx
│   ├── axiosContext.tsx
│   └── authContext.tsx
│
├── others/                 # Config and utilities
│   ├── config.ts           #   BASE_URL, APP_NAME, position types
│   └── helpers.ts          #   ucfirst, formatCurrency, smoothScroll
│
├── pages/                  # Next.js routes (see below)
├── styles/globals.css
├── public/
│   ├── manifest.json       #   PWA manifest
│   └── icon.png
├── constants.ts            #   Alert types, route ACLs, pagination
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

## Routes

### Public

| Route | Description |
|---|---|
| `/` | Homepage — hero section, search bar, paginated job list |
| `/search` | Search results with filters |
| `/post/[id]` | Job detail with apply button |
| `/intern` | Internship listings |
| `/admission` | Admission job listings |
| `/training` | Training job listings |
| `/studentServices` | Student services navigation |
| `/org/[id]` | Organization public profile |
| `/profile/[id]` | Public user profile |
| `/about` | About page |
| `/login` | Login |
| `/register` | Registration |
| `/auth/forgotPassword` | Password reset |
| `/auth/verifyEmail` | Email verification callback |

### Auth-Protected

| Route | Description |
|---|---|
| `/account` | Account settings |
| `/profile/me` | Current user profile |
| `/education` | Grades and lessons |
| `/education/[id]` | Grade detail |
| `/verify` | Email verification prompt |

### Organization-Only

| Route | Description |
|---|---|
| `/hire` | Dashboard — create posts + manage existing |
| `/post/create` | Create new job post |
| `/staff/top` | Staff directory |

## API Endpoints

The frontend communicates with a Django REST API at `https://job-post-test.herokuapp.com/`.

| Function | Method | Endpoint | Auth |
|---|---|---|---|
| `registerUser` | POST | `/user/auth/register/` | No |
| `loginUser` | POST | `/user/auth/login/` | No |
| `sendEmailForPasswordReset` | POST | `/user/auth/reset_password/` | No |
| `getCurrentUser` | GET | `/user/auth/get_profile/` | Yes |
| `getUserById` | GET | `/user/:id/` | Yes |
| `getUsers` | GET | `/user/` | Yes |
| `updateUser` | PATCH | `/user/:id/` | Yes |
| `getPosts` | GET | `/post/` | No |
| `getPostById` | GET | `/post/:id/` | No |
| `searchPosts` | GET | `/post/?params` | No |
| `getPostFields` | GET | `/post/field/` | No |
| `createPost` | POST | `/post/` | Yes |
| `deletePost` | DELETE | `/post/:id/` | Yes |
| `createApplication` | POST | `/application/submit/` | Yes |
| `getAllApplications` | GET | `/application/` | Yes |
| `getGrades` | GET | `/grade/` | Yes |

Two Axios instances are used:
- **Authenticated** — includes `Bearer` token, with interceptors for 401/403/500 errors
- **Guest** — no auth header, used for public endpoints

## Authentication

- JWT access tokens stored in `localStorage`
- `TokenProvider` hydrates from storage on mount
- `AxiosProvider` creates authenticated Axios instance with interceptors
- `AuthProvider` fetches current user profile and enforces route guards
- Error interceptors: 401 → redirect to login, 403 → verify account prompt, 500 → server error alert

## Configuration

Key values in `others/config.ts`:

| Constant | Value |
|---|---|
| `BASE_URL` | `https://job-post-test.herokuapp.com/` |
| `APP_URL` | `https://job-portal-sigma.vercel.app/` |
| `APP_NAME` | `Job Finder` |
| `positionTypes` | Primary, Lower Secondary, Higher Secondary |

## Getting Started

```bash
# Clone
git clone https://github.com/SafalFrom2050/job-portal.git
cd job-portal

# Install
npm install

# Dev server (http://localhost:3000)
npm run dev

# Production build
npm run build
npm start

# Lint
npm run lint
```

Requires Node.js 16+ and npm 8+.

## Deployment

Deployed on Vercel. To deploy your own:

1. Fork this repo
2. Connect to Vercel (auto-detects Next.js)
3. Update `BASE_URL` and `APP_URL` in `others/config.ts`
