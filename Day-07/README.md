# Day 7 — useEffect & Component Lifecycle

Today I learned about **side effects in React**, the `useEffect` Hook, dependency arrays, and the basic lifecycle of a React component.

The focus was understanding **when `useEffect` runs**, why it is needed, and how React handles operations that happen outside the normal rendering process.

---

## What I Learned

### 1. What Is a Side Effect?

A **side effect** is an operation that happens because of rendering or a state/prop change but is not simply calculating the UI.

Examples include:

* Fetching data from an API
* Updating the document title
* Setting up a timer
* Adding event listeners
* Working with browser APIs
* Synchronizing React state with an external system

For example:

```jsx
document.title = "Student Dashboard";
```

This changes something outside the React component itself.

---

# ⭐ 2. `useEffect`

`useEffect` is a React Hook used to perform side effects in a component.

It is imported from React:

```jsx
import { useEffect } from "react";
```

Basic syntax:

```jsx
useEffect(() => {
    // side effect
});
```

The function inside `useEffect` is called the **effect function**.

---

## 3. Why Do We Need `useEffect`?

React rendering should primarily describe **what the UI should look like**.

Side effects often need to happen separately from that rendering process.

For example:

```jsx
useEffect(() => {
    document.title = "Student Dashboard";
});
```

Here React renders the UI, and the effect performs an operation involving the browser document.

A simple mental model is:

```text
Render UI
   ↓
React commits the update
   ↓
Effect runs
   ↓
External system is synchronized
```

---

# 4. `useEffect` Without a Dependency Array

If no dependency array is provided:

```jsx
useEffect(() => {
    console.log("Effect ran");
});
```

the effect runs after **every render**.

For example:

```text
Initial render
     ↓
Effect runs

State changes
     ↓
Re-render
     ↓
Effect runs

State changes again
     ↓
Re-render
     ↓
Effect runs again
```

Therefore, an effect without dependencies can run frequently.

---

# 5. Empty Dependency Array

An empty dependency array looks like:

```jsx
useEffect(() => {
    console.log("Effect ran");
}, []);
```

This tells React that the effect does not depend on any reactive values.

The effect runs after the component's **initial render** and does not re-run simply because the component re-renders.

Mental model:

```text
Component mounts
      ↓
Initial render
      ↓
Effect runs
```

This is commonly useful for one-time setup work.

---

# 6. Dependency Array

The dependency array allows an effect to react to specific values.

```jsx
useEffect(() => {
    console.log("Name changed");
}, [name]);
```

Here the effect depends on `name`.

The basic idea is:

```text
name changes
     ↓
Component re-renders
     ↓
React checks dependency
     ↓
Effect runs
```

If `name` has not changed, the effect does not need to re-run because of that dependency.

---

# 7. Understanding Dependencies

Suppose:

```jsx
const [count, setCount] = useState(0);
```

and:

```jsx
useEffect(() => {
    document.title = `Count: ${count}`;
}, [count]);
```

The effect uses `count`, so `count` is included in the dependency array.

When `count` changes:

```text
count = 0
   ↓
count = 1
   ↓
Re-render
   ↓
Effect runs
   ↓
Document title updates
```

This is an example of synchronizing React state with something outside the component.

---

# 8. `useEffect` and Rendering

One important distinction I learned is that:

> **Rendering and effects are different phases.**

For example:

```jsx
function Counter() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        document.title = `Count: ${count}`;
    }, [count]);

    return (
        <>
            <h1>{count}</h1>

            <button onClick={() => setCount(count + 1)}>
                Increase
            </button>
        </>
    );
}
```

The flow is:

```text
User clicks button
       ↓
setCount()
       ↓
State updates
       ↓
Component re-renders
       ↓
React updates the UI
       ↓
useEffect runs
       ↓
Document title changes
```

---

# 9. Cleanup Function

Some effects create resources or subscriptions that need to be removed later.

For example:

```jsx
useEffect(() => {

    const timer = setInterval(() => {
        console.log("Running...");
    }, 1000);

    return () => {
        clearInterval(timer);
    };

}, []);
```

