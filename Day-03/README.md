# Day 3 — State, useState & Functional Updates

Today I learned the fundamentals of **state management in React** using the `useState` Hook.

The focus was understanding how state changes affect the UI, how React handles state updates, and why functional state updates are important when the next state depends on the previous state.

---

##  What I Learned

### 1. React State

State is data managed by a React component that can change over time.

When state changes through its setter function, React schedules an update and renders the component with the new state.

```text
State
  ↓
State Update
  ↓
React
  ↓
Re-render
  ↓
Updated UI
```

---

## 2. `useState()`

`useState` is a React Hook used to add state to a functional component.

```jsx
const [count, setCount] = useState(0);
```

It returns an array containing:

```text
[
  currentState,
  stateUpdaterFunction
]
```

So:

```text
count     → current state value
setCount  → function used to update the state
```

---

## 3. Updating State

Instead of directly changing a state variable:

```jsx
count++;
```

React state should be updated using its setter:

```jsx
setCount(count + 1);
```

or, when the new state depends on the previous state:

```jsx
setCount(prevCount => prevCount + 1);
```

Using the setter allows React to process the state update and update the UI.

---

## 4. Functional State Updates

I learned that when the next state depends on the previous state, the **functional updater form** is useful.

```jsx
setCount(prevCount => prevCount + 1);
```

Here, React provides the appropriate previous state value to the updater function.

For example:

```jsx
setCount(prevCount => prevCount + 5);
```

This means:

> Take the latest state value and calculate the next state by adding 5.

### Important Rule

> **When the new state depends on the previous state, prefer the functional updater form.**

---

## 5. State Batching

React can batch multiple state updates together instead of rendering after every individual setter call.

For example:

```jsx
setCount(count + 1);
setCount(count + 1);
setCount(count + 1);
```

These updates use the `count` value from the current render.

If:

```text
count = 1
```

all three updates can effectively request:

```text
setCount(2)
setCount(2)
setCount(2)
```

resulting in:

```text
1 → 2
```

With functional updates:

```jsx
setCount(prev => prev + 1);
setCount(prev => prev + 1);
setCount(prev => prev + 1);
```

the updates can build on one another:

```text
1
↓
2
↓
3
↓
4
```

This is why functional updates are important when multiple updates depend on previous state.

---

# 💻 Day 3 Project — Counter

I created a reusable `Counter` component using `useState`.

The counter supports:

* Increase by 1
* Decrease by 1
* Increase by 5
* Decrease by 5
* Reset to 0
      

---

## 🔄 Props vs State

Props are passed into a component by its parent.

State is managed by the component and can change over time.

---

## 🎯 Key Takeaways

* `useState` allows functional components to manage state.
* `useState(initialValue)` returns the current state and a setter function.
* State should be updated using its setter function.
* Directly modifying state variables is not the React state-update mechanism.
* Calling a state setter schedules an update and can cause a re-render.
* State is a snapshot associated with a particular render.
* React can batch multiple state updates.
* Functional updates are useful when the next state depends on the previous state.
* Props are received from a parent, while state is managed by the component.

---

## 🏆 Day 3 Status

* [x] Understand React state
* [x] Learn `useState`
* [x] Understand state variables and setter functions
* [x] Update state through events
* [x] Understand re-rendering
* [x] Understand state snapshots
* [x] Learn functional state updates
* [x] Understand state batching
* [x] Understand Props vs State
* [x] Build a Counter component
* [x] Practice multiple state updates
* [x] Complete Day 3 challenge
* [x] Complete Day 3 quiz
