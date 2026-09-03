# Day 4 — Conditional Rendering & Lists

Today I learned how to make React UIs **dynamic** using conditional rendering and lists.

The focus was understanding how React uses JavaScript conditions to decide what UI should appear and how `.map()` can be used to render components dynamically from arrays.

---

## What I Learned

### 1. Conditional Rendering

Conditional rendering means:

> **Render different UI depending on a condition.**

React uses normal JavaScript logic to decide which UI should be displayed.

For example:

```jsx
if (isLoggedIn) {
    return <h1>Welcome back!</h1>;
}

return <h1>Please login</h1>;
```

The important point is that an `if` statement is written **outside the JSX return**.

---

## 2. Ternary Operator

The ternary operator is useful when there are **two possible UI outcomes**.

```jsx
{isLoggedIn ? <h1>Dashboard</h1> : <h1>Login</h1>}
```

The basic syntax is:

```text
condition ? valueIfTrue : valueIfFalse
```

---

## 3. Conditional Rendering With `&&`

The `&&` operator is useful when something should be rendered **only when a condition is true**.

```jsx
{isStudent && <p>You are a student</p>}
```

For example:

```text
isStudent = true
      ↓
Render the element

isStudent = false
      ↓
Don't render the element
```

---

# 📋 Rendering Lists

### 4. `.map()` in React

I learned how to use JavaScript's `.map()` method to dynamically generate JSX from an array.

For example:

```jsx
const students = ["Rohan", "ABC", "XYZ"];

function StudentList() {
    return (
        <>
            {students.map(student => (
                <p>{student}</p>
            ))}
        </>
    );
}
```

Instead of manually creating every element, `.map()` generates the UI for each item in the array.

The flow is:

```text
students array
      ↓
    .map()
      ↓
 each student
      ↓
 create JSX
      ↓
 React renders the list
```

---

## 5. Rendering Lists of Objects

Real applications usually work with arrays containing objects.

```jsx
const students = [
    {
        id: 1,
        name: "Rohan",
        course: "CSE"
    },
    {
        id: 2,
        name: "ABC",
        course: "IT"
    },
    {
        id: 3,
        name: "XYZ",
        course: "MECH"
    }
];
```

These objects can be converted into components using `.map()`.

```jsx
{students.map(student => (
    <div>
        <h2>{student.name}</h2>
        <p>Course: {student.course}</p>
    </div>
))}
```

---

## 6. React `key`

When rendering lists, React needs a `key` for each item.

```jsx
{students.map(student => (
    <div key={student.id}>
        <h2>{student.name}</h2>
    </div>
))}
```

A `key` helps React identify which list item corresponds to which rendered element across renders.

This allows React to understand what changed when the list is updated.

---

## 7. Choosing a Good Key

The best choice is usually a **stable unique ID** from the data.

```jsx
key={student.id}
```

For example:

```jsx
{
    id: 101,
    name: "Rohan"
}
```

Then:

```jsx
<div key={student.id}>
```

is a good choice.

### Important Rule

> **The key should identify the item, not simply its position. That's why we avoid Array or List index and prefer the key.**

---

## 8. `key` vs Normal Props

I also learned that `key` is a **special React attribute**.

For example:

```jsx
<Student key={student.id} />
```

The `key` is used by React and is **not automatically available inside the component as a normal prop**.

If the component also needs the ID, it must be passed separately:

```jsx
<Student
    key={student.id}
    id={student.id}
    name={student.name}
/>
```

Then:

```jsx
function Student({ id, name }) {
    console.log(id);
}
```

Here:

```text
key → Used by React
id  → Normal prop accessible inside the component
```

---

# 💻 Day 4 Project — Student List

I created a dynamic student list using:

* `.map()`
* React `key`
* Props
* Conditional rendering
* Reusable components

---

## 🧩 Components Created

### `StudentList.jsx`

The `StudentList` component stores the student data and uses `.map()` to generate a `StudentCard` for every student.

### `StudentCard.jsx`

The `StudentCard` receives student information through props and uses conditional rendering for the student's status.

### `Result.jsx`

I also created a small practice component to reinforce ternary-based conditional rendering.

---

# 🎯 Key Takeaways

* Conditional rendering allows React to display different UI based on conditions.
* `if` statements can be used before the JSX return.
* The ternary operator is useful when there are two possible UI outcomes.
* `&&` is useful when an element should render only when a condition is true.
* `.map()` allows arrays to be converted into dynamically generated JSX.
* React lists can be generated from arrays of objects.
* Every dynamically rendered list item should have an appropriate `key`.
* Stable unique IDs are generally better keys than array indexes.
* `key` is a special React attribute and is not available as a normal prop.
* Normal props can be accessed inside child components.
* Components, props, `.map()`, keys, and conditional rendering can be combined to create dynamic UIs.

---

# 🏆 Day 4 Status

* [X] Understand conditional rendering
* [X] Use `if` statements with React
* [X] Learn ternary operator in JSX
* [X] Learn `&&` rendering
* [X] Understand when to use ternary vs `&&`
* [X] Learn `.map()` for rendering lists
* [X] Render components from arrays
* [X] Render data from arrays of objects
* [X] Understand React `key`
* [X] Understand stable IDs vs array indexes
* [X] Understand `key` vs normal props
* [X] Pass mapped data through props
* [X] Build `StudentList`
* [X] Build reusable `StudentCard`
* [X] Practice conditional rendering with `Result`
