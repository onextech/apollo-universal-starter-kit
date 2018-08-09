import Model from '../../model'

export interface ProductInterface extends Model {
  id: number
  title: string
  slug: string
  description: string
  image: string
  price: number
  quantity: number
}

class Product extends Model implements ProductInterface {
  public static tableName = 'products'

  public static jsonSchema = {
    type: 'object',
    required: ['title'],
    properties: {
      id: { type: 'integer' },
      title: { type: 'string' },
      slug: { type: 'string' },
      description: { type: 'string' },
      image: { type: 'string' },
      price: { type: 'decimal' },
      quantity: { type: 'integer' },
    },
  }

  public id: number
  public title: string
  public slug: string
  public description: string
  public image: string
  public price: number
  public quantity: number
}

export default Product
