# 🚀 React Learning Journey — Day 1

## React Fundamentals & Mental Model

**Day 1 of my React learning journey**

Today I focused on understanding the **fundamentals and mental model of React** rather than memorizing syntax.

The goal was to understand how React structures UI using components, JSX, rendering, and the relationship between application data and the UI.

---

## 🎯 What I Learned

### 1. What is React?

React is a JavaScript library for building user interfaces using reusable components.

Instead of treating an application as one large webpage, React encourages us to break the UI into smaller components.

For example:

```text
Application
│
├── Navbar
├── Home
│   ├── Hero
│   └── ProductList
│       ├── ProductCard
│       ├── ProductCard
│       └── ProductCard
└── Footer
```

This component-based approach makes applications easier to organize, reuse, and maintain.

---

### 2. Why React?

Without React, larger applications can require a lot of manual DOM manipulation.

React provides a declarative approach where we describe what the UI should look like based on the current data/state, and React handles the necessary UI updates.

---

### 3. React Components

A component is a **reusable piece of UI and its associated behavior**.

Examples:

* Navbar
* Button
* ProductCard
* LoginForm
* Sidebar
* Footer
* UserProfile

Components can also contain other components, creating a **component tree**.

---

### 4. JSX

JSX stands for **JavaScript XML**.

It is a syntax extension that allows us to describe UI using HTML-like markup inside JavaScript.

---

### Important

JSX is **not HTML**.

It looks similar to HTML but follows JavaScript/JSX rules.

---

### 5. JavaScript Inside JSX

JavaScript expressions can be used inside JSX with `{}`.

```jsx
const name = "Rohan";

function Welcome() {
  return <h1>Hello {name}</h1>;
}
```

The result displayed in the browser is:

```text
Hello Rohan
```

This demonstrates how JavaScript and UI markup work together in JSX.

---

### 6. Rendering

Rendering means React determines what UI should be displayed based on the current component data and state.

An important distinction I learned:

```text
main.jsx     → Application entry point
App          → Main/root application component
<App />      → JSX syntax used to render/use App
```

---

# 💻 Day 1 Practical Implementation

For the practical exercise, I created a `Student` component and rendered it inside the `App` component.

## Student Component

```jsx
function Student() {
  return (
    <>
      <h1>Student Information</h1>
      <p>Name: Rohan</p>
      <p>Course: Computer Science</p>
      <p>Learning: React</p>
    </>
  );
}

export default Student;
```

## App Component

```jsx
import Student from "./components/Student";

function App() {
  return (
    <>
      <Student />
    </>
  );
}

export default App;
```

---

# 🏆 Day 1 Status

* [x] Understand what React is
* [x] Understand why React is useful
* [x] Understand the component-based approach
* [x] Create a functional component
* [x] Understand JSX
* [x] Use JavaScript expressions inside JSX
* [x] Understand rendering
* [x] Understand basic Vite + React structure
* [x] Create and run a React application
* [x] Create and reuse a custom component
* [x] Understand the basic component tree

---