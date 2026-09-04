# Day 5 — Forms & Controlled Components

Today I learned how to handle **forms and user input in React** using state and events.

The main focus was understanding **controlled components**, where React state becomes the source of truth for form inputs.

---

## What I Learned

### 1. React Forms

Forms are an important part of almost every real-world application.

Examples include:

* Login forms
* Registration forms
* Search boxes
* Contact forms
* Profile editing
* Checkout forms
* Admin dashboards

React allows us to connect form inputs with component state.

---

## 2. Controlled Components

A controlled component is a form input whose value is controlled by **React state**.

For example:

```jsx
const [name, setName] = useState("");

<input
    value={name}
    onChange={handleChange}
/>
```

Here:

```text
React State
    ↓
value={name}
    ↓
<input>
    ↓
User types
    ↓
onChange
    ↓
event.target.value
    ↓
setName()
    ↓
State updates
    ↓
React re-renders
    ↓
Updated value
```

The state becomes the **source of truth** for the input.

---

## 3. `onChange`

React provides the `onChange` event to detect changes in form inputs.

```jsx
<input
    type="text"
    onChange={handleChange}
/>
```

When the user types something, React calls the event handler.

For example:

```jsx
function handleChange(event) {
    console.log(event.target.value);
}
```

If the user types `Rohan`, the input value changes through the event.

---

## 4. `event.target.value`

For text-based inputs, the current input value can be accessed using:

```jsx
event.target.value
```

For example:

```jsx
function handleChange(event) {
    setName(event.target.value);
}
```

This takes the current value from the input and stores it in React state.

---

## 5. Connecting Input to State

A controlled input usually combines:

```jsx
value={name}
onChange={handleChange}
```

Example:

```jsx
const [name, setName] = useState("");

function handleChange(event) {
    setName(event.target.value);
}

<input
    type="text"
    value={name}
    onChange={handleChange}
/>
```

Now the input and state are connected.

---

## 6. Why `value={name}` Is Important

`onChange` updates the state, but:

```jsx
value={name}
```

tells React what value the input should currently display.

So:

```jsx
value={name}
```

controls the displayed value.

While:

```jsx
onChange={handleChange}
```

controls how the value changes.

Together they create a controlled input.

---

# 📝 Form Submission

### 7. `onSubmit`

A React form can handle submission using:

```jsx
<form onSubmit={handleSubmit}>
```

For example:

```jsx
function handleSubmit(event) {
    event.preventDefault();

    console.log(name);
}
```

This allows React to handle the form submission instead of relying on the browser's default behavior.

---

## 8. `event.preventDefault()`

Normally, submitting an HTML form can trigger the browser's default form-submission behavior.

In React applications, we often want to handle the submission ourselves.

Therefore:

```jsx
event.preventDefault();
```

prevents the browser's default form-submission behavior.

---

# 📋 Multiple Inputs

I learned how to manage multiple form fields using separate pieces of state.

For example:

```jsx
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [course, setCourse] = useState("");
const [year, setYear] = useState("");
```

Each input can then be controlled using its corresponding state.

```text
Name   → name
Email  → email
Course → course
Year   → year
```

This approach works well for learning the fundamentals of React forms.

---

# ☑️ Checkbox Handling

Checkboxes work slightly differently from text inputs.

For a checkbox:

```jsx
<input
    type="checkbox"
    checked={isStudent}
    onChange={handleStudentStatus}
/>
```

The current checkbox state is accessed using:

```jsx
event.target.checked
```

For example:

```jsx
function handleStudentStatus(event) {
    setIsStudent(event.target.checked);
}
```

The value is a boolean:

```text
checked
   ↓
true / false
```

---

# 🔽 Select Dropdowns

I also learned how to create controlled `<select>` elements.

Example:

```jsx
const [course, setCourse] = useState("");
```

```jsx
<select
    value={course}
    onChange={handleCourseSelection}
>
    <option value="">Select Course</option>
    <option value="CSE">CSE</option>
    <option value="IT">IT</option>
    <option value="ENTC">ENTC</option>
    <option value="MECH">MECH</option>
</select>
```

When an option is selected:

```jsx
event.target.value
```

contains the selected option's value.

For example:

```jsx
<option value="CSE">CSE</option>
```

means:

```text
value="CSE"
    ↓
Value stored/received by React

CSE
    ↓
Text displayed to the user
```

---

# 💻 Day 5 Project — Student Registration Form

I created a **Student Registration Form** using controlled components.

The form contains:

* Name
* Email
* Course
* Year
* Student status checkbox
* Submit button

The form uses React state to control all the inputs.

---

# 🧠 Important Concepts

### `onChange={handleChange}`

React should call `handleChange` when the input changes.

```jsx
onChange={handleChange}
```

### `onChange={handleChange()}`

This calls the function immediately while rendering.

Therefore, for an event handler, we normally pass the function itself:

```jsx
onChange={handleChange}
```

---

# 🎯 Key Takeaways

* Forms are a major part of real-world React applications.
* Controlled components use React state as the source of truth.
* `value` controls the displayed value of text inputs.
* `onChange` detects changes to form inputs.
* `event.target.value` gives the current value of text inputs.
* Checkboxes use `checked` and `event.target.checked`.
* `<select>` elements can also be controlled using state.
* `onSubmit` handles form submission.
* `event.preventDefault()` prevents the browser's default form-submission behavior.
* Multiple inputs can be managed using separate state variables.
* `onChange={handleChange}` passes the handler to React.
* `onChange={handleChange()}` executes the function immediately during rendering.
* Form state can be combined with conditional rendering to display submission results.

---

# 🏆 Day 5 Status

* [x] Understand React forms
* [x] Understand controlled components
* [x] Learn `onChange`
* [x] Learn `event.target.value`
* [x] Connect inputs to React state
* [x] Understand `value={state}`
* [x] Understand the controlled-input flow
* [x] Handle form submission with `onSubmit`
* [x] Understand `event.preventDefault()`
* [x] Handle multiple inputs
* [x] Handle text and email inputs
* [x] Handle controlled `<select>`
* [x] Handle controlled checkbox
* [x] Understand `value` vs `checked`
* [x] Build Student Registration Form
* [x] Combine state + forms
* [x] Combine state + conditional rendering