import React from 'react'
import { Route, NavLink } from 'react-router-dom'
import { MenuItem } from '../../modules/common/components/web'
import $Module$ from './containers/$Module$'
import reducers from './reducers'
import Feature from '../connector'
import translate from '../../packages/client/src/i18n'
import resources from './locales'

const NavLinkWithI18n = translate('product')(({ t }) => (
  <NavLink to='/$module$' className='nav-link' activeClassName='active'>
    {t('navLink')}
  </NavLink>
))

export default new Feature({
  route: <Route exact path='/$module$' component={$Module$} />,
  navItem: (
    <MenuItem key='$module$'>
      <NavLinkWithI18n />
    </MenuItem>
  ),
  reducer: { $module$: reducers },
  localization: { ns: '$module$', resources },
})
