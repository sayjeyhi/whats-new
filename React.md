```
title: React
image: /images/technologies/React.png
updated: 2024-03-16
description: React is a JavaScript library for building user interfaces.
tags:
  - React
  - JavaScript
  - Frontend
```

# React Features
> From React 16 to the latest release

React's main features in each release are listed below. Click on each version title to see the features.

<details open><summary><h2>React 19</h2></summary>

### Server Components – A Major Update
React 19 brings a significant update to Server Components, improving performance and reducing bundle size.

```jsx
// Server Component (runs on the server)
// This component fetches data on the server and renders HTML
export default async function ServerComponent() {
  const data = await fetchSomeData();
  return <div>{data.map(item => <p key={item.id}>{item.name}</p>)}</div>;
}
```

### New Directives: 'use client' and 'use server'
These directives define whether components run on the client or server.

```jsx
'use client';

// This component runs on the client
export default function ClientComponent() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>Count: {count}</button>;
}
```

### Actions: Enhancing Form Handling and State Management
A new way to manage form interactions efficiently.

```jsx
'use server';

// Server action to handle form submission
export async function submitForm(formData) {
  const name = formData.get('name');
  const email = formData.get('email');
  await saveToDatabase({ name, email });
  return { success: true };
}
```

### New Hook: `useActionState`
Allows handling form state updates easily.

```jsx
'use client';

function ContactForm() {
  const [state, formAction] = useActionState(submitForm, { success: false });
  
  return (
    <form action={formAction}>
      <input name="name" required />
      <input name="email" type="email" required />
      <button type="submit">Submit</button>
      {state.success && <p>Thank you!</p>}
    </form>
  );
}
```

### New Hook: `useFormStatus`
Provides form status information within components.

```jsx
'use client';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button disabled={pending}>
      {pending ? 'Submitting...' : 'Submit'}
    </button>
  );
}
```

### New Hook: `useOptimistic`
Helps create a better UI experience by providing optimistic updates.

```jsx
'use client';

function CommentList({ comments }) {
  const [optimisticComments, addOptimisticComment] = useOptimistic(
    comments,
    (state, newComment) => [...state, newComment]
  );
  
  async function handleAddComment(formData) {
    const newComment = { id: Date.now(), text: formData.get('text') };
    addOptimisticComment(newComment);
    await submitComment(formData);
  }
  
  return (
    <>
      <form action={handleAddComment}>
        <input name="text" />
        <button type="submit">Add Comment</button>
      </form>
      <ul>
        {optimisticComments.map(comment => (
          <li key={comment.id}>{comment.text}</li>
        ))}
      </ul>
    </>
  );
}
```

### New API: `use`
Enables seamless async data fetching.

```jsx
'use client';

function UserProfile({ userPromise }) {
  const user = use(userPromise);
  return <div>Hello, {user.name}!</div>;
}
```

### Server Components
- Enhancements to Server Components for better performance.
- Server Actions to enable easy data mutations.

```jsx
// DataFetcher.js (Server Component)
export default async function DataFetcher() {
  const data = await fetch('https://api.example.com/data').then(r => r.json());
  return <DataDisplay data={data} />;
}

// DataDisplay.js (Client Component)
'use client';
export default function DataDisplay({ data }) {
  return <div>{JSON.stringify(data)}</div>;
}
```

### Improvements in React 19
- Ref as a Prop
- Diffs for Hydration Errors
- Context as a Provider
- Cleanup Functions for Refs
- Support for Document Metadata
- Support for Stylesheets
- Support for Async Scripts
- Support for Preloading Resources

```jsx
// Ref as a prop example
function ParentComponent() {
  const buttonRef = useRef(null);
  return <ChildComponent ref={buttonRef} />;
}

// Context as a provider
const ThemeContext = createContext('light');
function App() {
  return (
    <ThemeContext.Provider>
      <Layout />
    </ThemeContext.Provider>
  );
}
```

</details>

