import Model from '../../model'

export interface ProductInterface extends Model {
  title: string
  slug?: string
  description?: string
  image?: string
  price?: number
  quantity?: number
}

class Product extends Model implements ProductInterface {
  public static tableName = 'products'

  public static jsonSchema = {
    type: 'object',
    required: ['title'],
    properties: {
      id: { type: 'integer' },
      createdAt: { type: 'timestamp' },
      updatedAt: { type: 'timestamp' },
      title: { type: 'string', minLength: 1, maxLength: 255 },
      slug: { type: 'string' },
      description: { type: 'string', minLength: 10 },
      image: { type: 'string' },
      price: { type: 'decimal', min: 0 },
      quantity: { type: 'integer', min: 0 },
    },
  }

  public title: string
  public slug?: string
  public description?: string
  public image?: string
  public price?: number
  public quantity?: number
}

export default Product
