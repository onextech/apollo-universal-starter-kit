import React from 'react'
import { Route } from 'react-router-dom'
import reducers from './reducers'
import Feature from '../connector'
import resources from './locales'
import { Checkout } from './containers'

export default new Feature({
  route: [
    <Route exact path='/checkout' component={Checkout} />,
  ],
  reducer: { checkout: reducers },
  localization: { ns: 'checkout', resources },
})
