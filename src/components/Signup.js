import React from 'react'
import { Formik } from 'formik'
import Dropzone from 'react-dropzone'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo';
import Navbar from '../components/Navbar'

const SIGNUP = gql`
  mutation createUser($data:createUser!){
    createUser(user:$data){
      name,
      photo_url
    }
  }
`

class Signup extends React.Component {
  state = {
    userData: {
      name: '',
      email: '',
      phone: '',
      password: '',
      photo_url: '',
    },
    previewImage: '',
  }

  render() {
    return (

      <div>
        <Navbar />
        <Mutation mutation={SIGNUP} variables={{data:{...this.state.userData}}}>
          {
            (createUser, { data, error, loading }) => {
              if (data) console.log('SE HA REGISTRADO');
              if (error) console.log('HUBO UN ERROR');
              if (loading) console.log('ESTOY CARGANDO')


              return (
                <>
                  <div className="my-5 py-5 text-center container">
                    <h4>Registrarte</h4>
                    <p>Completa el formulario para registrarte</p>
                    <Formik className="form-login text-left my-5"
                      initialValues={{
                        name: '',
                        email: '',
                        phone: '',
                        password: ''
                      }}
                      validate={values => {
                        let errors = {};
                        if (!values.email) {
                          errors.email = 'Required';
                        } else if (
                          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                        ) {
                          errors.email = 'Invalid email address';
                        }
                        if (!values.password) {
                          errors.password = 'Required';
                        }
                        return errors;
                      }}
                      onSubmit={(values, { setSubmitting }) => {
                        setTimeout(() => {
                          this.setState((prevState) => ({
                            ...prevState,
                            userData: {
                              ...prevState.userData,
                              name: values.name,
                              phone: values.phone,
                              email: values.email,
                              password: values.password
                            }
                          }), () => createUser());
                        }, 400);
                        setSubmitting(false);
                      }}
                    >
                      {
                        ({
                          values,
                          errors,
                          touched,
                          handleChange,
                          handleBlur,
                          handleSubmit,
                          isSubmitting,
                          /* and other goodies */
                        }) => (
                            <form className="form-login text-left" onSubmit={handleSubmit}>
                              <div className="row justify-content-center">
                                <div className="form-group col-10">
                                  <label>Nombre:</label>
                                  <br></br> 
                                  <input className="form-control"
                                    type="name"
                                    name="name"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.name}
                                  />
                                </div>
                                
                                <div className="form-group col-10">
                                  <label>Teléfono:</label>
                                  <br></br>
                                  <input className="form-control"
                                    type="phone"
                                    name="phone"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.phone}
                                  />
                                </div>
                                <div className="form-group col-10">
                                  <label>Email:</label>
                                  <br></br>
                                  <input className="form-control"
                                    type="email"
                                    name="email"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.email}
                                  />
                                </div>
                                {errors.email && touched.email && errors.email}
                                <div className="form-group col-10">
                                  <label>Contraseña:</label>
                                  <br></br>
                                  <input className="form-control"
                                    type="password"
                                    name="password"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.password}
                                  />
                                </div>
                                {errors.password && touched.password && errors.password}
                                <div className="form-group col-10">
                                  <Dropzone onDrop={acceptedFiles => {
                                    acceptedFiles.forEach(file => {
                                      const reader = new FileReader();
                                      reader.onload = () => {
                                        const binaryString = reader.result;
                                        this.setState(prevState => ({
                                          ...prevState,
                                          userData: {
                                            ...prevState.userData,
                                            photo_url: file,
                                          },
                                          previewImage: binaryString,
                                        }))
                                      }
                                      reader.onabort = () => console.log("file fue abortado");
                                      reader.onerror = () => console.log("Hubo un error");
                                      reader.readAsDataURL(file);
                                    })
                                  }}>
                                    {({ getRootProps, getInputProps }) => (
                                      <section>
                                        <div {...getRootProps()}>
                                          <input {...getInputProps()} />
                                          <p>Arrastra aquí el archivo o haz clic para seleccionarlo.</p>
                                        </div>
                                      </section>
                                    )}
                                  </Dropzone>
                                </div>
                                <div className="form-group col-10">    
                                  <img src={this.state.previewImage} />
                                </div>
                                <br></br>
                                <div className="form-group col-10">
                                  <button className="btn btn-color-custom btn-block text-light" type="submit" disabled={isSubmitting}>
                                    Registrarte
                                  </button>
                                </div>
                              </div>
                            </form>

                          )
                      }
                    </Formik>
                  </div>
                </>
              )
            }
          }
        </Mutation>
      </div>
    )
  }
}

export default Signup