# Day 10 — Reusable Components & Component Composition

Today I learned how to design **reusable React components** and communicate between components using **props, `children`, and function props**.

The main focus was understanding how to avoid repeating UI structures and instead create flexible components that can be reused with different content.

The main project was a reusable **Card component** used by both `StudentCard` and `ProjectCard`.

---

## What I Learned

### 1. Reusable Components

When multiple parts of an application have the same UI structure, we can create a reusable component instead of repeating the same JSX.

For example:

```text
Student Card
Course Card
Project Card
Profile Card
```

Instead of creating separate structures for each one, we can create:

```jsx
function Card({ title, children }) {
    return (
        <div>
            <h2>{title}</h2>
            {children}
        </div>
    );
}
```

The same component can then be reused with different content.

---

## 2. The `children` Prop

One of the most important concepts from Day 10 was the special React prop:

```jsx
children
```

For example:

```jsx
<Card title="Student">
    <p>Name: Rohan</p>
    <p>Course: CSE</p>
</Card>
```

The content between the opening and closing `<Card>` tags becomes the `children` prop.

---

## 3. Normal Props vs `children`

Normal props provide named information:

```jsx
<Student
    name="Rohan"
    course="CSE"
/>
```

The component receives:

```jsx
function Student({ name, course }) {
```

Here:

```text
name   → "Rohan"
course → "CSE"
```

With `children`:

```jsx
<Card title="Student">
    <p>Hello Rohan</p>
</Card>
```

the component receives:

```text
title
children
```

where `children` represents:

```jsx
<p>Hello Rohan</p>
```

---

## 4. Why `children` Makes Components Reusable

A reusable component does not need to know exactly what content it will display.

For example, the same `Card` can contain:

```jsx
<p>Name: Rohan</p>
```

or:

```jsx
<button>View Profile</button>
```

or:

```jsx
<p>Java</p>
<p>React</p>
```

The `Card` provides the common structure while the parent provides the content.

```text
Parent
  │
  ├── Card
  │     └── children
  │
  ├── Card
  │     └── children
  │
  └── Card
        └── children
```

This makes the component flexible and reusable.

---

# 5. Component Composition

Using smaller components together to build a larger UI is called **component composition**.

Instead of creating one large component:

```text
App
 ├── Student logic
 ├── Course logic
 ├── Project logic
 ├── Profile logic
 └── UI
```

we can compose smaller reusable components:

```text
App
 │
 ├── Card
 │    └── Student content
 │
 ├── Card
 │    └── Course content
 │
 └── Card
      └── Project content
```

Each component can have a focused responsibility.

---

# 6. Child → Parent Communication

A parent can pass a function to a child through props.

For example:

```jsx
function App() {

    function handleClick() {
        console.log("Button clicked");
    }

    return (
        <Child onClick={handleClick} />
    );
}
```

The child receives the function:

```jsx
function Child({ onClick }) {
    return (
        <button onClick={onClick}>
            Click Me
        </button>
    );
}
```

The flow is:

```text
Parent
  │
  │ function prop
  ↓
Child
  │
  │ calls function
  ↓
Parent function executes
```

The child does not directly modify the parent.

It calls a function provided by the parent.

---

# 7. Combining `children` + Function Props

These concepts can be combined to create a flexible reusable component.

For example:

```jsx
function Card({ title, children, onAction, actionText }) {
    return (
        <div>
            <h2>{title}</h2>

            {children}

            <button onClick={onAction}>
                {actionText}
            </button>
        </div>
    );
}
```

The component now accepts:

```text
title
children
onAction
actionText
```

So the `Card` controls the common structure and button behavior while the parent provides the content and action.

---

# 💻 Day 10 Project

I built a reusable `Card` component and used it to create:

```text
src/
 ├── components/
 │    ├── Card.jsx
 │    ├── StudentCard.jsx
 │    └── ProjectCard.jsx
 │
 └── App.jsx
```

---

# 8. `Card.jsx`

The reusable Card component accepts:

```text
title
children
onAction
actionText
```

The main structure is:

