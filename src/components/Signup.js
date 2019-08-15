import React from 'react'
import { Formik } from 'formik'
import Dropzone from 'react-dropzone'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo';

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
        <Mutation mutation={SIGNUP} variables={{data:{...this.state.userData}}}>
          {
            (createUser, { data, error, loading }) => {
              if (data) console.log('SE HA REGISTRADO');
              if (error) console.log('HUBO UN ERROR');
              if (loading) console.log('ESTOY CARGANDO')


              return (
                <>
                  <h1>Signup</h1>
                  <div>
                    <h1>Anywhere in your app!</h1>
                    <Formik
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
                            <form onSubmit={handleSubmit}>
                              Name: <input
                                type="name"
                                name="name"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.name}
                              />
                              <br></br>
                              phone <input
                                type="phone"
                                name="phone"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.phone}
                              />
                              <br></br>
                              email<input
                                type="email"
                                name="email"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                              />
                              <br></br>
                              {errors.email && touched.password && errors.password}
                              password<input
                                type="password"
                                name="password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                              />

                              {errors.password && touched.password && errors.password}
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
                                      <p>Drag 'n' drop some files here, or click to select files</p>
                                    </div>
                                  </section>
                                )}
                              </Dropzone>
                              <img src={this.state.previewImage} />
                              <br></br>
                              <button type="submit" disabled={isSubmitting}>
                                Submit
                            </button>
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