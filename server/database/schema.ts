import { pgTable, serial, text, timestamp, integer } from 'drizzle-orm/pg-core'

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

export const experience = pgTable('experience', {
  id: serial('id').primaryKey(),
  key: text('key').notNull().unique(),
  year: text('year').notNull(),
  roleEn: text('role_en').notNull(),
  roleRu: text('role_ru').notNull(),
  companyEn: text('company_en').notNull(),
  companyRu: text('company_ru').notNull(),
  bulletsEn: text('bullets_en').notNull(),
  bulletsRu: text('bullets_ru').notNull(),
  techEn: text('tech_en').notNull(),
  techRu: text('tech_ru').notNull(),
  order: integer('order').notNull().default(999),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
})

export type Experience = typeof experience.$inferSelect
export type NewExperience = typeof experience.$inferInsert

export const skills = pgTable('skills', {
  id: serial('id').primaryKey(),
  name: text('name').notNull().unique(),
  icon: text('icon').notNull(),
  category: text('category').notNull(),
  order: integer('order').notNull().default(999),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
})

export type Skill = typeof skills.$inferSelect
export type NewSkill = typeof skills.$inferInsert
