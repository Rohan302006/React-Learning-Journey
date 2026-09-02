import { useState } from "react"

function Counter() {

    const [count, setCount] = useState(0);

    function increase() {
        setCount(prevCount => prevCount + 1);
    }

    function decrease() {
        setCount(prevCount => prevCount - 1);
    }

    function increaseByFive() {
        setCount(prevCount => prevCount + 5);
    }

    function decreaseByFive() {
        setCount(prevCount => prevCount - 5);
    }

    function reset() {
        setCount(0);
    }

    return (
        <>
            <h1>Counter</h1>

            <h2>Count: {count}</h2>

            <button onClick={increase}>Increase</button>
            <button onClick={increaseByFive}>Increase + 5</button>
            <button onClick={decrease}>Decrease</button>
            <button onClick={decreaseByFive}>Decrease -5 </button>
            <button onClick={reset}>Reset</button>
        </>
    )
}

export default Counter