import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const ProductView = () => {
  return (
    <View style={styles.container}>
      <View style={styles.element}>
        <Text style={styles.box}>Hello Product!</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  element: {
    paddingTop: 30,
  },
  box: {
    textAlign: 'center',
    marginLeft: 15,
    marginRight: 15,
  },
})

export default ProductView
