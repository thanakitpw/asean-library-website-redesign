import { ICON_SPRITE, type IconName } from './icon-sprite';

export function Icon({ name, className }: { name: IconName; className?: string }) {
  return (
    <svg className={className ? `icon ${className}` : 'icon'} aria-hidden="true">
      <use href={`#i-${name}`} />
    </svg>
  );
}

/** วางครั้งเดียวใน root layout */
export function IconSprite() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" dangerouslySetInnerHTML={{ __html: ICON_SPRITE }} />
  );
}
