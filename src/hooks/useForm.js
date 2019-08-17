import { useState, useEffect } from 'react'

function useForm (callback, data = {}) {

  const [inputs, setInputs] = useState(data)

  // useEffect(() => {
  //   setInputs({...data})
  // },[data])

  const handleSubmit = event => {
    // va a cachar el evento submit del formulario
    if (event) event.preventDefault()

    callback(inputs)
  }

  const handleInputChange = event => {
    // Detectar los cambios en los fields
    event.persist()

    const { name, value } = event.target
    setInputs(fields => ({ ...fields, [name]:value }))
  }

  return {
    inputs,
    handleSubmit,
    handleInputChange
  }
}

export default useForm
