
exports.up = function(knex) {
  return knex.schema
    .createTable('tab_irrf', function (table) {
      table.string('id').primary();
      table.string('ano_base').primary().notNullable();
      table.decimal('valor_inicial').notNullable();
      table.decimal('valor_final').notNullable();
      table.decimal('aliquota').notNullable();
      table.decimal('valor_abatimento').notNullable();
      table.decimal('valor_desc_dependente').notNullable();
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTable('tab_irrf');
};
