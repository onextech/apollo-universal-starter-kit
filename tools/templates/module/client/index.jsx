import React from 'react'
import { NavLink } from 'react-router-dom'
import { MenuItem } from '../../modules/common/components/web'
import reducers from './reducers'
import Feature from '../connector'
import translate from '../../packages/client/src/i18n'
import resources from './locales'
import { AuthRoute } from '../user/containers/Auth'
import Admin$Module$s from './containers/Admin$Module$s'

const NavLinkWithI18n = translate('product')(({ t }) => (
  <NavLink to='/admin/$module$s' className='nav-link' activeClassName='active'>
    {t('navLink')}
  </NavLink>
))

export default new Feature({
  route: <AuthRoute exact path='/admin/$module$s' redirect='/' component={Admin$Module$s} />,
  navItem: (
    <MenuItem key='$module$'>
      <NavLinkWithI18n />
    </MenuItem>
  ),
  reducer: { $module$: reducers },
  localization: { ns: '$module$', resources },
})
