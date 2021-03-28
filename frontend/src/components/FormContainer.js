import React from 'react'
import {Form, Col} from 'react-bootstrap'


const FormContainer = ({ children }) => {
  return (

    <Form.Row>
    <Form.Group as={Col} sm={6} className="field" >
      {children}
    </Form.Group>
  </Form.Row>


  )
}

export default FormContainer
