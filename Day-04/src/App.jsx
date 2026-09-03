import Result from "./components/Result"
import StudentList from "./components/StudentList"

function App() {


  return (
    <>
      <h1>Student List</h1>

      <StudentList />
      
      <Result marks={35}/>     
      <Result marks={75} />
    </>
  )
}

export default App