The function returned from the effect is called the **cleanup function**.

```text
useEffect
   ↓
Setup
   ↓
Something continues running
   ↓
Cleanup
```

Cleanup is important for things such as:

* Timers
* Event listeners
* Subscriptions
* Connections to external systems

---

# 10. Effect Lifecycle

A simplified effect lifecycle is:

```text
Component renders
       ↓
Effect setup runs
       ↓
Dependencies change
       ↓
Previous cleanup runs
       ↓
Effect setup runs again
```

When the component is removed:

```text
Component unmounts
       ↓
Cleanup runs
```

This helps prevent unnecessary subscriptions, timers, or listeners from continuing after they are no longer needed.

---

# 11. `useEffect` with State

`useEffect` becomes especially useful when working with state.

Example:

```jsx
const [count, setCount] = useState(0);

useEffect(() => {
    console.log("Count changed:", count);
}, [count]);
```

Now every time `count` changes, React runs the effect after the render.

This connects the concepts from **Day 3 — `useState`** with today's lesson.

---

# 12. `useEffect` with Props

Effects can also depend on props.

For example:

```jsx
function Student({ name }) {

    useEffect(() => {
        console.log("Student name:", name);
    }, [name]);

    return <h2>{name}</h2>;
}
```

Here the effect runs when the `name` prop changes.

This connects today's lesson with the **props** concepts learned earlier.

---

# 💻 Day 7 Project — Counter with Effect

I practiced `useEffect` by combining it with the Counter application.

The application maintains:

```jsx
const [count, setCount] = useState(0);
```

and uses:

```jsx
useEffect(() => {
    document.title = `Count: ${count}`;
}, [count]);
```

Now whenever the counter changes:

```text
Count changes
     ↓
Component re-renders
     ↓
Effect runs
     ↓
Browser tab title updates
```

This helped me understand why `useEffect` is useful for synchronizing React state with external browser APIs.

---

# 🧠 Important Mental Model

Remember:

```text
          STATE / PROPS
                ↓
             RENDER
                ↓
           UI updates
                ↓
            useEffect
                ↓
       External side effect
```

`useEffect` is **not** used to calculate the JSX itself.

It is mainly used when the component needs to synchronize with something outside React's rendering process.

---

# ⚠️ Important Rules

### Rule 1 — Hooks should be called at the top level

Correct:

```jsx
function App() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        console.log(count);
    }, [count]);
}
```

Avoid calling Hooks inside:

```text
if statements
loops
nested functions
```

Hooks should be called consistently at the top level of the component.

---

### Rule 2 — Don't use `useEffect` for everything

Not every piece of logic needs an effect.

For example, calculating:

```jsx
const total = price * quantity;
```

does not normally require `useEffect`.

It can simply be calculated during rendering.

Use an effect when you need to **synchronize with an external system** or perform a genuine side effect.

---

# 🎯 Key Takeaways

* A side effect is an operation that interacts with something outside the component's normal rendering.
* `useEffect` is a React Hook used to perform side effects.
* Effects run after React commits the rendered update.
* An effect without a dependency array runs after every render.
* An empty dependency array means the effect does not re-run simply because of later renders.
* A dependency array controls when an effect needs to re-run.
* Effects can depend on state or props.
* The cleanup function is used to remove or undo effect-related resources.
* Cleanup is especially useful for timers, subscriptions, and event listeners.
* Rendering and effects are separate phases.
* Not every calculation requires `useEffect`.
* Hooks should be called at the top level of a component.
* `useEffect` can be combined with `useState`, props, and event handling.

---

# 🏆 Day 7 Status

* [x] Understand side effects
* [x] Learn `useEffect`
* [x] Understand why effects are needed
* [x] Learn effect execution
* [x] Understand dependency arrays
* [x] Understand empty dependency arrays
* [x] Understand effects with state
* [x] Understand effects with props
* [x] Learn cleanup functions
* [x] Understand effect lifecycle
* [x] Understand rendering vs effects
* [x] Learn basic Hook rules
* [x] Understand when not to use `useEffect`
* [x] Build Counter with `useEffect`
* [x] Synchronize state with the document title
