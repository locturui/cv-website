import 'dotenv/config'
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { experience, skills } from './schema'

const experienceData = [
  {
    key: 'excursioncrm',
    year: 'Oct 2024 – Present',
    roleEn: 'Full‑Stack Developer',
    roleRu: 'Full‑Stack разработчик',
    companyEn: 'Excursion CRM · FRILANS',
    companyRu: 'Excursion CRM · FRILANS',
    bulletsEn: JSON.stringify([
      'Built custom CRM for tour company from scratch (Vue 3 + Nuxt 3)',
      'Designed PostgreSQL schema, integrated secure auth & multi‑role access',
      'Implemented dynamic form builder and interactive map view'
    ]),
    bulletsRu: JSON.stringify([
      'Создал с нуля кастомную CRM для туристической компании (Vue 3 + Nuxt 3)',
      'Спроектировал PostgreSQL‑схему, интегрировал безопасную аутентификацию и мультиролевой доступ',
      'Реализовал динамический конструктор форм и интерактивную карту'
    ]),
    techEn: 'Vue 3, Nuxt 3, Tailwind CSS / daisyUI, Pinia',
    techRu: 'Vue 3, Nuxt 3, Tailwind CSS / daisyUI, Pinia',
    order: 1
  },
  {
    key: 'alumniportal',
    year: 'Jun 2024 – Jul 2024',
    roleEn: 'Frontend Developer',
    roleRu: 'Фронтенд‑разработчик',
    companyEn: 'AlumniPortal · Innopolis University',
    companyRu: 'AlumniPortal · Университет Иннополис',
    bulletsEn: JSON.stringify([
      'Architected portal layout, authentication flow, API integration',
      'Mentored two other developers'
    ]),
    bulletsRu: JSON.stringify([
      'Спроектировал структуру портала, поток аутентификации и интеграцию с API',
      'Наставлял двух других разработчиков'
    ]),
    techEn: 'Vue 3, Tailwind CSS, Pinia',
    techRu: 'Vue 3, Tailwind CSS, Pinia',
    order: 2
  },
  {
    key: 'qpd',
    year: 'Jan 2022 – Aug 2022',
    roleEn: 'Junior Frontend Developer',
    roleRu: 'Младший фронтенд‑разработчик',
    companyEn: 'QPD (Vodafone project)',
    companyRu: 'QPD (проект Vodafone)',
    bulletsEn: JSON.stringify([
      'Built React + TypeScript interfaces for internal CRM',
      'Optimised large data tables and crafted custom UI components'
    ]),
    bulletsRu: JSON.stringify([
      'Создавал интерфейсы React + TypeScript для внутренней CRM',
      'Оптимизировал большие таблицы данных и разрабатывал кастомные UI‑компоненты'
    ]),
    techEn: 'React, TypeScript, Redux, REST API',
    techRu: 'React, TypeScript, Redux, REST API',
    order: 3
  },
  {
    key: 'elbrus',
    year: 'Jul 2021 – Dec 2021',
    roleEn: 'Full‑Stack Dev Intern (Bootcamp)',
    roleRu: 'Стажёр full‑stack‑разработчик (буткемп)',
    companyEn: 'Elbrus Coding Bootcamp',
    companyRu: 'Elbrus Coding Bootcamp',
    bulletsEn: JSON.stringify([
      'ECO‑FRIEND: map‑based recycling web‑app (React + Node)',
      'MEBEL CRM: furniture company CRM (Handlebars + Node)'
    ]),
    bulletsRu: JSON.stringify([
      'ECO‑FRIEND: веб‑приложение для переработки отходов с картой (React + Node)',
      'MEBEL CRM: CRM для мебельной компании (Handlebars + Node)'
    ]),
    techEn: 'React, Node.js, MongoDB, PostgreSQL',
    techRu: 'React, Node.js, MongoDB, PostgreSQL',
    order: 4
  }
]

const skillsData = [
  { name: 'HTML5', icon: 'skill-icons:html', category: 'frontend', order: 1 },
  { name: 'CSS3', icon: 'skill-icons:css', category: 'frontend', order: 2 },
  { name: 'JavaScript', icon: 'skill-icons:javascript', category: 'frontend', order: 3 },
  { name: 'TypeScript', icon: 'skill-icons:typescript', category: 'frontend', order: 4 },
  { name: 'Vue.js', icon: 'skill-icons:vuejs-dark', category: 'frontend', order: 5 },
  { name: 'Nuxt', icon: 'skill-icons:nuxtjs-dark', category: 'frontend', order: 6 },
  { name: 'Vite', icon: 'skill-icons:vite-dark', category: 'frontend', order: 7 },
  { name: 'Tailwind CSS', icon: 'skill-icons:tailwindcss-dark', category: 'frontend', order: 8 },
  { name: 'Sass', icon: 'skill-icons:sass', category: 'frontend', order: 9 },
  { name: 'React', icon: 'skill-icons:react-dark', category: 'frontend', order: 10 },
  { name: 'Go', icon: 'skill-icons:golang', category: 'backend', order: 11 },
  { name: 'PostgreSQL', icon: 'skill-icons:postgresql-dark', category: 'backend', order: 12 },
  { name: 'Node.js', icon: 'skill-icons:nodejs-dark', category: 'backend', order: 13 },
  { name: 'MongoDB', icon: 'skill-icons:mongodb', category: 'backend', order: 14 },
  { name: 'Redis', icon: 'skill-icons:redis-dark', category: 'backend', order: 15 },
  { name: 'GraphQL', icon: 'skill-icons:graphql-dark', category: 'backend', order: 16 },
  { name: 'Docker', icon: 'skill-icons:docker', category: 'devops', order: 17 },
  { name: 'Git', icon: 'skill-icons:git', category: 'devops', order: 18 },
  { name: 'GitHub', icon: 'skill-icons:github-dark', category: 'devops', order: 19 },
  { name: 'Vercel', icon: 'skill-icons:vercel-dark', category: 'devops', order: 20 },
  { name: 'Linux', icon: 'skill-icons:linux-dark', category: 'devops', order: 21 },
  { name: 'VSCode', icon: 'skill-icons:vscode-dark', category: 'devops', order: 22 },
  { name: 'Figma', icon: 'skill-icons:figma-dark', category: 'devops', order: 23 },
  { name: 'Postman', icon: 'skill-icons:postman', category: 'devops', order: 24 }
]

async function seed() {
  const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL

  if (!connectionString) {
    console.error('DATABASE_URL or POSTGRES_URL environment variable is not set')
    process.exit(1)
  }

  console.log('Seeding experience and skills...')

  const client = postgres(connectionString)
  const db = drizzle(client, { schema: { experience, skills } })

  try {
    await db.delete(experience)
    console.log('Cleared existing experience')
    await db.insert(experience).values(experienceData)
    console.log('Inserted experience data')

    await db.delete(skills)
    console.log('Cleared existing skills')
    await db.insert(skills).values(skillsData)
    console.log('Inserted skills data')

    console.log('Seeding complete!')
  } catch (error) {
    console.error('Seeding failed:', error)
    process.exit(1)
  } finally {
    await client.end()
  }
}

seed()

