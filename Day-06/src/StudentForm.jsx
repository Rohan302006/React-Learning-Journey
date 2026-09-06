
function StudentForm({ name, setName, course, setCourse, year, setYear }) {
    
    function handleNameChange(event) {
        setName(event.target.value);
    }

    function handleCourseChange(c) {
        setCourse(c.target.value);
    }

    function handleYearChange(y) {
        setYear(y.target.value);
    }

    return (
        <>
            <h2>Student Form</h2>

            <input type="text" value={name} onChange={handleNameChange} />
            <p>Name: </p>
            <input type="text" value={course} onChange={handleCourseChange} />
            <p>Course: </p>

            <select value={year} onChange={handleYearChange}>
                <option value="">Select Year</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
            </select>
            
        </>
    )
}

export default StudentForm