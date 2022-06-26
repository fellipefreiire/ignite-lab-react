import { CheckCircle, Lock } from 'phosphor-react'
import { isPast, format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import './styles.scss'
import { Link, useParams } from 'react-router-dom'
import classnames from 'classnames'

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

      <div className={classnames('card', {
        'bg-green-500': isActiveLesson
      })}>
        <header className="card__header">
          {isLessonAvailable ? (
            <span className={
              classnames('card__availability card__availability--available', {
                'text-white': isActiveLesson
              })}>
              <CheckCircle size={20} />
              Conteúdo Liberado
            </span>
          ) : (
            <span className='card__availability card__availability--soon'>
              <Lock size={20} />
              Em breve
            </span>
          )}

          <span className={classnames('card__type', {
            'border-white': isActiveLesson
          })}>
            {type === 'live' ? 'AO VIVO' : 'AULA PRÁTICA'}
          </span>
        </header>

        <strong className={classnames('card__title', {
          'text-white': isActiveLesson
        })}>
          {title}
        </strong>
      </div>
    </Link>
  )
}