import { Model } from 'objection'

export interface ProductInterface extends Model {
  id: number
}

class Product extends Model implements ProductInterface {
  public static tableName = ''

  public static jsonSchema = {
    type: 'object',
    required: [''],
    properties: {
      id: { type: 'integer' },
    },
  }

  public id: number
}

export default Product
