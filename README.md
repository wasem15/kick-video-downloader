# Kick Stream Downloader

A React/TypeScript web prototype for exploring a streaming-download workflow around Kick URLs.

The current implementation focuses on the user interface and persistence flow. Stream metadata, progress, and download actions are simulated in the application rather than backed by a complete media-download service.

## What it demonstrates

- React component architecture
- TypeScript application state
- URL input and stream-information workflow
- Download-history UI
- Pause, resume, and cancel states
- Responsive UI components
- Client-side persistence through the project data layer
- Form and UI component composition

## Current workflow

~~~text
Kick URL
   │
   ▼
URL input
   │
   ▼
Simulated stream inspection
   │
   ▼
Stream information
   │
   ▼
Quality selection
   │
   ▼
Download record
   │
   ▼
History / status UI
~~~

## Technology

- React 18
- TypeScript
- Vite
- React Router
- Tailwind CSS
- Radix UI
- Zustand
- TanStack Query
- Fine data layer
- Vitest-ready frontend tooling

## Project structure

~~~text
src/
├── components/       # Reusable UI and domain components
├── hooks/            # React hooks
├── lib/              # Data layer and shared utilities
├── pages/            # Application pages
└── main.tsx          # Application entry point
~~~

The repository also includes SQL migrations for the application data model.

## Getting started

~~~bash
npm install
npm run dev
~~~

Build for production:

~~~bash
npm run build
~~~

Run linting:

~~~bash
npm run lint
~~~

## Important scope note

This repository should be viewed as a **frontend prototype**, not as a finished media-download backend. The main page explicitly uses simulated stream information and simulated download behavior.

That distinction is intentionally documented so the repository accurately represents the implemented work.

## Portfolio context

This is a supporting frontend project demonstrating React/TypeScript UI architecture. The larger full-stack and AI projects are the primary portfolio pieces.
