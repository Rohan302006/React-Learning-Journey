# Day 6 — Lifting State Up & Sharing State

Today I learned how to **share state between multiple React components** using the concept of **lifting state up**.

The focus was understanding where shared state should live, how data flows from parent to child through props, and how child components can update parent-owned state using setters or callback functions.

---

## What I Learned

### 1. The Problem of Sharing State

Consider this component structure:

```text
App
├── StudentForm
└── StudentPreview
```

Suppose `StudentForm` allows the user to enter a student's name and course, while `StudentPreview` needs to display the same information.

If the state is stored only inside `StudentForm`, `StudentPreview` cannot directly access that state because both components are siblings.

The problem is:

```text
StudentForm  ───────→  StudentPreview
```

React's normal data flow does not work directly between sibling components.

---

## 2. React Data Flow

React data normally flows:

```text
Parent
   ↓
Child
```

So instead of trying to send state directly between siblings, the shared state should be moved to their common parent.

```text
             App
            /   \
           ↓     ↓
 StudentForm   StudentPreview
```

The parent owns the state and passes the required data to both children.

---

# ⭐ 3. Lifting State Up

**Lifting state up** means moving state from a child component to the **nearest common parent** when multiple components need access to that state.

For example, instead of:

```jsx
function StudentForm() {
    const [name, setName] = useState("");
}
```

the state can be moved to the parent:

```jsx
function App() {
    const [name, setName] = useState("");

    return (
        <>
            <StudentForm />
            <StudentPreview />
        </>
    );
}
```

Now the parent owns the shared state.

```text
        App
         │
     name state
       /    \
      ↓      ↓
   Form    Preview
```

This is called **lifting state up**.

---

## 4. Why Lift State Up?

The common parent can communicate with both child components.

```text
                 App
              State Owner
               /       \
              ↓         ↓
       StudentForm   StudentPreview
          updates       displays
```

The state has one owner, while multiple components can use the data they need.

---

# 5. Passing State Through Props

Once the state is moved to the parent, it can be passed down through props.

```jsx
function App() {
    const [name, setName] = useState("");

    return (
        <>
            <StudentForm
                name={name}
                setName={setName}
            />

            <StudentPreview
                name={name}
            />
        </>
    );
}
```

The flow becomes:

```text
App
 │
 ├── name + setName ───→ StudentForm
 │
 └── name ─────────────→ StudentPreview
```

---

## 6. Passing the State Setter

The child may need to update state owned by the parent.

For example:

```jsx
function StudentForm({ name, setName }) {

    function handleChange(event) {
        setName(event.target.value);
    }

    return (
        <input
            value={name}
            onChange={handleChange}
        />
    );
}
```

The important idea is:

> **The parent owns the state, but the child can update it through the setter passed as a prop.**

The child does not become the owner of the state.

---

# 7. Complete Data Flow

Suppose the user types:

```text
Rohan
```

The flow is:

```text
User types "Rohan"
        ↓
StudentForm onChange
        ↓
setName("Rohan")
        ↓
Parent state changes
        ↓
Parent re-renders
        ↓
name="Rohan" passed to children
        ↓
StudentPreview receives "Rohan"
        ↓
UI updates
```

The important point is that there is still only **one ****`name`**** state**.

```text
             Parent
                │
          name = "Rohan"
             /       \
            ↓         ↓
       StudentForm  StudentPreview
```

---

# 8. One Source of Truth

**One source of truth** means keeping shared data in one place instead of creating multiple independent copies of the same state.

### ❌ Bad approach

```text
StudentForm
    name = "Rohan"

StudentPreview
    name = "ABC"
```

Now the components can become inconsistent.

### ✅ Better approach

```text
             App
              │
        name = "Rohan"
           /        \
          ↓          ↓
 StudentForm   StudentPreview
```

Both components use the same state.

---

# 9. State vs Props

