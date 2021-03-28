import React, { useState } from 'react'
import { Form, Button, Col, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { savePaymentMethod } from '../actions/cartActions'

const PaymentScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart)

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const [paymentMethod, setPaymentMethod] = useState('payment')

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    history.push('/placeorder')
  }

  return (
    <Container> 
    <FormContainer >
      <CheckoutSteps step1 step2 step3 />
      <h4>Payment Method</h4>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as='legend' className='h6'>Select Payment Mode </Form.Label>
          { product.isLend ?
          <Col>
            <Form.Check
              type='radio'
              label='Apply for Loan'
              id='Loan'
              name='paymentMethod'
              value='loan'
              
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
           
          </Col>
          :
          <Col>
            <Form.Check
              type='radio'
              label='Cash On Delievery'
              className='h5'
              id='COD'
              name='paymentMethod'
              value='Cash On Delievery'
            
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
           
          </Col>
                }
        </Form.Group>
        

        <Button type='submit' className='btn-c'>
          Continue
        </Button>
      </Form>
    </FormContainer>
    </Container>
  )
}

export default PaymentScreen
