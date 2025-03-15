---
title: React
image: /images/technologies/react.png
updated: 2024-03-15
description: React is a JavaScript library for building user interfaces.
tags:
  - React
  - JavaScript
  - Frontend
---

# React Features
> From React 16 to the latest release

React's main features in each release are listed below. Click on each version title to see the features.

<details open><summary><h2>React 19</h2></summary>

### Server Components – A Major Update
React 19 brings a significant update to Server Components, improving performance and reducing bundle size.

### New Directives: 'use client' and 'use server'
These directives define whether components run on the client or server.

### Actions: Enhancing Form Handling and State Management
A new way to manage form interactions efficiently.

### New Hook: `useActionState`
Allows handling form state updates easily.

### New Hook: `useFormStatus`
Provides form status information within components.

### New Hook: `useOptimistic`
Helps create a better UI experience by providing optimistic updates.

### New API: `use`
Enables seamless async data fetching.

### Server Components
- Enhancements to Server Components for better performance.
- Server Actions to enable easy data mutations.

### Improvements in React 19
- Ref as a Prop
- Diffs for Hydration Errors
- Context as a Provider
- Cleanup Functions for Refs
- Support for Document Metadata
- Support for Stylesheets
- Support for Async Scripts
- Support for Preloading Resources

</details>

---

<details><summary><h2>React 18</h2></summary>

### Concurrent Rendering
Enables React to prepare multiple UI updates at the same time.

### `useTransition` Hook
Allows for managing transitions without blocking the UI.

### `useDeferredValue` Hook
Defer updating parts of the UI for smoother rendering.

### Automatic Batching
Batching state updates for better performance.

### Streaming Server Rendering with Suspense
Improves SSR performance by streaming HTML while loading data.

</details>

---

<details><summary><h2>React 17</h2></summary>

### No New Features, Just Improvements
React 17 focused on improving the existing architecture rather than introducing new features.

### Improved Event Delegation
Events are now attached to the root rather than `document`.

### Gradual Upgrades
Better compatibility with older versions of React.

### JSX Transform Update
Allows using JSX without explicitly importing React.

</details>

---

<details><summary><h2>React 16</h2></summary>

### React Hooks
Introduced hooks like `useState`, `useEffect`, and `useContext`.

### Suspense & Lazy Loading
Improves code-splitting with `React.lazy` and `Suspense`.

### Error Boundaries
Catch JavaScript errors in component trees.

### Fiber Architecture
New core algorithm improving performance.

</details>
