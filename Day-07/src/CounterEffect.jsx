import { useEffect, useState } from "react"

function CounterEffect() {
    const [count, setCount] = useState(0);
    const [name, setName] = useState("");


    //  1: Updates browser tab title when count changes
    useEffect(() => {
        document.title = `Count: ${count}`;
    }, [count]);

    // 2: Runs once when component mounts
    useEffect(() => {
        console.log("Counter component mounted");
    }, []);
    

    //  3: Runs when name changes i.e. depends in [name]
    useEffect(() => {
        console.log("Name changed:", name);
    }, [name]);

    // 4: Timer with cleanup
    useEffect(() => {
        const timer = setInterval(() => {
            console.log("Timer running");
        }, 1000);

        // cleanup
        return () => {
            clearInterval(timer);
        };
    }, []);


    return (
        <>
            <h2>Count: {count}</h2>
            
            <button onClick={() => setCount(prevCount => prevCount + 1)}>Increase</button>       {/* This is preferred but... */}
            <button onClick={()=>{setCount(count-1)}}>Decrease</button>             {/* We can use this too */}
            <button onClick={() => { setCount(0) }}>Reset</button>
            
            <input
                type="text"
                value={name}
                onChange={(e)=>{setName(e.target.value)}}/>

        </>
    )
}

export default CounterEffect