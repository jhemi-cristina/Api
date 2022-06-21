exports.up = (Knex) =>
  Knex.schema.createTable("links", (table) => {
    table.increments("id");
    table.text("url").notNullable();

    table
      .integer("note_id")
      .references("id")
      .inTable("notes")
      .onDelete("CASCADE");
    table.timestamp("created_at").default(Knex.fn.now());
  });

exports.down = (Knex) => Knex.schema.dropTable("links");
