import React from 'react'
import { Route, NavLink } from 'react-router-dom'

import Counter from './containers/Counter'
import clientCounter from './clientCounter'
import reduxCounter from './reduxCounter'
import serverCounter from './serverCounter'
import Feature from '../connector'
import resources from './locales'

import translate, { TranslateFunction } from '../../i18n'
import { MenuItem } from '../../modules/common/components/web'

interface NavLinkProps {
  t: TranslateFunction
}

const NavLinkWithI18n = translate('counter')(({ t }: NavLinkProps) => (
  <NavLink to='/counter' className='nav-link' activeClassName='active'>
    {t('navLink')}
  </NavLink>
))

export default new Feature(clientCounter, reduxCounter, serverCounter, {
  route: <Route exact path='/counter' component={Counter} />,
  localization: { ns: 'counter', resources },
  navItem: (
    <MenuItem key='/counter'>
      <NavLinkWithI18n />
    </MenuItem>
  ),
})
