exports.up = function(knex) {
  return knex.schema.createTable('products', (table) => {
    table.increments()
    table.string('title').notNull()
    table.string('slug').notNull().defaultTo('')
    table.string('description').notNull().defaultTo('')
    table.string('image').notNull().defaultTo('')
    table.decimal('price').notNull().defaultTo(0)
    table.integer('quantity').notNull().defaultTo(0)
    table.timestamps(false, true)
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('products')
}
