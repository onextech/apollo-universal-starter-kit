import React from 'react'
import { NavLink } from 'react-router-dom'
import { MenuItem } from '../../modules/common/components/web'
import reducers from './reducers'
import Feature from '../connector'
import translate from '../../i18n'
import resources from './locales'
import { AuthRoute } from '../user/containers/Auth'
import AdminProducts from './containers/AdminProducts'

const NavLinkWithI18n = translate('product')(({ t }) => (
  <NavLink to='/admin/products' className='nav-link' activeClassName='active'>
    {t('navLink')}
  </NavLink>
))

export default new Feature({
  route: <AuthRoute exact path='/admin/products' redirect='/' role='admin' component={AdminProducts} />,
  navItem: (
    <MenuItem key='product'>
      <NavLinkWithI18n />
    </MenuItem>
  ),
  reducer: { product: reducers },
  localization: { ns: 'product', resources },
})
