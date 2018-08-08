import React from 'react'
import { Route, NavLink } from 'react-router-dom'
import { MenuItem } from '../../modules/common/components/web'
import Product from './containers/Product'
import reducers from './reducers'

import Feature from '../connector'

export default new Feature({
  route: <Route exact path='/product' component={Product} />,
  navItem: (
    <MenuItem key='product'>
      <NavLink to='/product' className='nav-link' activeClassName='active'>
        Product
      </NavLink>
    </MenuItem>
  ),
  reducer: { product: reducers },
})
