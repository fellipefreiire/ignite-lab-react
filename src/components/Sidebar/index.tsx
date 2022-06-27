import { useGetLessonsQuery } from "../../graphql/generated";
import { Lesson } from "../Lesson";

import styles from './styles.module.css'

export function Sidebar() {
  const { data } = useGetLessonsQuery()

  return (
    <aside className={styles.sidebar}>
      <span className={styles.sidebar__cronograma}>
        Cronograma de aulas
      </span>

      <div className={styles['sidebar__lesson-wrapper']}>
        {data?.lessons.map(lesson => (
          <Lesson
            key={lesson.id}
            title={lesson.title}
            slug={lesson.slug}
            availableAt={new Date(lesson.availableAt)}
            type={lesson.lessonType}
          />
        ))}
      </div>
    </aside>
  )
}