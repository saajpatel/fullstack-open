const Header = ({name}) => {

    return (
  
      <h2>{name}</h2>
  
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
        <p> <b>total of {parts.reduce((sum, part) => sum + part.exercises, 0)} exercises</b> </p>
      </div>
  
    )
  
  }

  const Course = ({course}) => {

    return (

      <div>

        {course.map(course =>

        <div key={course.id}>
          <Header name = {course.name}/>
          <Content course = {course}/> 
          <Total parts = {course.parts}/>
        </div>
  
        )}
      </div>
        
      
    )

  }

  export default Course