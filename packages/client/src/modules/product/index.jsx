import React from 'react'
import PropTypes from 'prop-types'
import { Route, NavLink } from 'react-router-dom'
import { MenuItem } from '../../modules/common/components/web'
import reducers from './reducers'
import Feature from '../connector'
import translate from '../../i18n'
import resources from './locales'
import { IfLoggedIn, AdminRoute } from '../user/containers/Auth'
import { AdminProducts, AdminProduct, AdminProductCreate } from './admin/containers'
import { GuestProducts, GuestProduct } from './guest/containers'

const meta = {
  name: 'Product',
  singular: 'product',
  plural: 'products',
}

const components = {
  admin: {
    list: AdminProducts,
    detail: AdminProduct,
    new: AdminProductCreate,
  },
  guest: {
    list: GuestProducts,
    detail: GuestProduct,
  },
}

const withTranslate = (Component) => translate('product')(Component)
const AdminNavLink = ({ t }) => {
  return (
    <NavLink to={`/admin/${meta.plural}`} className='nav-link' activeClassName='active'>
      {t('navLink')}
    </NavLink>
  )
}
AdminNavLink.propTypes = {
  t: PropTypes.func.isRequired,
}
const AdminNavLinkWithI18n = withTranslate(AdminNavLink)
const GuestNavLink = ({ t }) => {
  return (
    <NavLink to={`/${meta.plural}`} className='nav-link' activeClassName='active'>
      {t('navLink')}
    </NavLink>
  )
}
GuestNavLink.propTypes = {
  t: PropTypes.func.isRequired,
}
const GuestNavLinkWithI18n = withTranslate(GuestNavLink)

export default new Feature({
  route: [
    <AdminRoute exact path={`/admin/${meta.plural}`} component={components.admin.list} />,
    <AdminRoute exact path={`/admin/${meta.plural}/new`} component={components.admin.new} />,
    <AdminRoute path={`/admin/${meta.plural}/:id`} component={components.admin.detail} />,
    <Route exact path={`/${meta.plural}`} component={components.guest.list} />,
    <Route path={`/${meta.plural}/:id`} component={components.guest.detail} />,
  ],
  navItem: [
    <MenuItem>
      <GuestNavLinkWithI18n />
    </MenuItem>,
    <IfLoggedIn key={meta.plural} role='admin'>
      <MenuItem>
        <AdminNavLinkWithI18n />
      </MenuItem>
    </IfLoggedIn>,
  ],
  reducer: { [meta.singular]: reducers },
  localization: { ns: meta.singular, resources },
})
