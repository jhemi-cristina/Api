exports.up = (Knex) =>
  Knex.schema.createTable("notes", (table) => {
    table.increments("id");
    table.text("title");
    table.text("description");
    table.integer("user_id").references("id").inTable("users");

    table.timestamp("created_at").default(Knex.fn.now());
    table.timestamp("updated_at").default(Knex.fn.now());
  });

exports.down = (Knex) => Knex.schema.dropTable("notes");
