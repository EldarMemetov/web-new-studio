import Image from 'next/image';
import s from './VideoEffectiveItem.module.scss';
export function VideoEffectiveItem({ item }) {
  return (
    <li
      className={`${s.listContent} ${item.className ? s[item.className] : ''}`}
    >
      <h2 className={s.titleInfo}>{item.title}</h2>
      <p className={`${s.info} ${s.infoMobile}`}>{item.info}</p>

      <p className={`${s.info} ${s.infoTablet}`}>{item.infoTablet}</p>
      <p className={`${s.info} ${s.infoDesktop}`}>{item.infoDesktop}</p>

      {item.images.map((img, idx) => (
        <Image
          key={idx}
          className={`${s.absoluteImage} ${img.className ? s[img.className] : ''} ${img.hideOnMobile ? s.hideOnMobile : ''}`}
          src={img.src}
          alt={img.alt}
          width={img.width}
          height={img.height}
        />
      ))}
    </li>
  );
}
