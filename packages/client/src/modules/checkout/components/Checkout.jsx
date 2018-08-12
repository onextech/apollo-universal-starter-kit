import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { Redirect } from 'react-router-dom'
import { Form, FormGroup, Label, Input } from 'reactstrap'
import { PageLayout, Row, Col, Card, CardHeader, CardTitle, CardBody, CardText } from '../../common/components/web'
import { CartSummary } from '../../product/guest/components/Products'


const renderMetaData = () => {
  return (
    <Helmet
      title='Checkout'
      meta={[
        { name: 'description', content: 'Checkout page' },
      ]}
    />
  )
}

const Checkout = ({ location }) => {
  const { state } = location
  if (state) {
    const { cart, order } = state
    const handleOrderSubmit = () => {
      window.alert('Your order has been submitted successfully. You will receive an SMS confirmation to confirm your order.')
    }
    return (
      <PageLayout container>
        {renderMetaData()}
        <Row>
          <Col sm={8}>
            <h1>Checkout</h1>
            <p>Please fill in the following fields</p>
            <Card style={{ marginTop: '1em' }}>
              <CardHeader>Contact Details</CardHeader>
              <CardBody>
                <Form>
                  <FormGroup>
                    <Label>Name</Label>
                    <Input type='text' placeholder='Name' required />
                  </FormGroup>
                  <FormGroup>
                    <Label>Mobile</Label>
                    <Input type='text' placeholder='Mobile' required />
                  </FormGroup>
                  <FormGroup>
                    <Label>Email</Label>
                    <Input type='email' placeholder='Email' required />
                  </FormGroup>
                  <FormGroup>
                    <Label>Password</Label>
                    <Input type='password' placeholder='Password' required />
                  </FormGroup>
                </Form>
              </CardBody>
            </Card>
          </Col>
          <Col sm={4}>
            <CartSummary cart={cart} order={order} onCartSubmit={handleOrderSubmit} />
            <Card>
              <CardBody>
                <CardTitle>Collection Address</CardTitle>
                <CardText>
                  Blk 20 #01-119 to #01-122
                  <br />
                  Ghim Moh Market
                  <br />
                  Singapore 270020
                </CardText>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </PageLayout>
    )
  }
  return (
    <Redirect to={{ pathname: '/products' }} />
  )
}

Checkout.propTypes = {
  location: PropTypes.object.isRequired,
}

export default Checkout
