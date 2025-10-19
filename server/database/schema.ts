import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core'

export const projects = pgTable('projects', {
  id: serial('id').primaryKey(),
  key: text('key').notNull().unique(),
  titleEn: text('title_en').notNull(),
  titleRu: text('title_ru').notNull(),
  descEn: text('desc_en').notNull(),
  descRu: text('desc_ru').notNull(),
  descriptionEn: text('description_en').notNull(),
  descriptionRu: text('description_ru').notNull(),
  link: text('link'),
  githubLink: text('github_link'),
  deployLink: text('deploy_link'),
  image: text('image').notNull(),
  images: text('images').notNull(),
  stack: text('stack').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
})

export type Project = typeof projects.$inferSelect
export type NewProject = typeof projects.$inferInsert

