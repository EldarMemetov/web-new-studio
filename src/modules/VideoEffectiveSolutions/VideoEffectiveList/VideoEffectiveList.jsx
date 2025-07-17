import { VideoEffectiveItem } from '../VideoEffectiveItem/VideoEffectiveItem';
import s from './VideoEffectiveList.module.scss';

export default function VideoEffectiveList({ items }) {
  const tabletLeftIds = ['advertising', 'corporate', 'event', 'drone'];
  const tabletRightIds = ['social-media', 'graphics', 'video-editing'];

  const desktopLeftIds = ['advertising', 'social-media'];
  const desktopCenterIds = ['corporate', 'drone', 'graphics'];
  const desktopRightIds = ['event', 'video-editing'];

  const makeGroup = (ids) =>
    ids.map((id) => items.find((i) => i.id === id)).filter(Boolean);

  const leftTabletItems = makeGroup(tabletLeftIds);
  const rightTabletItems = makeGroup(tabletRightIds);
  const leftDesktopItems = makeGroup(desktopLeftIds);
  const centerDesktopItems = makeGroup(desktopCenterIds);
  const rightDesktopItems = makeGroup(desktopRightIds);

  return (
    <>
      <ul className={s.singleList}>
        {items.map((item) => (
          <VideoEffectiveItem key={item.id} item={item} />
        ))}
      </ul>

      <div className={s.twoColumns}>
        <ul className={s.column}>
          {leftTabletItems.map((item) => (
            <VideoEffectiveItem key={item.id} item={item} />
          ))}
        </ul>
        <ul className={s.column}>
          {rightTabletItems.map((item) => (
            <VideoEffectiveItem key={item.id} item={item} />
          ))}
        </ul>
      </div>

      <div className={s.threeColumns}>
        <ul className={s.column}>
          {leftDesktopItems.map((item) => (
            <VideoEffectiveItem key={item.id} item={item} />
          ))}
        </ul>
        <ul className={s.columnCenter}>
          {centerDesktopItems.map((item) => (
            <VideoEffectiveItem key={item.id} item={item} />
          ))}
        </ul>
        <ul className={s.column}>
          {rightDesktopItems.map((item) => (
            <VideoEffectiveItem key={item.id} item={item} />
          ))}
        </ul>
      </div>
    </>
  );
}
