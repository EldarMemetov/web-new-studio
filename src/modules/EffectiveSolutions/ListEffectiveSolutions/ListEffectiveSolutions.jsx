import { ItemEffectiveSolution } from '../ItemEffectiveSolutions/ItemEffectiveSolutions';
import s from './ListEffectiveSolutions.module.scss';

export function ListEffectiveSolutions({ items }) {
  const tabletLeftIds = ['landing', 'redesign', 'corporate', 'stores'];
  const tabletRightIds = ['uiux', 'blogs', 'seo', 'support'];

  const desktopLeftIds = ['landing', 'blogs', 'redesign'];
  const desktopCenterIds = ['uiux', 'corporate'];
  const desktopRightIds = ['support', 'stores', 'seo'];

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
          <ItemEffectiveSolution key={item.id} item={item} />
        ))}
      </ul>

      <div className={s.twoColumns}>
        <ul className={s.column}>
          {leftTabletItems.map((item) => (
            <ItemEffectiveSolution key={item.id} item={item} />
          ))}
        </ul>
        <ul className={s.column}>
          {rightTabletItems.map((item) => (
            <ItemEffectiveSolution key={item.id} item={item} />
          ))}
        </ul>
      </div>

      <div className={s.threeColumns}>
        <ul className={s.column}>
          {leftDesktopItems.map((item) => (
            <ItemEffectiveSolution key={item.id} item={item} />
          ))}
        </ul>
        <ul className={s.columnCenter}>
          {centerDesktopItems.map((item) => (
            <ItemEffectiveSolution key={item.id} item={item} />
          ))}
        </ul>
        <ul className={s.column}>
          {rightDesktopItems.map((item) => (
            <ItemEffectiveSolution key={item.id} item={item} />
          ))}
        </ul>
      </div>
    </>
  );
}
