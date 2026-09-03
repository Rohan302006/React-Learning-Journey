import StudentCard from "./StudentCard";

function StudentList() {
    
    const students = [
        {
            id: 1,
            name: "Rohan",
            course: "CSE",
            year: 3,
            isStudent: true
        },
        {
            id: 2,
            name: "ABC",
            course: "IT",
            year: 2,
            isStudent: true
        },
        {
            id: 3,
            name: "XYZ",
            course: "MECH",
            year: 1,
            isStudent: false
        }
    ];

    return (
        <>
            {students.map(student => (
                <StudentCard
                    key={student.id}
                    name={student.name}
                    course={student.course}
                    year={student.year}
                    isStudent={student.isStudent}
                />
            ))}
        </>
    );
}

export default StudentList