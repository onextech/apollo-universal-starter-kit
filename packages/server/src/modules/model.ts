import { Model as ObjectionModel, snakeCaseMappers } from 'objection'

export interface ModelInterface {
  id: number
  createdAt?: string
  updatedAt?: string
}

class Model extends ObjectionModel implements ModelInterface {
  /**
   * Use snake_cased names in database and camelCased names in code.
   * @link http://vincit.github.io/objection.js/#snake-case-to-camel-case-conversion
   */
  public static columnNameMappers = snakeCaseMappers()

  public id: number
  public createdAt?: string
  public updatedAt?: string

  public $beforeInsert() {
    this.createdAt = new Date().toISOString()
    this.updatedAt = new Date().toISOString()
  }

  public $beforeUpdate() {
    this.updatedAt = new Date().toISOString()
  }

  public static async count(): Promise<number> {
    const query: any = await this.query().count('id as count').first()
    return query.count
  }
}

export default Model
