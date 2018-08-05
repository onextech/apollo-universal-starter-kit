import React from 'react'
import PropTypes from 'prop-types'
import { Button as SuiButton } from 'semantic-ui-react'

const Button = ({ children, ...props }) => {
  return <SuiButton {...props}>{children}</SuiButton>
}

Button.propTypes = {
  children: PropTypes.node,
}

export default Button
