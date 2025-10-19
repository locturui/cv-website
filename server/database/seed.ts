import 'dotenv/config'
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { projects } from './schema'

const projectsData = [
  {
    key: 'alumni',
    titleEn: 'AlumniPortal',
    titleRu: 'AlumniPortal',
    descEn: 'Portal for alumni of Innopolis University to connect and provide opportunities to current students.',
    descRu: 'Портал для выпускников Университета Иннополис, где они могут общаться и помогать нынешним студентам.',
    descriptionEn: `AlumniPortal is a comprehensive platform designed to bridge the gap between Innopolis University graduates and current students. The portal features a modern, intuitive interface that allows alumni to share job opportunities, mentorship programs, and networking events.

Key features include:
• User authentication and profile management
• Job board with advanced filtering
• Mentorship matching system
• Event calendar and RSVP functionality
• Real-time notifications

The project was built with a focus on scalability and user experience, implementing best practices in state management with Pinia and responsive design with Tailwind CSS.`,
    descriptionRu: `AlumniPortal — это комплексная платформа, созданная для связи выпускников Университета Иннополис с нынешними студентами. Портал имеет современный, интуитивно понятный интерфейс, который позволяет выпускникам делиться вакансиями, программами наставничества и сетевыми мероприятиями.

Основные возможности:
• Аутентификация и управление профилем
• Доска вакансий с расширенной фильтрацией
• Система подбора наставников
• Календарь мероприятий и функция RSVP
• Уведомления в реальном времени

Проект был создан с акцентом на масштабируемость и пользовательский опыт, с применением лучших практик управления состоянием через Pinia и адаптивного дизайна с Tailwind CSS.`,
    link: 'https://github.com/locturui/alumni',
    image: '/img/alumni.png',
    images: JSON.stringify([
      'https://placehold.co/1200x800/4F46E5/FFFFFF?text=AlumniPortal+Dashboard',
      'https://placehold.co/1200x800/7C3AED/FFFFFF?text=User+Profile+Page',
      'https://placehold.co/1200x800/2563EB/FFFFFF?text=Job+Board',
      'https://placehold.co/1200x800/059669/FFFFFF?text=Mentorship+Matching'
    ]),
    stack: JSON.stringify(['Vue', 'Nuxt', 'Pinia', 'Tailwind CSS'])
  },
  {
    key: 'artpolly',
    titleEn: 'Artpolly Studio',
    titleRu: 'Artpolly Studio',
    descEn: 'Ceramics studio website with a gallery and online store.',
    descRu: 'Сайт керамической студии с галереей и интернет‑магазином.',
    descriptionEn: `Artpolly Studio is an elegant e-commerce platform for a ceramics studio, showcasing handcrafted pottery and providing seamless online shopping experience.

Key features include:
• Beautiful image gallery with lightbox
• Shopping cart with local storage
• Product filtering and search
• Responsive design for all devices
• Smooth animations and transitions

The website emphasizes visual appeal and ease of use, with a focus on showcasing the artisan's work through high-quality imagery and clean layouts. Built with Vue 3's Composition API for optimal performance.`,
    descriptionRu: `Artpolly Studio — это элегантная e-commerce платформа для керамической студии, демонстрирующая изделия ручной работы и обеспечивающая удобный онлайн-шопинг.

Основные возможности:
• Красивая галерея изображений с лайтбоксом
• Корзина покупок с локальным хранилищем
• Фильтрация и поиск товаров
• Адаптивный дизайн для всех устройств
• Плавные анимации и переходы

Сайт делает акцент на визуальной привлекательности и удобстве использования, фокусируясь на демонстрации работ мастера через качественные изображения и чистые макеты. Построен с использованием Composition API Vue 3 для оптимальной производительности.`,
    link: 'https://github.com/locturui/artpolly-vue',
    image: '/img/artpolly.png',
    images: JSON.stringify([
      'https://placehold.co/1200x800/EC4899/FFFFFF?text=Artpolly+Homepage',
      'https://placehold.co/1200x800/F59E0B/FFFFFF?text=Product+Gallery',
      'https://placehold.co/1200x800/8B5CF6/FFFFFF?text=Product+Details',
      'https://placehold.co/1200x800/10B981/FFFFFF?text=Shopping+Cart'
    ]),
    stack: JSON.stringify(['Vue', 'Pinia', 'Tailwind CSS'])
  },
  {
    key: 'excursion',
    titleEn: 'ExcursionCRM – work in progress',
    titleRu: 'ExcursionCRM – разработка',
    descEn: 'CRM for excursion scheduling and management in Innopolis city.',
    descRu: 'CRM‑система для планирования и управления экскурсиями в городе Иннополис.',
    descriptionEn: `ExcursionCRM is a comprehensive booking and schedule management system for organizing tours and excursions in Innopolis. Currently in active development as part of a university project.

Key features:
• Interactive booking calendar
• Dynamic form builder for custom tour types
• Real-time availability checking
• Customer management system
• Interactive map integration for route planning
• Multi-language support
• Mobile-responsive interface

The system is built with modern web technologies, emphasizing performance and scalability. Uses Nuxt 3 for SSR capabilities and Pinia for efficient state management across complex booking workflows.`,
    descriptionRu: `ExcursionCRM — это комплексная система бронирования и управления расписанием для организации туров и экскурсий в Иннополисе. В настоящее время находится в активной разработке в рамках университетского проекта.

Основные возможности:
• Интерактивный календарь бронирования
• Динамический конструктор форм для разных типов туров
• Проверка доступности в реальном времени
• Система управления клиентами
• Интеграция интерактивной карты для планирования маршрутов
• Многоязычная поддержка
• Адаптивный интерфейс для мобильных устройств

Система построена с использованием современных веб-технологий, с акцентом на производительность и масштабируемость. Использует Nuxt 3 для возможностей SSR и Pinia для эффективного управления состоянием в сложных процессах бронирования.`,
    link: '',
    image: 'https://placehold.co/400x250?text=CRM',
    images: JSON.stringify([
      'https://placehold.co/1200x800/EF4444/FFFFFF?text=Booking+Dashboard',
      'https://placehold.co/1200x800/3B82F6/FFFFFF?text=Schedule+Calendar',
      'https://placehold.co/1200x800/14B8A6/FFFFFF?text=Route+Map+View',
      'https://placehold.co/1200x800/F97316/FFFFFF?text=Form+Builder'
    ]),
    stack: JSON.stringify(['Vue', 'Nuxt', 'Pinia', 'Tailwind CSS', 'daisyUI'])
  }
]

async function seed() {
  const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL

  if (!connectionString) {
    console.error('DATABASE_URL or POSTGRES_URL environment variable is not set')
    process.exit(1)
  }

  console.log('Seeding database...')

  const client = postgres(connectionString)
  const db = drizzle(client, { schema: { projects } })

  try {
    await db.delete(projects)
    console.log('Cleared existing projects')
    await db.insert(projects).values(projectsData)
    console.log('Inserted project data')

    console.log('Seeding complete!')
  } catch (error) {
    console.error('Seeding failed:', error)
    process.exit(1)
  } finally {
    await client.end()
  }
}

seed()

