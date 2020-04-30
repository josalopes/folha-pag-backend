
exports.up = function(knex) {
  return knex.schema
    .createTable('tab_inss', function (table) {
      table.string('id').primary();
      table.decimal('valor_inicial').notNullable();
      table.decimal('valor_final').notNullable();
      table.decimal('aliquota').notNullable();
      table.decimal('teto').notNullable();
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTable('tab_inss');
};
