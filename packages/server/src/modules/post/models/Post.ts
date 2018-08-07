import { Model } from 'objection'
import knex from '../../../sql/connector'
import { returnId, orderedFor } from '../../../sql/helpers'
import Comment, { CommentInterface } from './Comment'

export interface PostInterface {
  id: number
  title: string
  content: string
  comments: CommentInterface[]
}

class Post extends Model implements PostInterface {
  public static tableName = 'post'

  public static jsonSchema = {
    type: 'object',
    required: ['title'],
    properties: {
      id: { type: 'integer' },
      title: { type: 'string', minLength: 1, maxLength: 255 },
      content: { type: 'string', minLength: 10 },
    },
  }

  public static relationMappings = {
    comments: {
      modelClass: Comment,
      relation: Model.HasManyRelation,
      join: { from: 'post.id', to: 'comment.post_id' },
    },
  }

  public id: number
  public title: string
  public content: string
  public comments: CommentInterface[]

  public static async getTotal(): Promise<number> {
    const query: any = await this.query().count('id as count').first()
    return query.count
  }

  public static async postsPagination(limit: number, after: number): Promise<object> {
    return this.query()
      .select('id', 'title', 'content')
      .from('post')
      .orderBy('id', 'desc')
      .limit(limit)
      .offset(after)
  }

  public static async getCommentsForPostIds(postIds: number[]): Promise<object> {
    const res = await this.query()
      .select('id', 'content', 'post_id AS postId')
      .from('comment')
      .whereIn('post_id', postIds)

    return orderedFor(res, postIds, 'postId', false)
  }

  public static async post(id: number): Promise<object> {
    return this.query()
      .select('id', 'title', 'content')
      .from('post')
      .where('id', '=', id)
      .first()
  }

  public static async addPost(post: PostInterface): Promise<object> {
    const { title, content } = post
    return returnId(this.query()).insert({ title, content })
  }

  public static async deletePost(id: number): Promise<number> {
    return this.query()
      .where('id', '=', id)
      .del()
  }

  public static async editPost(post: PostInterface): Promise<number> {
    const { id, title, content } = post
    return this.query()
      .where('id', '=', id)
      .update({ title, content })
  }

  public static async addComment(comment: CommentInterface): Promise<number> {
    const { content, postId } = comment
    return returnId(knex('comment')).insert({ content, post_id: postId })
  }

  public static async getComment(id: number): Promise<object> {
    return this.query()
      .select('id', 'content')
      .from('comment')
      .where('id', '=', id)
      .first()
  }

  public static async deleteComment(id: number): Promise<number> {
    return knex('comment')
      .where('id', '=', id)
      .del()
  }

  public static async editComment(comment: CommentInterface): Promise<object> {
    const { id, content } = comment
    return knex('comment')
      .where('id', '=', id)
      .update({ content })
  }
}

export default Post