```jsx
function Card({ title, children, onAction, actionText }) {
    return (
        <div>
            <h2>{title}</h2>

            <div>
                {children}
            </div>

            <button onClick={onAction}>
                {actionText}
            </button>
        </div>
    );
}
```

The important point is that `Card` does not know whether its content is about a student, project, course, or profile.

---

# 9. `StudentCard.jsx`

`StudentCard` reuses the generic `Card` component:

```jsx
<Card
    title="Student"
    actionText="View Profile"
    onAction={handleClick}
>
    <p>Name: Rohan</p>
    <p>Course: CSE</p>
    <p>Year: 3</p>
</Card>
```

When the button is clicked:

```text
StudentCard
     ↓
handleClick()
     ↓
onStudentClick("Rohan")
     ↓
Parent function
     ↓
handleStudent()
```

The student's name is therefore communicated back to the parent through function props.

---

# 10. `ProjectCard.jsx`

The same reusable `Card` is used for the project:

```jsx
<Card
    title="Project"
    actionText="View Project"
    onAction={handleClick}
>
    <p>Name: Campus Issue Reporting Portal</p>
    <p>Technology: React + Node.js</p>
</Card>
```

When the button is clicked:

```text
ProjectCard
     ↓
handleClick()
     ↓
onProjectClick("Campus Issue Reporting Portal")
     ↓
Parent function
     ↓
handleProject()
```

The same `Card` structure is reused with completely different content.

---

# 11. Parent → Child → Parent Flow

The complete communication flow is:

```text
                    App
                     │
             function prop
              ↓            ↓
       StudentCard     ProjectCard
              │            │
              ↓            ↓
             Card          Card
              │            │
           button        button
              │            │
              ↓            ↓
       child calls     child calls
          function        function
              │            │
              └──────┬─────┘
                     ↓
                  App
```

The important principle is:

> **Props carry data, `children` carries nested UI, and functions passed as props allow child to parent communication.**

---

# 12. `onClick={onAction}` vs `onClick={onAction()}`

This distinction is important.

### Correct

```jsx
<button onClick={onAction}>
```

This gives React the function to call when the button is clicked.

### Incorrect for this use case

```jsx
<button onClick={onAction()}>
```

This executes the function immediately during rendering instead of waiting for the click.

So:

```text
onClick={onAction}
        ↓
Give React the function
        ↓
Click happens
        ↓
Function executes
```

---

# Important Mental Model

Today's entire lesson can be summarized as:

```text
              Parent
                 │
        ┌────────┴────────┐
        ↓                 ↓
      props            children
        │                 │
        └────────┬────────┘
                 ↓
              Child
                 │
                 │ function call
                 ↓
              Parent
```

---

# Key Takeaways

* Reusable components reduce repeated UI code.
* `children` is a special React prop.
* Content placed between component tags becomes `children`.
* `children` allows a component to receive flexible UI content.
* Normal props provide named information.
* `children` provides nested content.
* Component composition means combining smaller components to build larger UIs.
* A reusable component should avoid depending on one specific type of content.
* Functions can be passed through props.
* A child can call a function provided by its parent.
* The child does not directly modify the parent's state.
* `onClick={onAction}` passes the function to React.
* `onClick={onAction()}` executes the function immediately.
* The same `Card` component can be reused for students, projects, courses, profiles, and more.

---

# Day 10 Status

* [x] Understand reusable components
* [x] Understand the `children` prop
* [x] Understand normal props vs `children`
* [x] Pass UI into a component
* [x] Reuse the same component with different content
* [x] Understand component composition
* [x] Understand parent → child communication
* [x] Understand child → parent communication
* [x] Pass functions through props
* [x] Understand `onClick={onAction}`
* [x] Understand `onClick={onAction()}`
* [x] Build reusable `Card.jsx`
* [x] Build `StudentCard.jsx`
* [x] Build `ProjectCard.jsx`
* [x] Connect components through function props

---

## 🔑 Principle to Remember

> **Make components responsible for structure and behavior, while allowing their parents to provide the data and content that make them reusable.**
