import Card from "./Card";
function StudentCard({ onStudentClick }) {
    function handleClick() {
        onStudentClick("Rohan");
    }

    return (
        <>
            <Card
                title="Student"
                actionText="View Profile"
                onAction={handleClick}
            >
                <p>Name: Rohan</p>
                <p>Course: CSE</p>
                <p>Year: 3</p>
            </Card>
        </>
    )
}

export default StudentCard