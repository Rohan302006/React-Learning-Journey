import ProjectCard from './components/ProjectCard';
import StudentCard from './components/StudentCard';
function App() {

  function handleStudent(name) {
    console.log("Student:", name);
  }

  function handleProject(name) {
    console.log("Project:", name);
  }

  return (
    <>
      <div>
        <h1>Day 10 - Reusable Components</h1>

        <StudentCard onStudentClick={handleStudent} />

        <ProjectCard onProjectClick={handleProject} />
      </div>
    </>
  )
}

export default App