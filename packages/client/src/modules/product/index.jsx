import React from 'react'
import { NavLink } from 'react-router-dom'
import { MenuItem } from '../../modules/common/components/web'
import reducers from './reducers'
import Feature from '../connector'
import translate from '../../i18n'
import resources from './locales'
import { IfLoggedIn, AdminRoute } from '../user/containers/Auth'
import { AdminProducts, AdminProduct, CreateAdminProduct } from './containers'

const meta = {
  name: 'Product',
  singular: 'product',
  plural: 'products',
}

const components = {
  list: AdminProducts,
  detail: AdminProduct,
  new: CreateAdminProduct,
}

const NavLinkWithI18n = translate('product')(({ t }) => (
  <NavLink to={`/admin/${meta.plural}`} className='nav-link' activeClassName='active'>
    {t('navLink')}
  </NavLink>
))

export default new Feature({
  route: [
    <AdminRoute exact path={`/admin/${meta.plural}`} component={components.list} />,
    <AdminRoute exact path={`/admin/${meta.plural}/new`} component={components.new} />,
    <AdminRoute path={`/admin/${meta.plural}/:id`} component={components.detail} />,
  ],
  navItem: (
    <IfLoggedIn key={meta.plural} role='admin'>
      <MenuItem>
        <NavLinkWithI18n />
      </MenuItem>
    </IfLoggedIn>
  ),
  reducer: { [meta.singular]: reducers },
  localization: { ns: meta.singular, resources },
})
