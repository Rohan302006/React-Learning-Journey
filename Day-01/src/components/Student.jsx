// prps method 1  we call it as object destructuring it is good when number of parameters/props are known and are less.

// function Student({name, course, subject}) {    
//     return (
//         <>
//             <h1>Student Information</h1>

//             <p>Name: {name}</p>
//             <p>Course:{course}</p>
//             <p>Learning: {subject}</p>
//         </>
//     )
// }

function Student(props) {              // Same output as above we call it as a props object method
    return (
        <>
            <h1>Student Information</h1>

            <p>Name: {props.name}</p>
            <p>Course: {props.course}</p>
            <p>Subject: {props.subject}</p>
            <p>School: {props.college}</p>                {/* We can pass any number of props */}
        </>
    )
}

export default Student