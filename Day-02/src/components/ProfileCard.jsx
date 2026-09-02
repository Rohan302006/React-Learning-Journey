
function ProfileCard({ name, course, year, isStudent, onProfileClick }) {    // Here the onProfileClick is the function prop received from the parent 
    return (
        <>
            <h1>Student Profile</h1>

            <p>Name: {name}</p>
            <p>Course: {course}</p>
            <p>Year: {year}</p>
            <p>isStudent: {isStudent ? "Yes" : "No"}</p>

            <button onClick={() => onProfileClick(name)}>View Profile</button>

            {/* Here we are using the arrow function so that When the button is clicked, call the function and give it this student's name. */}


        </>
    )
}

export default ProfileCard