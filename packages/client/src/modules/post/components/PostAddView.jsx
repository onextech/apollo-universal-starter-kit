import React from 'react'
import PropTypes from 'prop-types'
import { ScrollView, StyleSheet, View } from 'react-native'

import translate from '../../../i18n'
import PostForm from './PostForm'

const PostAddView = ({ addPost }) => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <PostForm onSubmit={(values) => addPost(values)} />
      </ScrollView>
    </View>
  )
}

PostAddView.propTypes = {
  addPost: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
})

export default translate('post')(PostAddView)
