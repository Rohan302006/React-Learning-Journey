# Day 9 — API Data & Dynamic UI

Today I learned how to take **API data and make it interactive** by adding search and filtering functionality.

The main focus was understanding **derived data**, how React state controls displayed data, how multiple states work together, and why we should avoid unnecessary state.

The main project was a **User Search application** built using API data from Day 8.

---

## 🎯 What I Learned

### 1. Derived Data

Derived data is data that can be **calculated from existing props or state** instead of being stored separately.

For example:

```jsx
const [users, setUsers] = useState([]);
const [search, setSearch] = useState("");
```

Instead of creating another state:

```jsx
const [filteredUsers, setFilteredUsers] = useState([]);
```

I can calculate it directly:

```jsx
const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase())
);
```

The mental model is:

```text
users + search
      ↓
   filter()
      ↓
filteredUsers
```

`filteredUsers` is derived data.

---

## 2. Why Avoid Unnecessary State?

If `filteredUsers` were also stored in state, I would need to keep three things synchronized:

```text
users
search
filteredUsers
```

This creates unnecessary complexity because `filteredUsers` can already be calculated from `users` and `search`.

The important rule is:

> **If something can be calculated from existing props/state, don't automatically create another state for it.**

---

## 3. Controlled Search Input

I reused the controlled-input concept from Day 5:

```jsx
const [search, setSearch] = useState("");
```

The input is controlled by React state:

```jsx
<input
    type="text"
    value={search}
    onChange={(event) => setSearch(event.target.value)}
    placeholder="Search users..."
/>
```

The flow is:

```text
User types
    ↓
onChange
    ↓
setSearch()
    ↓
React updates state
    ↓
React re-renders
    ↓
filter() runs again
    ↓
Matching users displayed
```

No `useEffect` is required because filtering is a calculation, not a side effect.

---

## 4. Filtering API Data

The main filtering logic was:

```jsx
const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase())
);
```

This uses:

* `.filter()` to create a new array containing matching users
* `.toLowerCase()` for case-insensitive searching
* `.includes()` to check whether the search text exists in the user's name

For example:

```text
"Rohan"
"rohan"
"ROHAN"
```

can all be compared as:

```text
"rohan"
```

---

## 5. Empty Search

When:

```jsx
search = ""
```

every user's name matches because:

```js
"some name".includes("")
```

returns `true`.

Therefore:

```text
Empty search
    ↓
All users displayed
```

No additional `if` statement is required.

---

## 6. No Users Found

I used conditional rendering to handle cases where there are no matching users

this uses conditional rendering concept learned on Day 4.

---

# &#x20;`useEffect` vs Normal Calculation

This was one of the most important concepts of Day 9.

### API Fetching

```jsx
useEffect(() => {
    fetchUsers();
}, []);
```

Fetching data communicates with an external system, so it is a **side effect**.

### Filtering

```jsx
const filteredUsers = users.filter(...);
```

Filtering only calculates data from existing React state, so it is **derived data**.

| Task                     | `useEffect`? |
| ------------------------ | ------------ |
| Fetch API                | ✅ Yes        |
| Set document title       | ✅ Yes        |
| Timer                    | ✅ Yes        |
| Event listener           | ✅ Yes        |
| Filter an array          | ❌ No         |
| Calculate total          | ❌ No         |
| Calculate full name      | ❌ No         |
| Convert data for display | ❌ Usually no |

---

# &#x20;Day 9 Project — `UserSearch.jsx`

I built a `UserSearch` component using the JSONPlaceholder users API.

The component uses four pieces of state:

```jsx
const [users, setUsers] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");
const [search, setSearch] = useState("");
```

The API fetching logic reuses the pattern learned on Day 8:

```text
Component mounts
      ↓
useEffect
      ↓
fetch()
      ↓
API response
      ↓
response.json()
      ↓
setUsers(data)
      ↓
React re-renders
```

Then the search functionality adds:

```text
users + search
      ↓
   filter()
      ↓
filteredUsers
      ↓
   users.map()
      ↓
      UI
```

---

### Important concepts I understood:

* Derived data is calculated from existing state.
* `filteredUsers` does not need its own state.
* `.filter()` returns a new array.
* `.toLowerCase()` enables case-insensitive searching.
* `.includes()` checks whether a string contains specific text.
* Filtering does not require `useEffect`.
* An empty result means `filteredUsers.length === 0`.
* API fetching is a side effect.
* Filtering is a derived calculation.
* Unnecessary state creates more synchronization, code, and opportunities for bugs.

---

#  Day 9 Status

* [x] Understand derived data
* [x] Understand why unnecessary state should be avoided
* [x] Use `filter()`
* [x] Use `toLowerCase()`
* [x] Use `includes()`
* [x] Build a controlled search input
* [x] Filter API data
* [x] Handle empty search
* [x] Handle no results
* [x] Understand `useEffect` vs normal calculations
* [x] Build `UserSearch.jsx`
* [x] Add Refresh Users functionality
* [x] Understand the complete React data flow
