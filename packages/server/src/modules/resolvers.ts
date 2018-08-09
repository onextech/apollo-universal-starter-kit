import Model from './model'

interface GetNodesArgs { limit: number, after: number }
export const getNodes = (modelName: string) => async (obj: Model, args: GetNodesArgs, context: any) => {
  const { limit, after } = args
  const Model = context[modelName]
  const nodes = await Model.query().orderBy('id', 'desc').limit(limit).offset(after)
  const edges = nodes.map((node: Model, i: number) => ({ cursor: after + i, node }))
  const endCursor = edges.length > 0 ? edges[edges.length - 1].cursor : 0
  const totalCount = await Model.count()
  const hasNextPage = totalCount > after + limit
  return {
    totalCount,
    edges,
    pageInfo: { endCursor, hasNextPage },
  }
}

interface GetNodeArgs { id: number }

export const getNode = (modelName: string) => async (obj: Model, args: GetNodeArgs, context: any) => {
    const { id } = args
    const Model = context[modelName]
    return Model.query().findById(id)
}
