import { Ionicons } from '@expo/vector-icons'
import { createTabBarIconWrapper } from '../common/components/native'
import Product from './containers/Product'
import reducers from './reducers'

import Feature from '../connector'

export default new Feature({
  tabItem: {
    Product: {
      screen: Product,
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
