import { pgTable, serial, text, timestamp, integer } from 'drizzle-orm/pg-core'

export const projects = pgTable('projects', {
  id: serial('id').primaryKey(),
  key: text('key').notNull().unique(),
  titleEn: text('title_en').notNull(),
  titleRu: text('title_ru').notNull(),
  titleKo: text('title_ko'),
  descEn: text('desc_en').notNull(),
  descRu: text('desc_ru').notNull(),
  descKo: text('desc_ko'),
  descriptionEn: text('description_en').notNull(),
  descriptionRu: text('description_ru').notNull(),
  descriptionKo: text('description_ko'),
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
  startMonth: integer('start_month'),
  startYear: integer('start_year'),
  endMonth: integer('end_month'),
  endYear: integer('end_year'),
  isPresent: integer('is_present').default(0),
  roleEn: text('role_en').notNull(),
  roleRu: text('role_ru').notNull(),
  roleKo: text('role_ko'),
  companyEn: text('company_en').notNull(),
  companyRu: text('company_ru').notNull(),
  companyKo: text('company_ko'),
  bulletsEn: text('bullets_en').notNull(),
  bulletsRu: text('bullets_ru').notNull(),
  bulletsKo: text('bullets_ko'),
  techEn: text('tech_en').notNull(),
  techRu: text('tech_ru').notNull(),
  techKo: text('tech_ko'),
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
