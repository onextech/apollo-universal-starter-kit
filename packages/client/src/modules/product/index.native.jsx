import { Ionicons } from '@expo/vector-icons'
import { createTabBarIconWrapper } from '../common/components/native'
import AdminProducts from './containers/AdminProducts'
import reducers from './reducers'

import Feature from '../connector'

export default new Feature({
  tabItem: {
    Product: {
      screen: AdminProducts,
      navigationOptions: {
        tabBarIcon: createTabBarIconWrapper(Ionicons, {
          name: 'ios-browsers-outline',
          size: 30,
        }),
      },
    },
  },
  reducer: { product: reducers },
})
