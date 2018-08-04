import React from 'react'
import { Route, NavLink } from 'react-router-dom'
import { AuthRoute, IfLoggedIn } from '../user/containers/Auth'
import { MenuItem } from '../common/components/web'
import Posts from './containers/Posts'
import PostEdit from './containers/PostEdit'
import PostAdd from './containers/PostAdd'
import translate from '../../i18n'
import resources from './locales'
import resolvers from './resolvers'
import Feature from '../connector'

const NavLinkWithI18n = translate('post')(({ t }) => {
  return (
    <NavLink to='/posts' className='nav-link' activeClassName='active'>
      {t('navLink')}
    </NavLink>
  )
})

export default new Feature({
  route: [
    <AuthRoute exact path='/posts' redirect='/' role='admin' component={Posts} />,
    <Route exact path='/post/new' component={PostAdd} />,
    <Route path='/post/:id' component={PostEdit} />,
  ],
  navItem: (
    <IfLoggedIn key='/posts' role='admin'>
      <MenuItem>
        <NavLinkWithI18n />
      </MenuItem>
    </IfLoggedIn>
  ),
  resolver: resolvers,
  localization: { ns: 'post', resources },
})
