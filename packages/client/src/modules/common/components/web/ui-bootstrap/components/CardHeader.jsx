import React from 'react'
import PropTypes from 'prop-types'
import { CardHeader as RSCardHeader } from 'reactstrap'

const CardHeader = ({ children, ...props }) => {
  return <RSCardHeader {...props}>{children}</RSCardHeader>
}

CardHeader.propTypes = {
  children: PropTypes.node,
}

export default CardHeader
