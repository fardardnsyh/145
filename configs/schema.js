const { pgTable,serial,text,varchar } = require("drizzle-orm/pg-core")

export const forms = pgTable('forms',{
    id:serial('id').primaryKey(),
    jsonform:text('jsonform').notNull(),
    createdBy:varchar('createdBy').notNull(),
    createdAt:varchar('createdAt').notNull(),
})