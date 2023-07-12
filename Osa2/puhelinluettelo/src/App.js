import { useState, useEffect } from 'react'
import personService from './services/persons'

const Person = (props) => {
  return (
    <div>
        {props.person.name} {props.person.number}
      <button onClick={() => props.deleteAction(props.person)}>delete</button>
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

const Persons = ({persons, filter, deleteAction}) => (
  <div>
    {persons.filter(person => person.name.toLowerCase().includes(filter)).map(
      person => (
        <Person key={person.name} person={person} deleteAction={deleteAction} />
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
    personService.getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
    }
    )
  }, [])

  const updateName = () => {
    const person = persons.find(person => person.name === newName)
    const personObject = {
      name: newName,
      number: newNumber
    }
    console.log(person.id)
    personService.updatePerson(person.id, personObject).then(
      returnedPerson => {
        setPersons(persons.map(p => p.id !== person.id ? p: returnedPerson))
      }
    )
  }


  const addName = (event) => {
    event.preventDefault()
    if (persons.find(person => person.name === newName)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`))
      return updateName()
    } 
    else {
      const personObject = {
        name: newName,
        number: newNumber
      }
      personService.addPerson(personObject).then(
        returnedPerson => {
          setPersons(persons.concat(returnedPerson))
        }
      )
    }
    setNewName('')
  }

  const deleteName = person => {
    if (!window.confirm(`delete ${person.name}?`)) return
    (
      personService.removePerson(person.id).then(
        setPersons(persons.filter(name => name.id !== person.id))
      )
    )
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
      <Persons filter={newFilter} persons={persons} deleteAction={deleteName}/>
      </div>
    </div>
  )

}

export default App
