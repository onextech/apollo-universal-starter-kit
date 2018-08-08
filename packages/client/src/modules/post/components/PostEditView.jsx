import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, ScrollView } from 'react-native'
import { Loading } from '../../common/components/native'

import translate from '../../../i18n'
import PostForm from './PostForm'
import PostComments from '../containers/PostComments'

const PostEditView = ({ loading, post, navigation, subscribeToMore, editPost, t }) => {
  let postObj = post
  // if new post was just added read it from router
  if (!postObj && navigation.state) {
    postObj = navigation.state.params.post
  }

  if (loading && !postObj) {
    return <Loading text={t('post.loadMsg')} />
  } else {
    return (
      <View style={styles.container}>
        <ScrollView>
          <PostForm onSubmit={(values) => editPost({ ...postObj, ...values })} post={post} />
          {postObj && (
            <PostComments
              postId={navigation.state.params.id}
              comments={postObj.comments}
              subscribeToMore={subscribeToMore}
            />
          )}
        </ScrollView>
      </View>
    )
  }
}

PostEditView.propTypes = {
  loading: PropTypes.bool.isRequired,
  post: PropTypes.object,
  editPost: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired,
  subscribeToMore: PropTypes.func.isRequired,
  t: PropTypes.func,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
})

export default translate('post')(PostEditView)
