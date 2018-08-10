import { Ionicons } from '@expo/vector-icons'
import { createTabBarIconWrapper } from '../common/components/native'
import Checkout from './containers/Checkout'
import reducers from './reducers'

import Feature from '../connector'

export default new Feature({
  tabItem: {
    Checkout: {
      screen: Checkout,
      navigationOptions: {
        tabBarIcon: createTabBarIconWrapper(Ionicons, {
          name: 'ios-browsers-outline',
          size: 30,
        }),
      },
    },
  },
  reducer: { checkout: reducers },
})
