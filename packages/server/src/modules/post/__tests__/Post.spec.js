import { expect } from 'chai'
import { step } from 'mocha-steps'

import { Post } from '../models'
import { getApollo } from '../../../testHelpers/integrationSetup'
import POSTS_QUERY from '../../../../../client/src/modules/post/graphql/PostsQuery.graphql'
import POST_QUERY from '../../../../../client/src/modules/post/graphql/PostQuery.graphql'
import ADD_POST from '../../../../../client/src/modules/post/graphql/AddPost.graphql'
import EDIT_POST from '../../../../../client/src/modules/post/graphql/EditPost.graphql'
import DELETE_POST from '../../../../../client/src/modules/post/graphql/DeletePost.graphql'
import POSTS_SUBSCRIPTION from '../../../../../client/src/modules/post/graphql/PostsSubscription.graphql'
import ADD_COMMENT from '../../../../../client/src/modules/post/graphql/AddComment.graphql'
import COMMENT_SUBSCRIPTION from '../../../../../client/src/modules/post/graphql/CommentSubscription.graphql'

describe('Post and comments example API works', () => {
  let apollo

  before(() => {
    apollo = getApollo()
  })

  step('Query post list works', async () => {
    let result = await apollo.query({
      query: POSTS_QUERY,
      variables: { limit: 1, after: 0 },
    })
    expect(result.data).to.deep.equal({
      posts: {
        totalCount: 20,
        edges: [
          {
            cursor: 0,
            node: {
              id: 20,
              title: 'Post title 20',
              content: 'Post content 20',
              __typename: 'Post',
            },
            __typename: 'PostEdges',
          },
        ],
        pageInfo: {
          endCursor: 0,
          hasNextPage: true,
          __typename: 'PostPageInfo',
        },
        __typename: 'Posts',
      },
    })
  })

  step('Query single post with comments works', async () => {
    let result = await apollo.query({ query: POST_QUERY, variables: { id: 1 } })
    expect(result.data).to.deep.equal({
      post: {
        id: 1,
        title: 'Post title 1',
        content: 'Post content 1',
        __typename: 'Post',
        comments: [
          {
            id: 1,
            content: 'Comment title 1 for post 1',
            __typename: 'Comment',
          },
          {
            id: 2,
            content: 'Comment title 2 for post 1',
            __typename: 'Comment',
          },
        ],
      },
    })
  })

  step('Publishes post on add', (done) => {
    apollo.mutate({
      mutation: ADD_POST,
      variables: {
        input: {
          title: 'New post 1',
          content: 'New post content 1',
        },
      },
    })

    let subscription

    subscription = apollo
      .subscribe({
        query: POSTS_SUBSCRIPTION,
        variables: { endCursor: 10 },
      })
      .subscribe({
        next(data) {
          expect(data).to.deep.equal({
            data: {
              postsUpdated: {
                mutation: 'CREATED',
                node: {
                  id: 21,
                  title: 'New post 1',
                  content: 'New post content 1',
                  __typename: 'Post',
                },
                __typename: 'UpdatePostPayload',
              },
            },
          })
          subscription.unsubscribe()
          done()
        },
      })
  })

  step('Adding post works', async () => {
    let result = await apollo.query({
      query: POSTS_QUERY,
      variables: { limit: 1, after: 0 },
    })
    expect(result.data.posts).to.have.property('totalCount', 21)
    expect(result.data.posts).to.have.nested.property('edges[0].node.title', 'New post 1')
    expect(result.data.posts).to.have.nested.property('edges[0].node.content', 'New post content 1')
  })

  step('Publishes post on update', (done) => {
    apollo.mutate({
      mutation: EDIT_POST,
      variables: {
        input: {
          id: 21,
          title: 'New post 2',
          content: 'New post content 2',
        },
      },
    })

    let subscription

    subscription = apollo
      .subscribe({
        query: POSTS_SUBSCRIPTION,
        variables: { endCursor: 10 },
      })
      .subscribe({
        next(data) {
          expect(data).to.deep.equal({
            data: {
              postsUpdated: {
                mutation: 'UPDATED',
                node: {
                  id: 21,
                  title: 'New post 2',
                  content: 'New post content 2',
                  __typename: 'Post',
                },
                __typename: 'UpdatePostPayload',
              },
            },
          })
          subscription.unsubscribe()
          done()
        },
      })
  })

  step('Updating post works', async () => {
    let result = await apollo.query({
      query: POSTS_QUERY,
      variables: { limit: 1, after: 0 },
    })
    expect(result.data.posts).to.have.property('totalCount', 21)
    expect(result.data.posts).to.have.nested.property('edges[0].node.title', 'New post 2')
    expect(result.data.posts).to.have.nested.property('edges[0].node.content', 'New post content 2')
  })

  step('Publishes comment on add', (done) => {
    apollo.mutate({
      mutation: ADD_COMMENT,
      variables: {
        input: {
          postId: 21,
          content: 'New comment 1',
        },
      },
    })

    let subscription

    subscription = apollo
      .subscribe({
        query: COMMENT_SUBSCRIPTION,
        variables: { postId: 21, endCursor: 10 },
      })
      .subscribe({
        next(data) {
          console.log('data', data)
          expect(data).to.deep.equal({
            data: {
              commentUpdated: {
                id: 41,
                postId: 21,
                node: {
                  id: 41,
                  content: 'New comment 1',
                  __typename: 'Comment',
                },
                mutation: 'CREATED',
                __typename: 'UpdateCommentPayload',
              },
            },
          })
          subscription.unsubscribe()
          done()
        },
      })
  })

  step('Publishes post on removal', (done) => {
    apollo.mutate({
      mutation: DELETE_POST,
      variables: { id: '21' },
    })

    let subscription

    subscription = apollo
      .subscribe({
        query: POSTS_SUBSCRIPTION,
        variables: { endCursor: 10 },
      })
      .subscribe({
        next(data) {
          expect(data).to.deep.equal({
            data: {
              postsUpdated: {
                mutation: 'DELETED',
                node: {
                  id: 21,
                  title: 'New post 2',
                  content: 'New post content 2',
                  __typename: 'Post',
                },
                __typename: 'UpdatePostPayload',
              },
            },
          })
          subscription.unsubscribe()
          done()
        },
      })
  })

  step('Deleting post works', async () => {
    let result = await apollo.query({
      query: POSTS_QUERY,
      variables: { limit: 2, after: 0 },
    })
    expect(result.data.posts).to.have.property('totalCount', 20)
    expect(result.data.posts).to.have.nested.property('edges[0].node.title', 'Post title 20')
    expect(result.data.posts).to.have.nested.property('edges[0].node.content', 'Post content 20')
  })
})

