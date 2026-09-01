# Day 2 — Props, Events & Callbacks

Today I continued my React learning journey by going deeper into **props, event handling, function props, callbacks, and conditional rendering**.

The main focus was understanding how data and functions flow between parent and child components.

---

## 🎯 What I Learned

### 1. Props

Props allow a parent component to pass data to a child component.

```jsx
<ProfileCard
  name="Rohan"
  course="CSE"
  year={3}
  isStudent={true}
/>
```

Props can contain different types of values:

```text
Props
├── name       → string
├── course     → string
├── year       → number
├── isStudent  → boolean
└── onProfileClick → function
```

I also learned that props can be received using **object destructuring**:

```jsx
function ProfileCard({ name, course, year, isStudent }) {
```

---

## 2. Passing Functions as Props

Props are not limited to data. A parent can also pass a function to a child.

```jsx
<ProfileCard
  name="Rohan"
  onProfileClick={handleProfileClick}
/>
```

The child receives the function:

```jsx
function ProfileCard({ name, onProfileClick }) {
```

and can use it in an event handler:

```jsx
<button onClick={onProfileClick}>
  View Profile
</button>
```

This creates the basic communication pattern:

```text
Parent
  │
  │ data + function
  ▼
Child
  │
  │ user interaction
  ▼
Parent's function
```

---

## 3. Event Handling

I learned how React handles user events using event props such as `onClick`.

```jsx
<button onClick={onProfileClick}>
  View Profile
</button>
```

The function should be passed to the event handler rather than called immediately.

---

## 4. Conditional Rendering

I practiced using a boolean prop with the JavaScript ternary operator:

```jsx
<p>
  isStudent: {isStudent ? "Yes" : "No"}
</p>
```

This allows the UI to change depending on the value of a prop.

```text
true  → Yes
false → No
```

---

## 5. Passing Arguments Through Function Props

I learned how a child can call a function received from its parent while passing additional data.

```jsx
<button onClick={() => onProfileClick(name)}>
  View Profile
</button>
```

The parent function receives that value:

```jsx
function handleProfileClick(name) {
  console.log(`${name}'s Profile clicked`);
}
```

This produces:

```text
Rohan → Rohan's Profile clicked
ABC   → ABC's Profile clicked
XYZ   → XYZ's Profile clicked
```

The arrow function is used so that the function is executed **when the button is clicked**, rather than immediately during rendering.

---

## 🎯 Key Takeaways

* Props allow data to flow from parent → child.
* Props can contain strings, numbers, booleans, and functions.
* Object destructuring makes receiving props cleaner.
* React events are handled using event props such as `onClick`.
* Functions can be passed from parent to child as props.
* A child can trigger a function defined in its parent.
* Arrow functions can be used to pass arguments to event handlers.
* Boolean props can be used for conditional rendering.
* The same reusable component can display different data and behavior.

---

## 🏆 Day 2 Status

* [x] Understand props
* [x] Pass different types of props
* [x] Destructure props
* [x] Pass functions as props
* [x] Handle click events
* [x] Use conditional rendering
* [x] Pass arguments through callbacks
* [x] Build a reusable `ProfileCard` component
* [x] Render multiple component instances
* [x] Understand parent → child data flow
* [x] Understand child → parent communication through callbacks
