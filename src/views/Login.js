import React, { useState } from 'react'
import gql from 'graphql-tag'
import { useMutation } from 'react-apollo-hooks'
import NavBar from '../components/Navbar'
import Input from '../components/Input'
import { Link } from 'react-router-dom';

const LOGIN = gql`
mutation LogUser($email:String!,$password:String!){
    login(email:$email,password:$password){
        token
    }
}
`


function Login({history}) {// history es una prop que react router DOM le pasa a todos nuestros componentes, y viene el historial de la navegación del usuario
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [ sendLogin, { data, errors, loading} ] = useMutation(LOGIN)
    
    const handleSubmit = async (event) => {
        event.preventDefault()
        
        const result = await sendLogin({variables:{email,password}}).catch(error => alert(error.message))
        const { data, errors } = result
        if (data) {
            localStorage.setItem('mapToken', data.login.token)
            history.push('/')
        }
    }

    return (
        <>
        <NavBar />
        <div className="container my-5 py-5 text-center">
            <h4>Bienvenido</h4>
            <p>Inicia sesión con tu dirección de correo electrónico y contraseña.</p>
            <form className="form-login text-left my-5" action="" onSubmit={handleSubmit}>
                <div className="row justify-content-center">
                    <div className="form-group col-10">
                        <Input
                            label="Email: "
                            name="email"
                            id="email"
                            type="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </div>

                    <div className="form-group col-10">
                        <Input
                            label="Contraseña: "
                            name="password"
                            id="password"
                            type="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                    </div>
                    <div className="col-10">
                        <button type="submit" className="btn btn-color-custom btn-block text-light">Iniciar sesión</button>
                    </div>
                </div>
            </form>
            <p className="align-items my-5">¿Eres nuevo? <Link to="/signup" className="nav-link link-color-custom" >Crea una cuenta</Link></p>
        </div>
        </>
    )
}

export default Login