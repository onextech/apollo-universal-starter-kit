/* tslint:disable:no-implicit-dependencies */
import { Model } from 'objection'

export interface $Module$Interface extends Model {
  id: number
}

class $Module$ extends Model implements $Module$Interface {
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

export default $Module$
