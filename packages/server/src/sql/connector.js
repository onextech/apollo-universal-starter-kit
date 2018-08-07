import Knex from 'knex'
import { Model } from 'objection'
import * as environments from '../../knexdata'

// eslint-disable-next-line import/namespace
const knexConfig = environments[process.env.NODE_ENV || 'development']

// Initialize Knex
const knex = Knex(knexConfig)

// Bind all Models to a knex instance
Model.knex(knex)

export default knex
