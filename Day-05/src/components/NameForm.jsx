import { useState } from "react"

function NameForm() {

    const [submitted, setSubmitted] = useState(false);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [course, setCourse] = useState("");
    const [year, setYear] = useState("");
    const [isStudent, setIsStudent] = useState(false);


    function handleNameChange(name) {               // We can pass anything like e or event as a parameter 
        setName(name.target.value);

    }

    function handleEmailChange(email) {               // Separate handler for the email because we want only email to update 
        setEmail(email.target.value);
    }

    function handleCourseSelection(course) {
        setCourse(course.target.value);
    }

    function handleYearSelection(year) {
        setYear(year.target.value);
    }

    function handleStudentStatus(s) {
        setIsStudent(s.target.checked)
    }

    function handleSubmit(e) {
        e.preventDefault();             // Prevent the auto reload of the browser after clicking the submit button
        console.log(name);
        console.log(email);
        console.log(course);
        console.log(year);
        console.log(isStudent);

        setSubmitted(true);
    }



    return (
        <>
            <form onSubmit={handleSubmit}>

                <input type="text" value={name} onChange={handleNameChange} />
                <p>Name: {name}</p>
                <br /><br />

                <input type="email" value={email} onChange={handleEmailChange} />
                <p>Email: {email}</p>
                <br /><br />


                <select value={course} onChange={handleCourseSelection}>
                    <option value="">Select Course</option>
                    <option value="CSE">CSE</option>            {/* Value means react will receive this value as a CSE and the  display the text between the option tag value which we see */}
                    <option value="IT">IT</option>
                    <option value="ENTC">ENTC</option>
                    <option value="MECH">MECH</option>
                </select>
                <br /><br />


                <select value={year} onChange={handleYearSelection}>
                    <option value="">Select Year</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                </select>
                <br /><br />


                <label htmlFor="checkbox">isStudent
                    <input type="checkbox" checked={isStudent} onChange={handleStudentStatus} />
                </label>
                <br /><br />



                <button type="submit">Submit</button>

            </form>

            {submitted && (
                <div>
                    <h2>Registration Successful!</h2>
                    <p>Name: {name}</p>
                    <p>Course: {course}</p>
                    <p>Year: {year}</p>
                </div>
            )}


        </>
    );
}

export default NameForm;