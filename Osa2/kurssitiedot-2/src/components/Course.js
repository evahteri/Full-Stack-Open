const Course = (props) => {
    return (
      <div>
        <Header course = {props.course.name}/>
        <Content parts = {props.course.parts}/>
        <Total parts = {props.course.parts}/>
      </div>
    )
  }

const Header = (props) => {
    return <h1>{props.course}</h1>
  }
  
  const Part = (props) => {
    return (
      <li>
              {props.part} {props.exercises}
      </li>
    )
  }
  
  const Content = (props) => {
    return (
      <div>
        <ul>
          {props.parts.map(part =>
            <Part key={part.id} part={part.name} exercises={part.exercises} />)}
        </ul>
      </div>
    )
  }
  
  const Total = props => {
    const total = props.parts.reduce((sum, part) => sum + part.exercises, 0)
    return <b>Total of {total} exercises</b>
  }
  
export default Course