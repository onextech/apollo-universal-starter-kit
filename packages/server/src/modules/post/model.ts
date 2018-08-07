import { Model } from 'objection'

class Post extends Model {
  public static tableName = 'post'

  public static async getTotal(): Promise<number> {
    const query: any = await this.query().count('id as count').first()
    return query.count
  }
}

export default Post
