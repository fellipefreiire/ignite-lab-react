import { CheckCircle, Lock } from 'phosphor-react'
import { isPast, format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Link, useParams } from 'react-router-dom'
import classnames from 'classnames'

import styles from './styles.module.css'

interface LessonProps {
  title: string
  slug: string
  availableAt: Date
  type: 'live' | 'class'
}

export function Lesson({
  title,
  slug,
  availableAt,
  type
}: LessonProps) {
  const { slug: slugParam } = useParams<{ slug: string }>()

  const isLessonAvailable = isPast(availableAt);
  const availableDateFormatted = format(availableAt,
    "EEEE' • 'd' de 'MMMM' • 'k'h'mm", {
    locale: ptBR
  })

  const isActiveLesson = slug === slugParam

  return (
    <Link to={`/event/lesson/${slug}`} className='group'>
      <span className="text-gray-300">
        {availableDateFormatted}
      </span>

      <div className={classnames(styles.card, {
        'bg-green-500': isActiveLesson
      })}>
        <header className={styles.card__header}>
          {isLessonAvailable ? (
            <span
              className={classnames(`${styles.card__availability}`, {
                'text-white': isActiveLesson,
                'text-blue-500': !isActiveLesson
              })}
            >
              <CheckCircle size={20} />
              Conteúdo Liberado
            </span>
          ) : (
            // <span className='card__availability card__availability--soon'>
            <span
              className={`${styles.card__availability} ${styles['card__availability--soon']}`}
            >
              <Lock size={20} />
              Em breve
            </span>
          )}

          <span className={classnames(styles.card__type, {
            'border-white': isActiveLesson,
            'border-green-300': !isActiveLesson
          })}>
            {type === 'live' ? 'AO VIVO' : 'AULA PRÁTICA'}
          </span>
        </header>

        <strong
          className={classnames(styles.card__title, {
            'text-white': isActiveLesson,
            'text-gray-200': !isActiveLesson
          })}
        >
          {title}
        </strong>
      </div>
    </Link >
  )
}