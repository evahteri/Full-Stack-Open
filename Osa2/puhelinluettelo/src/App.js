import { useState, useEffect } from 'react'
import axios from 'axios'

const Person = (props) => {
  return (
    <div>
      <p>
        {props.person.name} {props.person.number}
      </p>
    </div>
  )

}

const PersonForm = (props) => {
  return (
    <div>
      <form>
        <div>
          name: <input value={props.name} onChange={props.namechange}/>
        </div>
        <div>
          number: <input value={props.number} onChange={props.numberchange} />
        </div>
        <div>
          <button type="submit" onClick={props.action}>add</button>
        </div>
      </form>
    </div>
  )
}

const Persons = ({persons, filter}) => (
  <div>
    {persons.filter(person => person.name.toLowerCase().includes(filter)).map(
      person => (
        <Person key={person.name} person={person} />
      )
    )}
  </div>
)

const Filter = (props) => {
  return (
  <div>
    filter shown with <input value={props.value} onChange={props.handleChange} />
  </div>
  )
}

const App = () => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [persons, setPersons] = useState([])

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])


  const addName = (event) => {
    event.preventDefault()
    if (persons.find(person => person.name === newName)) {
      return (alert(`${newName} is already added to phonebook`))
    }

    setPersons(persons.concat({ name: newName, number: newNumber}))
    setNewName('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }



  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={newFilter} handleChange={handleFilterChange} />
      <h2>
        Add a new
      </h2>
      <PersonForm name={newName} 
      namechange={handleNameChange}
      number={newNumber}
      numberchange={handleNumberChange}
      action={addName}/>
      <h2>Numbers</h2>
      <div>
      <Persons filter={newFilter} persons={persons}/>
      </div>
    </div>
  )

}

export default App
