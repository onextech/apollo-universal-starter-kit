import React from 'react'
import { Route, NavLink } from 'react-router-dom'
import { MenuItem } from '../../modules/common/components/web'
import Product from './containers/Product'
import reducers from './reducers'
import Feature from '../connector'
import translate from '../../i18n'

const NavLinkWithI18n = translate('product')(({ t }) => (
  <NavLink to='/product' className='nav-link' activeClassName='active'>
    {t('navLink')}
  </NavLink>
))

export default new Feature({
  route: <Route exact path='/product' component={Product} />,
  navItem: (
    <MenuItem key='product'>
      <NavLinkWithI18n />
    </MenuItem>
  ),
  reducer: { product: reducers },
})
