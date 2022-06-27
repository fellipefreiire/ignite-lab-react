import { DefaultUi, Player, Youtube } from '@vime/react'
import { CaretRight, DiscordLogo, FileArrowDown, Image, Lightning } from 'phosphor-react'
import { useGetLessonBySlugQuery } from '../../graphql/generated'

import '@vime/core/themes/default.css'
import styles from './styles.module.css'

interface VideoParams {
  lessonSlug: string
}

export function Video({ lessonSlug }: VideoParams) {
  const { data } = useGetLessonBySlugQuery({
    variables: {
      slug: lessonSlug
    }
  })

  if (!data || !data.lesson) {
    return <div className='flex-1'>
      <p>Carregando...</p>
    </div>
  }

  return (
    <div className="flex-1">
      <div className={styles['video-wrapper']}>
        <div className={styles['video-wrapper__player-wrapper']}>
          <Player>
            <Youtube videoId={data.lesson.videoId} />
            <DefaultUi />
          </Player>
        </div>
      </div>

      <div className={styles['content-wrapper']}>
        <div className='flex items-start gap-16'>
          <div className={styles['lesson-info']}>
            <h1 className={styles['lesson-info__title']}>
              {data.lesson.title}
            </h1>
            <p className={styles['lesson-info__description']}>
              {data.lesson.description}
            </p>

            {data.lesson.teacher && (
              <div className={styles['teacher-wrapper']}>
                <img
                  className={styles['teacher-wrapper__avatar']}
                  src={data.lesson.teacher.avatarURL}
                  alt=""
                />

                <div className='leading-relaxed'>
                  <strong className={styles['teacher-wrapper__name']}>{data.lesson.teacher.name}</strong>
                  <span className={styles['teacher-wrapper_bio']}>{data.lesson.teacher.bio}</span>
                </div>
              </div>
            )}
          </div>

          <div className='flex flex-col gap-4'>
            <a
              href='#'
              className={`${styles.button} ${styles['button--discord']}`}
            >
              <DiscordLogo size={24} />
              Comunidade do Discord
            </a>

            <a
              href='#'
              className={`${styles.button} ${styles['button--challenge']}`}
            >
              <Lightning size={24} />
              Acesse o desafio
            </a>
          </div>
        </div>

        <div className={styles['card-wrapper']}>
          <a href="" className={styles.card}>
            <div className={styles['card__left-img']}>
              <FileArrowDown size={40} />
            </div>

            <div className={styles.card__content}>
              <strong className={styles.card__title}>Material Complementar</strong>
              <p className={styles.card__text}>
                Acesse o material complementar para acelerar o seu desenvolvimento
              </p>
            </div>

            <div className={styles['card__right-img']}>
              <CaretRight size={24} />
            </div>
          </a>

          <a href="" className={styles.card}>
            <div className={styles['card__left-img']}>
              <Image size={40} />
            </div>

            <div className={styles.card__content}>
              <strong className={styles.card__title}>Wallpapers exclusivos</strong>
              <p className={styles.card__text}>
                Baixe wallpapers exclusivos do Ignite Lab e personalize a sua máquina
              </p>
            </div>

            <div className={styles['card__right-img']}>
              <CaretRight size={24} />
            </div>
          </a>
        </div>
      </div>
    </div>
  )
}