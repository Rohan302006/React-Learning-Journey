import ProfileCard from "./components/ProfileCard"

function App() {

  function handleProfileClick(name) {                 // Here the handleProfileClick is the Function we are passing the name here
    console.log(`${name}'s Profile clicked`);
  }

  return (
    <>
      <ProfileCard
        name="Rohan"
        course="CSE"
        year={3}
        isStudent={true}
        onProfileClick={handleProfileClick}/>
      
      <ProfileCard
        name="ABC"
        course="IT"
        year={2}
        isStudent={true}
        onProfileClick={handleProfileClick}/>
      
      <ProfileCard
        name="XYZ"
        course="MECH"
        year={1}
        isStudent={false}
        onProfileClick={handleProfileClick}/>
      
    </>
  )
}

export default App