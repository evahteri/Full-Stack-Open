import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    const fakePerson ={
        id: 10000,
        name: "Jane Doe",
        number: "0100100"
    }
    return request.then(response => response.data.concat(fakePerson))
}

const addPerson = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const removePerson = id => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request
}

const updatePerson = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}


export default { getAll, addPerson, removePerson, updatePerson }