# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start Vite dev server with HMR
npm run build     # TypeScript compile (tsc -b) then Vite production build
npm run lint      # Run ESLint
npm run preview   # Preview production build locally
```

There is no test suite configured.

## Architecture

This is a single-page React + TypeScript habit tracker that persists data entirely in `localStorage`.

**Data layer** — `src/lib/storage.ts` reads and writes two keys (`ht:habits`, `ht:completions`). `src/lib/streak.ts` computes the current streak by walking backward from today through completion records. `src/lib/date.ts` provides date helpers using `YYYY-MM-DD` string keys.

**State** — `src/hooks/useHabits.ts` is the single source of truth. It holds `habits` and `completions` in `useState`, persists them via `useEffect`, and exposes a memoized `habitsWithStatus` array (type `HabitWithStatus`) that enriches each habit with `completedToday` and `streak`. All mutations (add, delete, toggle) go through this hook.

**Component tree:**
```
App
└── Dashboard          ← progress bar + wires AddHabitForm and HabitList
    ├── AddHabitForm   ← controlled input, calls addHabit
    └── HabitList
        └── HabitCard  ← checkbox, name, delete; renders StreakBadge
            └── StreakBadge  ← flame icon, color-coded: gray=0, amber=1–6, green=7+
```

**Types** are in `src/types/habit.ts`: `Habit`, `CompletionRecord`, `HabitWithStatus`.

## Tech Stack

- React 19 / TypeScript 6 / Vite 8
- Tailwind CSS 4 (via `@tailwindcss/vite` plugin — no `tailwind.config.js`)
- ESLint 10 flat config (`eslint.config.js`)
- TypeScript strict mode: `noUnusedLocals`, `noUnusedParameters` are enforced

## Git Workflow

After completing any meaningful change (new feature, bug fix, refactor, config update), commit and push to GitHub:

1. Stage the relevant files (prefer explicit file names over `git add .`)
2. Write a clear, imperative commit message describing *what* and *why*
3. Push to `origin main`

Always push after committing so the remote is up to date. Do not batch unrelated changes into a single commit.
