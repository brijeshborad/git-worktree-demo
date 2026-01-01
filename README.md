# Next.js Git Worktree Demo Project

A professional mock Next.js application designed to demonstrate the power of **Git worktrees** for parallel, conflict-free development on isolated features.

This repository simulates a real-world scenario where two developers work simultaneously on separate modules of a dashboard application:
- **Test One**: A fully interactive User Profile module
- **Test Two**: A feature-rich Task Management (Todo) module

Since each module lives in its own isolated folder (`src/app/test-one` and `src/app/test-two`), changes never overlap — perfect for showcasing clean merges using Git worktrees.

## Features Demonstrated

- Modern Next.js 14+ with App Router, TypeScript, Tailwind CSS, and ESLint
- Client-side interactivity with React hooks
- Polished UI using Tailwind and Lucide icons
- Isolated feature directories to enable conflict-free parallel development
- Realistic dashboard modules that look like production-ready components

### Module 1: User Profile (`/test-one`)
- Editable name and email
- Avatar with initial
- Stats cards (Posts, Followers, Likes)
- Dark mode toggle
- Responsive and modern design

### Module 2: Task Management (`/test-two`)
- Add tasks with priority (Low/Medium/High)
- Mark complete with checkbox (strikethrough effect)
- Delete tasks
- Priority badges with color coding
- Persistence using localStorage
- Clean, empty state handling

## How to Set Up and Run the Demo

### 1. Initial Setup (Main Repository)
```bash
npx create-next-app@latest . --typescript --eslint --tailwind --src-dir --app --import-alias "@/*"
# Accept defaults or choose as preferred

# Install Lucide icons (required for UI)
npm install lucide-react
```

### 2. Update Home Page (`src/app/page.tsx`)
Replace with navigation links:
```tsx
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Next.js Git Worktree Demo</h1>
      <div className="space-x-6">
        <Link href="/test-one" className="px-6 py-3 bg-blue-600 text-white text-lg rounded-lg hover:bg-blue-700">
          User Profile Module
        </Link>
        <Link href="/test-two" className="px-6 py-3 bg-green-600 text-white text-lg rounded-lg hover:bg-green-700">
          Task Management Module
        </Link>
      </div>
    </div>
  );
}
```

### 3. Add the Two Modules

#### `src/app/test-one/page.tsx`
```tsx
'use client';

import { useState } from 'react';
import { User, Mail, Posts, Heart, Moon, Sun } from 'lucide-react';

export default function TestOne() {
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john@example.com');
  const [isEditing, setIsEditing] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // ... (full code from previous message - User Profile component)
}
```

#### `src/app/test-two/page.tsx`
```tsx
'use client';

import { useState, useEffect } from 'react';
import { Trash2, Plus } from 'lucide-react';

// ... (full code from previous message - Task Management component)
```

### 4. Commit Initial State
```bash
git add .
git commit -m "Initial Next.js setup with polished User Profile and Task Management modules"
```

### 5. Demonstrate Git Worktrees

#### Developer 1: Enhance User Profile
```bash
git branch feature/test-one
git worktree add ../test-one-worktree feature/test-one
cd ../test-one-worktree

# Example enhancement: Add a bio field
# Edit src/app/test-one/page.tsx and add a bio section...

git add .
git commit -m "Add bio field and location to user profile"
```

#### Developer 2: Enhance Task Management
```bash
git branch feature/test-two
git worktree add ../test-two-worktree feature/test-two
cd ../test-two-worktree
# Example enhancement: Add "Clear completed" button or filters...

git add .
git commit -m "Add filter tabs and clear completed functionality"
```

### 6. Merge Without Conflicts
```bash
cd ../git-worktree-demo
git checkout main
git merge feature/test-one
git merge feature/test-two
# No merge conflicts! Both features integrate seamlessly.
```

### 7. Run the App
```bash
npm run dev
```
Visit `http://localhost:3000` → Click links to see both enhanced modules working together.

### 8. Cleanup (Optional)
```bash
git worktree remove ../test-one-worktree
git worktree remove ../test-two-worktree
git branch -d feature/test-one feature/test-two