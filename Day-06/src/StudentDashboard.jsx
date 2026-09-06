import { useState } from "react"
import StudentForm from "./StudentForm";
import StudentPreview from "./StudentPreview";

function StudentDashboard() {

    const [name, setName] = useState("");
    const [course, setCourse] = useState("");
    const [year, setYear] = useState("");

    return (
        <>
            <h1>Student Dashboard</h1>

            <StudentForm
                name={name}
                setName={setName}
                course={course}
                setCourse={setCourse}
                year={year}
                setYear = {setYear}
            />


            <StudentPreview
                name={name}
                course={course}
                year={year}
            />
            
        </>
    )
}

export default StudentDashboard