import { pgTable, uuid, varchar, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export const userSchema = createSelectSchema(users);

export const createUserSchema = createInsertSchema(users, {
  name: z.string().min(1, "Name is required").max(100),
  email: z.string().email("Invalid email address"),
}).omit({ id: true, createdAt: true, updatedAt: true });

export const userIdParamSchema = z.object({
  id: z.string().uuid("Invalid user ID"),
});

export type User = z.infer<typeof userSchema>;
export type CreateUser = z.infer<typeof createUserSchema>;
