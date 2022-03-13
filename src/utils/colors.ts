/**
 * @author Vighnesh Raut <rvighnes@amazon.com>
 */

import toRgba from 'color-rgba';

export interface RGBA {
  r: number;
  g: number;
  b: number;
  a: number;
}

export const colorToRgba = (color: string) => {
  const converted = toRgba(color);
  if (!converted) throw new Error('Failed to parse');
  const [r, g, b, a] = converted;
  return { r, g, b, a };
};
