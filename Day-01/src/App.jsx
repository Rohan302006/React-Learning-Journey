import Student from "./components/Student"

function App() {
  
  return (
    <>
      <Student name="Rohan" course="CSE" subject="React"/>
      <Student name="ABC" course="IT" subject="JavaScript"/>
      <Student name="XYZ" course="Electronics" subject="TypeScript" college="NBNSCOE" />          // We can pass any number of parameters
    </>
  )
}

export default App