function StudentCard({ name, course, year, isStudent }) {
    return (
        <>
            <p>Name: {name}</p>
            <p>Course: {course}</p>
            <p>Year: {year}</p>
            <p>Status: {isStudent ? "Student" : "Not a Student"}</p>
            
            <hr />
        </>
    )
}

export default StudentCard