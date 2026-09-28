# Booko

> A quiet social media website for sharing ideas, following readers, and having conversations.

Booko is a full-stack social platform built as part of **The Odin Project**. It combines authentication, posts, comments, voting, profiles, and a follower system into a small social reading room.

The project is built with **Next.js and TypeScript**, with **PostgreSQL and Prisma** handling persistent data.

## Features

* 🔐 **Authentication**

  * User registration and login
  * Password hashing with bcrypt
  * JWT-based sessions stored in HTTP-only cookies
  * Logout functionality

* ✍️ **Posts**

  * Create posts
  * Edit your own posts
  * Delete your own posts
  * View individual posts
  * Browse the latest posts

* 💬 **Comments**

  * Comment on posts
  * View comments on individual posts
  * Comments are associated with their authors and posts

* ⬆️ **Voting**

  * Upvote and downvote posts
  * One vote per user per post
  * Switching/removing votes is supported

* 👥 **Following**

  * Browse other readers
  * Follow and unfollow users
  * View posts from people you follow

* 👤 **Profiles**

  * View user profiles
  * See a user's posts and comments
  * Edit your own username and email
  * View follower and post information

* 🎨 **UI**

  * Responsive interface
  * Light and dark themes
  * Loading states and skeletons
  * Accessible form controls and navigation
  * shadcn-style UI components

* 🧪 **Testing**

  * Unit tests for application logic
  * Component/UI tests with React Testing Library
  * Vitest-powered test suite
  * Mocked server actions and authentication where appropriate

## Tech Stack

### Frontend

* **Next.js**
* **React**
* **TypeScript**
* **Tailwind CSS**
* **shadcn/ui**
* **Lucide React**

### Backend

* **Next.js Server Actions**
* **Prisma ORM**
* **PostgreSQL**
* **JWT**
* **bcrypt**

### Validation & Testing

* **Zod**
* **Vitest**
* **React Testing Library**
* **Testing Library User Event**

## Architecture

Booko uses a feature-oriented project structure rather than putting all application logic into a collection of generic components and utilities.

```text
app/
├── (app)/              # Authenticated application routes
├── (auth)/             # Authentication routes
└── globals.css

components/
├── ui/                 # Reusable UI primitives
└── *.tsx               # Shared application components

features/
├── auth/
│   ├── login/
│   └── sign-up/
├── home/
├── post/
├── profile/
└── users/

lib/
├── auth/
│   ├── password.ts
│   └── session.ts
├── generated/
├── prisma.ts
└── utils.ts

prisma/
├── migrations/
└── schema.prisma

tests/
└── unit/
    ├── logic/
    └── ui/
```

Each major domain has its own **actions, queries, components, and types**, keeping application logic close to the feature that uses it.

For example:

```text
features/post/
├── actions.ts
├── components/
├── queries.ts
└── types.ts
```

This keeps database operations, server actions, UI components, and domain types separated without scattering a feature across the entire application.

## Data Model

The database is built around five main concepts:

```text
User
 ├── Posts
 ├── Comments
 ├── Votes
 ├── Following
 └── Followers

Post
 ├── Author
 ├── Comments
 └── Votes

Comment
 ├── Author
 └── Post

Vote
 ├── User
 └── Post

Follow
 ├── Follower
 └── Following
```

The Prisma schema uses PostgreSQL and defines cascading relationships for dependent records. Votes are also uniquely constrained per user/post pair, while follows use a composite primary key consisting of the follower and following IDs.

## Authentication

Booko implements its own authentication flow rather than relying on a third-party authentication framework.

Passwords are hashed with **bcrypt** before being stored.

After authentication, Booko creates a signed JWT containing the user's identity and stores it in an HTTP-only `session` cookie. Sessions expire after one hour and use `SameSite=Lax`; secure cookies are enabled in production.

Form inputs are validated using **Zod** before authentication or database operations are performed.

## Server Actions

Mutations such as creating posts, editing posts, commenting, voting, following users, and authentication are implemented using Next.js Server Actions.

For example, creating a post follows roughly this flow:

```text
Form
  ↓
Server Action
  ↓
Zod validation
  ↓
Session verification
  ↓
Prisma query
  ↓
Database
  ↓
Redirect / response
```

This keeps sensitive database and authentication logic on the server.

## Testing

The project contains both logic and UI tests:

```text
tests/
└── unit/
    ├── logic/
    │   ├── create-post.test.ts
    │   ├── login.test.ts
    │   ├── post.test.ts
    │   └── signup.test.ts
    │
    └── ui/
        ├── create-post.test.tsx
        ├── feed.test.tsx
        ├── login.test.tsx
        ├── navbar.test.tsx
        ├── pill-links.test.tsx
        ├── post-detail.test.tsx
        ├── post-edit-form.test.tsx
        ├── post.test.tsx
        ├── signup.test.tsx
        └── users-page.test.tsx
```

UI tests use React Testing Library and `user-event`, while Vitest is used as the test runner.

## Getting Started

### Prerequisites

You'll need:

* Node.js
* npm
* PostgreSQL

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd <your-repository>
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure the database

Create a PostgreSQL database and add its connection string to your environment:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
```

Booko expects `DATABASE_URL` to be available when initializing Prisma.

### 4. Run database migrations

```bash
npx prisma migrate dev
```

### 5. Start the development server

```bash
npm run dev
```

Then open:

```text
http://localhost:3000
```

## Project Goals

The project was built to practice building a complete full-stack application rather than just implementing isolated frontend features.

Some of the main areas explored were:

* Next.js App Router
* Server and Client Components
* Server Actions
* Authentication and sessions
* Password hashing
* PostgreSQL database design
* Prisma ORM
* Relational data modelling
* Form validation
* Feature-oriented architecture
* UI component design
* Unit and component testing
* Database migrations
* Access control and authenticated routes

## Status

Booko is an ongoing project built while progressing through **The Odin Project**.

The core social functionality is implemented, including authentication, posts, comments, voting, profiles, following, and a personalized following feed.

## License

This project is for learning and portfolio purposes.