```

<details><summary><h2>React 18</h2></summary>

### Concurrent Rendering
Enables React to prepare multiple UI updates at the same time.

```jsx
function App() {
  const [showDetails, setShowDetails] = useState(false);
  
  // This will start working on the update but won't block the UI
  return (
    <div>
      <button onClick={() => setShowDetails(true)}>Show Details</button>
      {showDetails && <ExpensiveComponent />}
    </div>
  );
}
```

### `useTransition` Hook
Allows for managing transitions without blocking the UI.

```jsx
function SearchResults() {
  const [isPending, startTransition] = useTransition();
  const [searchQuery, setSearchQuery] = useState('');
  
  function handleChange(e) {
    // Urgent update: Show what's being typed
    setSearchQuery(e.target.value);
    
    // Mark non-urgent update inside startTransition
    startTransition(() => {
      // This update can be interrupted
      setSearchResults(computeSearchResults(e.target.value));
    });
  }
  
  return (
    <>
      <input value={searchQuery} onChange={handleChange} />
      {isPending ? <Spinner /> : <ResultsList results={searchResults} />}
    </>
  );
}
```

### `useDeferredValue` Hook
Defer updating parts of the UI for smoother rendering.

```jsx
function SearchPage() {
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);
  
  return (
    <>
      <input value={query} onChange={e => setQuery(e.target.value)} />
      <SearchResults query={deferredQuery} />
    </>
  );
}
```

### Automatic Batching
Batching state updates for better performance.

```jsx
function handleClick() {
  // In React 18, these are automatically batched into a single re-render
  setCount(c => c + 1);
  setFlag(f => !f);
  setName('John');
}
```

### Streaming Server Rendering with Suspense
Improves SSR performance by streaming HTML while loading data.

```jsx
// Server component
function App() {
  return (
    <Layout>
      <NavBar />
      <Suspense fallback={<Spinner />}>
        <Comments />
      </Suspense>
    </Layout>
  );
}

// Client component
function Comments() {
  const comments = use(fetchComments());
  return (
    <div>
      {comments.map(comment => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
}
```

</details>

```

<details><summary><h2>React 17</h2></summary>

### No New Features, Just Improvements
React 17 focused on improving the existing architecture rather than introducing new features.

### Improved Event Delegation
Events are now attached to the root rather than `document`.

```jsx
// Before React 17
// Event listeners were attached to document
ReactDOM.render(<App />, rootNode);

// In React 17
// Event listeners are attached to the root DOM container
ReactDOM.render(<App />, rootNode);
```

### Gradual Upgrades
Better compatibility with older versions of React.

```jsx
// React 17 app
const root = document.getElementById('root');
ReactDOM.render(<App />, root);

// React 18 app inside React 17 app
const newRoot = document.getElementById('new-root');
// Can use React 18 features here
ReactDOM.createRoot(newRoot).render(<NewApp />);
```

### JSX Transform Update
Allows using JSX without explicitly importing React.

```jsx
// Before React 17
import React from 'react';

function App() {
  return <h1>Hello World</h1>;
}

// After React 17
// No need to import React when using JSX
function App() {
  return <h1>Hello World</h1>;
}
```

</details>

```

<details><summary><h2>React 16</h2></summary>

### React Hooks
Introduced hooks like `useState`, `useEffect`, and `useContext`.

```jsx
import React, { useState, useEffect } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    document.title = `You clicked ${count} times`;
    
    return () => {
      // Cleanup code
    };
  }, [count]);
  
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

### Suspense & Lazy Loading
Improves code-splitting with `React.lazy` and `Suspense`.

```jsx
import React, { Suspense, lazy } from 'react';

// Lazy load a component
const LazyComponent = lazy(() => import('./LazyComponent'));

function App() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <LazyComponent />
      </Suspense>
    </div>
  );
}
```

### Error Boundaries
Catch JavaScript errors in component trees.

```jsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    logErrorToService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}

// Usage
<ErrorBoundary>
  <MyComponent />
</ErrorBoundary>
```

### Fiber Architecture
New core algorithm improving performance.

```jsx
// Example of how Fiber can pause and resume work
function App() {
  const [items, setItems] = useState([]);
  
  // With Fiber, this large update can be interrupted if needed
  function handleClick() {
    const newItems = [];
    for (let i = 0; i < 10000; i++) {
      newItems.push({ id: i, text: `Item ${i}` });
    }
    setItems(newItems);
  }
  
  return (
    <div>
      <button onClick={handleClick}>Add 10000 items</button>
      <ul>
        {items.map(item => <li key={item.id}>{item.text}</li>)}
      </ul>
    </div>
  );
}
```

</details>