This connects the concepts learned throughout the previous days.

### Parent

The parent owns the state:

```jsx
const [name, setName] = useState("");
```

Therefore:

```text
name     → state value
setName  → state updater
```

### StudentForm

Receives:

```text
name
setName
```

Therefore, inside `StudentForm`:

```text
name     → prop
setName  → prop
```

### StudentPreview

Receives:

```text
name
```

Therefore:

```text
name → prop
```

The distinction is:

```text
State
  ↓
Owned by a component

Props
  ↓
Received by a component
```

---

# 10. Passing Functions Instead of Setters

Instead of passing the state setter directly:

```jsx
<StudentForm setName={setName} />
```

the parent can pass its own function:

```jsx
function handleNameChange(newName) {
    setName(newName);
}
```

Then:

```jsx
<StudentForm onNameChange={handleNameChange} />
```

The child can call:

```jsx
function StudentForm({ onNameChange }) {

    function handleChange(event) {
        onNameChange(event.target.value);
    }

}
```

The flow becomes:

```text
StudentForm
      ↓
onNameChange("Rohan")
      ↓
Parent function
      ↓
setName("Rohan")
      ↓
Parent state changes
```

This is the same **function-as-prop / callback pattern** learned on Day 2.

---

# 💻 Day 6 Project — Student Dashboard

I built a small `StudentDashboard` application to practice lifting state up.

The component structure is:

```text
StudentDashboard
       │
       ├── StudentForm
       │
       └── StudentPreview
```

The parent component owns the shared student information.

---

# 🧠 Important Mental Model

```text
                STATE
                  │
                  ↓
                Parent
               /      \
              ↓        ↓
          Child A    Child B
          updates    displays
```

Data flows downward:

```text
Parent ─────────→ Child
          props
```

But a child can communicate an action back to the parent through a function:

```text
Parent ─────────→ Child
        function
             │
             ↓
        Child calls it
             │
             ↓
           Parent
```

This keeps React's data flow predictable.

---

#  What Not To Do

Don't create duplicate state when the data is already owned by the parent.

### ❌ Avoid

```jsx
function StudentPreview() {
    const [name, setName] = useState("");
}
```

if the actual `name` is already maintained by `StudentDashboard`.

That would create two separate sources of truth.

### ✅ Instead

```jsx
function StudentPreview({ name }) {
    return <p>Name: {name}</p>;
}
```

The preview simply receives the current value.

---

# 🎯 Key Takeaways

* Sibling components cannot directly share state.
* React data normally flows from parent to child.
* Shared state should be moved to the nearest common parent.
* Moving shared state upward is called **lifting state up**.
* The parent becomes the owner of the shared state.
* State can be passed down through props.
* State setters can also be passed through props.
* Functions can be passed as props to allow children to trigger parent logic.
* One source of truth prevents duplicate and inconsistent state.
* A child can update parent-owned state without owning that state.
* `StudentPreview` should receive data instead of creating duplicate state.
* Lifting state up connects concepts from `useState`, props, callbacks, and controlled forms.

---

# 🔗 Concepts Combined

Day 6 brought together several concepts learned earlier:

```text
Day 2
Functions as Props
      ↓
Day 3
useState
      ↓
Day 5
Controlled Inputs
      ↓
Day 6
Lifting State Up
```

This was an important step toward understanding **React component architecture**.

---

# 🏆 Day 6 Status

* [x] Understand the problem of sharing state
* [x] Understand parent → child data flow
* [x] Learn lifting state up
* [x] Understand the nearest common parent
* [x] Pass state through props
* [x] Pass state setters through props
* [x] Pass functions through props
* [x] Understand one source of truth
* [x] Understand state vs props in shared-state scenarios
* [x] Build `StudentDashboard`
* [x] Build `StudentForm`
* [x] Build `StudentPreview`
* [x] Combine state + controlled inputs
* [x] Combine props + setters + callbacks