import Icon from '../../../shared/Icon/Icon';
import s from './SocialLinks.module.scss';

export const SocialLinks = () => {
  return (
    <div className={s.contentContainer}>
      <ul className={s.list}>
        <li className={s.socialLinkList}>
          <a
            href="https://www.instagram.com/videofilmer_frankfurt"
            className={s.socialLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            title="Instagram"
          >
            <Icon iconName="icon-instagram" className={s.iconInstagram} />
          </a>
        </li>

        <li className={s.socialLinkList}>
          <a
            href="https://t.me/eldarvideok"
            className={s.socialLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Telegram"
            title="Telegram"
          >
            <Icon iconName="icon-telegram" className={s.socialsIcon} />
          </a>
        </li>
        <li className={s.socialLinkList}>
          <a
            href="https://wa.me/4917621139129?text=Hi%2C%20I%20am%20interested%20in%20your%20web%20and%20video%20services"
            className={s.socialLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            title="WhatsApp"
          >
            <Icon iconName="icon-whatsapp" className={s.socialsIcon} />
          </a>
        </li>
        <li className={s.socialLinkList}>
          <a
            href="https://www.linkedin.com/in/yourprofile"
            className={s.socialLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            title="LinkedIn"
          >
            <Icon iconName="icon-linkedin" className={s.socialsIcon} />
          </a>
        </li>
      </ul>
    </div>
  );
};
