const Header = (prop) => {

  return (

    <h1>{prop.courses.name}</h1>

  )

}

const Part = (prop) => {
  
  return (

    <p>
      {prop.prop.name} {prop.prop.exercises}
    </p>

  )

}

const Content = (prop) => {
  
  return (

    <div>
      <Part prop = {prop.parts[0]}/>
      <Part prop = {prop.parts[1]}/>
      <Part prop = {prop.parts[2]}/>
    </div>

  )

}

const Total = (prop) => {
  return (

    <div>
      <p>Number of exercises {prop.parts[0].exercises + prop.parts[1].exercises + prop.parts[2].exercises}</p>
    </div>

  )

}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  

  return (
    <div>
      <Header courses = {course}/>
      <Content parts = {course.parts}/> 
      <Total parts = {course.parts}/>
    </div>
  )
}

export default App