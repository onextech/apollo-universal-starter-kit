import { Model } from 'objection'
import knex from '../../../sql/connector'
import { orderedFor } from '../../../sql/helpers'
import Comment, { CommentInterface } from './Comment'

export interface PostInterface extends Model {
  id: number
  title: string
  content: string
  image?: string
  comments?: CommentInterface[] | CommentInterface
}

class Post extends Model implements PostInterface {
  public static tableName = 'post'

  public static jsonSchema = {
    type: 'object',
    required: ['title', 'content'],
    properties: {
      id: { type: 'integer' },
      title: { type: 'string', minLength: 1, maxLength: 255 },
      content: { type: 'string', minLength: 10 },
      image: { type: 'string' },
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

  public static async post(id: number): Promise<PostInterface> {
    return this.query()
      .where('id', '=', id)
      .first()
  }

  public static async deletePost(id: number): Promise<number> {
    return this.query()
      .where('id', '=', id)
      .del()
  }

  public static async addComment(comment: CommentInterface): Promise<CommentInterface[] | CommentInterface> {
    const { content, postId } = comment
    const post: PostInterface = await this.query().findById(postId)
    return post.$relatedQuery('comments').insert({ content })
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
