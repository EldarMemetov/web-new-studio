import Container from '@/shared/container/Container';
import Image from 'next/image';
import s from './OurTeam.module.scss';
import { initServerI18n } from '@/i18n/utils/serverI18n';

export default async function OurTeam({ locale }) {
  const { t } = await initServerI18n(locale, ['ourTeam']);

  const members = t('members', { returnObjects: true });

  return (
    <section className={s.section}>
      <Container>
        <div>
          <h2 className={s.title}>
            {t('title.first')}{' '}
            <span className={s.spanTitle}>{t('title.second')}</span>
          </h2>

          <ul className={s.listContainer}>
            {members.map((member, index) => (
              <li className={s.itemList} key={index}>
                <h3 className={s.name}>{member.name}</h3>
                <h4 className={s.jobTitle}>{member.jobTitle}</h4>
                <p className={s.description}>{member.description}</p>

                <Image
                  src={member.image}
                  alt={member.alt}
                  width={350}
                  height={420}
                  className={s.teamImg}
                />

                <h4 className={s.backgroundName}>{member.backgroundName}</h4>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
