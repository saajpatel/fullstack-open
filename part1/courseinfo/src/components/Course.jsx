const Header = ({name}) => {

    return (
  
      <h1>{name}</h1>
  
    )
  
  }
  
  const Part = ({part}) => {
    
    return (
  
      <p>
        {part.name} {part.exercises}
      </p>
  
    )
  
  }
  
  const Content = ({course}) => {
    
    return (
  
      <div>
        
        {course.parts.map((part) =>
          <Part key ={part.id} part={part}/>
        )}
  
      </div>
  
    )
  
  }
  
  const Total = ({parts}) => {
    return (
  
      <div>
        <p>total of {parts.reduce((sum, part) => sum + part.exercises, 0)} exercises</p>
      </div>
  
    )
  
  }

  const Course = ({course}) => {

    return (

    <div>
      <Header name = {course.name}/>
      <Content course = {course}/> 
      <Total parts = {course.parts}/>
    </div>
    )

  }

  export default Course