describe('Post ORM works', () => {
  let post

  step('Should have tableName', () => {
    expect(Post.tableName).to.equal('post')
  })

  step('Should create', async () => {
    const onCreatePost = await Post.query().insert({ title: 'Testy', content: 'McTesterson' })
    post = await Post.query().findById(onCreatePost.id)
    expect(onCreatePost).to.have.property('title', 'Testy')
  })

  step('Should read', async () => {
    const onFetchPost = await Post.query().findById(post.id)
    expect(onFetchPost).to.have.property('title', 'Testy')
  })

  step('Should update', async () => {
    const onUpdatePost = await Post.query().patchAndFetchById(post.id, { title: 'Testy 2' })
    expect(onUpdatePost).to.have.property('title', 'Testy 2')
  })

  step('Should delete', async () => {
    const onDeletePost = await Post.query().deleteById(post.id)
    expect(onDeletePost).to.be.equal(1)
  })

  step('Should count', async () => {
    const total = await Post.getTotal()
    expect(total).to.be.equal(20)
  })
})

describe('Comments ORM works', () => {
  let post
  let comments

  step('Should create', async () => {
    const onCreatePostWithComments = await Post.query()
      .insertGraphAndFetch({
        title: 'Testy',
        content: 'McTesterson',
        comments: [{
          content: 'This is quite a funny name',
        }],
      })
    post = onCreatePostWithComments
    comments = onCreatePostWithComments.comments
    expect(onCreatePostWithComments).to.have.property('comments')
  })

  step('Should read', async () => {
    const onFetchPostWithComments = await Post.query().findById(post.id).eager('comments')
    expect(onFetchPostWithComments.comments).to.deep.equal(comments)
  })

  step('Should update', async () => {
    const onUpdatePostWithComments = await Post.query()
      .upsertGraphAndFetch({
        id: post.id,
        comments: [
          { id: comments[0].id }, // Update comment
          { content: 'This is my second comment' }, // Create comment
        ],
      })
    post = onUpdatePostWithComments
    comments = onUpdatePostWithComments.comments
    expect(onUpdatePostWithComments.comments.length).to.equal(2)
  })

  step('Should delete', async () => {
    const onDeletePostWithComments = await Post.query()
      .upsertGraphAndFetch({
        id: post.id,
        comments: [comments[0]], // Leave the other comment out to delete it
      })
    expect(onDeletePostWithComments.comments.length).to.equal(1)
  })
})
