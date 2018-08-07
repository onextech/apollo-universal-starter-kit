import { Model } from 'objection'

export interface CommentInterface extends Model {
  id: number
  postId: number
  content: string
}

class Comment extends Model implements CommentInterface {
  public static tableName = 'comment'

  public static jsonSchema = {
    type: 'object',
    required: ['content'],
    properties: {
      id: { type: 'integer' },
      postId: { type: ['integer', 'null'] },
      content: { type: 'string', minLength: 10 },
    },
  }

  public id: number
  public postId: number
  public content: string
}

export default Comment
