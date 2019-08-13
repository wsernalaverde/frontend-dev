import React from 'react'
import { useQuery } from 'react-apollo-hooks'
import gql from 'graphql-tag'
import Input from '../components/Input'
import isAuthenticated from '../utils/isAuthenticated'

const ME = gql`
  query ME{
    me{
      name,
      email,
      phone
    }
  }
`

function Profile () {
  const { data, loading, error } = useQuery(ME)

  return loading ? (<h4 className="mt-5">Cargando ...</h4>) : (
    <div className="container">
      <div className="row justify-content-center text-center">
        <div className="col-10">
          <h3>Mi perfil</h3>
        </div>
        <div className="col-10">
          <Input 
            label="Nombre: "
            type="text"
            name="name"
            id="name"
            value={data.me.name}
            onChange=""
          />
        </div>
        <div className="col-10">
          <Input 
            label="Email: "
            type="email"
            name="email"
            id="email"
            value={data.me.email}
            onChange=""
          />
        </div>
        <div className="col-10">
          <Input 
            label="Teléfono: "
            type="number"
            name="phone"
            id="phone"
            value={data.me.phone}
            onChange=""
          />
        </div>
      </div>
    </div>
  )
}

export default isAuthenticated(Profile)