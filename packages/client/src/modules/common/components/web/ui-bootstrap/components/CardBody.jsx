import React from 'react'
import PropTypes from 'prop-types'
import { CardBody as RSCardBody } from 'reactstrap'

const CardBody = ({ children, ...props }) => {
  return <RSCardBody {...props}>{children}</RSCardBody>
}

CardBody.propTypes = {
  children: PropTypes.node,
}

export default CardBody
