exports.up = function(knex) {
  return knex.schema.createTable('products', (table) => {
    table.increments()
    table.string('title').notNull()
    table.string('slug')
    table.string('description')
    table.string('image')
    table.decimal('price')
    table.integer('quantity')
    table.timestamps(false, true)
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('products')
}
