# Day 8 — API Data Fetching with `useEffect`

Today I learned how to use **`useEffect`**** to fetch data from an API** and display that data in a React application.

The main focus was understanding the complete flow:

```
API
 ↓
fetch()
 ↓
Response
 ↓
response.json()
 ↓
State
 ↓
Re-render
 ↓
UI
```

I also learned how to handle **loading states, errors, HTTP errors, and refreshing API data**.

---

## What I Learned

### 1. What Is an API?

An **API (Application Programming Interface)** provides a way for an application to communicate with another system.

An API might provide student data such as:

```json
[
    {
        "id": 1,
        "name": "Rohan",
        "course": "CSE"
    },
    {
        "id": 2,
        "name": "ABC",
        "course": "IT"
    }
]
```

---

## 2. What Is `fetch()`?

JavaScript provides:

```jsx
fetch()
```

to make HTTP requests.

For example:

```jsx
fetch("https://example.com/api/students")
```

`fetch()` is asynchronous because the response may take some time to arrive.

---

## 3. Why API Calls Are Asynchronous

When React requests data from a server, the server may take some time to respond.

Instead of freezing the application:

```text
Start request
     ↓
Continue application
     ↓
Server responds
     ↓
Process response
```

JavaScript can handle this using:

```jsx
async / await
```

or Promises.

---

# Using `useEffect` for API Calls

## 4. Why Use `useEffect`?

A React component can render multiple times.

Therefore, putting an API request directly inside the component body can cause the request to run repeatedly.

### Avoid

```jsx
function StudentList() {

    fetch("API_URL");

    return <h1>Students</h1>;
}
```

API communication is a **side effect**, so we use:

```jsx
useEffect()
```

---

## 5. Basic API Pattern

The basic pattern is:

```jsx
useEffect(() => {

    fetch("API_URL");

}, []);
```

The empty dependency array means the effect has no reactive dependencies and, for this pattern, the request runs after the component initially mounts.

---

# Handling API Responses

## 6. Using `.then()`

`fetch()` returns a Promise.

For example:

```jsx
fetch("API_URL")
    .then(response => response.json())
    .then(data => {
        console.log(data);
    });
```

The flow is:

```text
fetch()
   ↓
HTTP Response
   ↓
response.json()
   ↓
JavaScript data
   ↓
Use the data
```

---

## 7. Using `async/await`

I used `async/await` for the Day 8 challenge.

Example:

```jsx
useEffect(() => {

    async function fetchStudents() {

        const response = await fetch("API_URL");
        const data = await response.json();

        console.log(data);
    }

    fetchStudents();

}, []);
```

The important pattern is that the effect callback itself is not made `async`.

Instead, an async function is defined inside the effect and then called.

---

# Storing API Data in State

## 8. API Data + `useState`

API data needs to be stored in React state.

For example:

```jsx
const [students, setStudents] = useState([]);
```

Initially:

```text
students = []
```

After receiving the API response:

```jsx
setStudents(data);
```

Now the state contains the fetched data.

React then re-renders the component.

---

# Loading State

## 9. Why Loading State Is Needed

An API request may take some time.

Without a loading state, an empty UI could make the user think that there is no data.

So we can use:

```jsx
const [loading, setLoading] = useState(true);
```

While the request is running:

```jsx
{loading && <p>Loading...</p>}
```

After the request finishes:

```jsx
setLoading(false);
```

---

# Error Handling

## 10. Error State

Network requests can fail because of things such as:

* No internet connection
* Invalid URL
* Server problems
* Request failures

So I used:

```jsx
const [error, setError] = useState("");
```

If something fails:

```jsx
setError("Failed to fetch users");
```

This error can then be displayed.

---

## 11. `try...catch...finally`

The API request can be handled using:

```jsx
try {
    // API request
}
catch (error) {
    // Handle error
}
finally {
    // Request finished
}
```

The `finally` block runs whether the request succeeds or fails.

This makes it useful for:

```jsx
setLoading(false);
```

because the request is no longer in progress in either case.

---

# 🌐 HTTP Errors and `response.ok`

## 12. Why Check `response.ok`?

An important JavaScript detail is that `fetch()` does not automatically reject its Promise for normal HTTP errors such as:

```text
404 Not Found
500 Internal Server Error
```

Therefore, we should check:

```jsx
if (!response.ok) {
    throw new Error("Failed to fetch users");
}
```

This allows the error to be handled by `catch`.

---

## 13. Understanding `response`

After:

```jsx
const response = await fetch(url);
```

`response` contains the HTTP **Response object**.

Then:

```jsx
const data = await response.json();
```

reads and parses the response body into usable JavaScript data.

---

#  Day 8 Project — `UserList.jsx`

For the Day 8 challenge, I built a `UserList` component using the public JSONPlaceholder API.

The API used was:

```text
https://jsonplaceholder.typicode.com/users
```

The complete flow is:

```text
Component mounts
        ↓
useEffect
        ↓
fetch()
        ↓
API Response
        ↓
response.json()
        ↓
setUsers(data)
        ↓
State changes
        ↓
React re-renders
        ↓
users.map()
        ↓
UI displays users
```

---

# Displaying API Data

I used `.map()` to display the users:

```jsx
{users.map((user) => (
    <div key={user.id}>
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
    </div>
))}
```

I used:

```jsx
key={user.id}
```

because the API provides a stable unique ID for each user.

---

# 🧠 Three Important API States

A real API-driven UI should handle three main states:

```text
          API Request
              │
        ┌─────┴─────┐
        ↓           ↓
     Success      Failure
        ↓           ↓
      Data        Error
```

While waiting:

```text
Loading
```

So the overall model is:

```text
Request
   ↓
Loading
   ↓
Success OR Error
   ↓
Data UI OR Error UI
```

---

#  Mental Model

If I remember only one thing from Day 8:

```text
        API / SERVER
             ↓
           fetch()
             ↓
      response.json()
             ↓
            data
             ↓
       setState(data)
             ↓
          Re-render
             ↓
             UI
```

And while waiting:

```text
       Request
          ↓
       Loading
       ↙     ↘
  Success   Error
     ↓         ↓
   Data     Error UI
```

---

# &#x20;Key Takeaways

* An API allows applications to communicate with another system.
* `fetch()` is used to make HTTP requests.
* API requests are asynchronous.
* API communication is a side effect.
* `useEffect` can be used to perform the initial API request.
* `async/await` makes asynchronous API code easier to read.
* `response` is a `Response` object.
* `response.json()` parses the response body into JavaScript data.
* API data can be stored using React state.
* Loading state tells the UI that the request is still in progress.
* Error state allows failed requests to be communicated to the user.
* `response.ok` should be checked for HTTP errors such as 404 and 500.
* `try...catch...finally` provides a useful structure for API requests.
* `.map()` can be used to render fetched data.
* Stable IDs should be used as React keys.
* The same fetching function can be reused for a refresh action.

---

# Day 8 Status

* [X] Understand what an API is
* [X] Understand `fetch()`
* [X] Understand asynchronous API requests
* [X] Understand why API calls are side effects
* [X] Use `useEffect` for API fetching
* [X] Use `async/await`
* [X] Understand `response`
* [X] Understand `response.json()`
* [X] Store API data in state
* [X] Implement loading state
* [X] Implement error state
* [X] Use `try...catch`
* [X] Use `finally`
* [X] Understand `response.ok`
* [X] Handle HTTP errors
* [X] Render API data using `.map()`
* [X] Use stable API IDs as React keys
* [X] Build `UserList.jsx`
* [X] Add Refresh Users functionality
